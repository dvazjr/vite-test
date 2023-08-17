let typeCounts = {};

const getType = (pokemonName) => {
  return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    .then((res) => res.json())
    .then((data) => data.types.map(type => type.type.name))
    .catch(error => console.log(`Failed to fetch type for ${pokemonName}:`, error));
};

const getMoveName = (pokemonName) => {
  return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    .then((res) => res.json())
    .then((data) => data.moves.slice(0, 3).map(move => move.move.name))
    .catch(error => console.log(`Failed to fetch moves for ${pokemonName}:`, error));
};

const getNamesArray = () => {
  return fetch("https://pokeapi.co/api/v2/pokemon/?limit=151")
    .then((res) => res.json())
    .then((data) => data.results.map(result => 
      result.name[0].toUpperCase() + result.name.substring(1).toLowerCase()
    ))
    .then(names => {
      const container = document.querySelector('.pokemon-container');

      names.forEach(name => {
        const pokemonCard = document.createElement('div');
        pokemonCard.className = 'pokemonCard';

        pokemonCard.addEventListener('click', function() {
          const parentSection = this.parentElement;
          if (parentSection.className.includes('pokemon-container')) {
            document.querySelector('.collection-border').appendChild(this);
          } else {
            document.querySelector('.pokemon-container').appendChild(this);
          }
        });
      
        const para = document.createElement('h4');
        para.textContent = name;
        pokemonCard.appendChild(para);
      
        const img = document.createElement('img');
        img.src = `https://img.pokemondb.net/sprites/black-white/anim/normal/${name.toLowerCase()}.gif`;
        img.alt = name;
        pokemonCard.appendChild(img);
      
        const typeTitle = document.createElement('p');
        typeTitle.textContent = 'Type: ';
        const typeItem = document.createElement('span');
      
        const moveTitle = document.createElement('p');
        moveTitle.textContent = 'Top Moves:';
        const moveList = document.createElement('ul');
      
        Promise.all([getType(name.toLowerCase()), getMoveName(name.toLowerCase())])
        .then(([types, moves]) => {
          types.forEach(typeName => {
            typeItem.textContent += typeName[0].toUpperCase() + typeName.substring(1).toLowerCase() + " ";
            if (!typeCounts[typeName]) {
              typeCounts[typeName] = 1;
            } else {
              typeCounts[typeName]++;
            }
            document.getElementById("poison-type").textContent = typeCounts["poison"] || 0;
          });
          typeTitle.appendChild(typeItem);
          pokemonCard.appendChild(typeTitle);
      
          moves.forEach(move => {
            const moveItem = document.createElement('li');
            moveItem.textContent = move[0].toUpperCase() + move.substring(1).toLowerCase();
            moveList.appendChild(moveItem);
          });
          pokemonCard.appendChild(moveTitle);
          pokemonCard.appendChild(moveList);
        });
      
        container.appendChild(pokemonCard);
      });
    });
};

getNamesArray()


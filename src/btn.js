const sortPokemonAZ = (selector) => {
  const sortCards = (container) => {
    const cards = Array.from(container.getElementsByClassName('pokemonCard'));
    cards.sort((cardA, cardB) => {
      const nameA = cardA.querySelector('h4').textContent.toUpperCase();
      const nameB = cardB.querySelector('h4').textContent.toUpperCase();
      return nameA < nameB ? -1 : (nameA > nameB ? 1 : 0);
    });

    cards.forEach(card => container.appendChild(card));
  };

  sortCards(document.querySelector(selector));
};

const sortPokemonZA = (selector) => {
  const sortCards = (container) => {
    const cards = Array.from(container.getElementsByClassName('pokemonCard'));

    cards.sort((cardA, cardB) => {
      const nameA = cardA.querySelector('h4').textContent.toUpperCase();
      const nameB = cardB.querySelector('h4').textContent.toUpperCase();
      return nameA > nameB ? -1 : (nameA < nameB ? 1 : 0);
    });

    cards.forEach(card => container.appendChild(card));
  };

  sortCards(document.querySelector(selector));
};

document.getElementById('sort-button-az-collection').addEventListener('click', () => sortPokemonAZ('.collection-border'));
document.getElementById('sort-button-za-collection').addEventListener('click', () => sortPokemonZA('.collection-border'));
document.getElementById('sort-button-az-pokemon').addEventListener('click', () => sortPokemonAZ('.pokemon-container'));
document.getElementById('sort-button-za-pokemon').addEventListener('click', () => sortPokemonZA('.pokemon-container'));


//The UI for the game. Displays the Pokemon images under each tile

import { fetchImage } from './fetchAPI.js';

async function loadPokemonImages() {
    const pokemon = await fetchImage();

    if (!pokemon) {
        console.log("No Pokémon images loaded.");
        return;
    }

    const tiles = document.querySelectorAll('.game-tile');

    pokemon.forEach((poke, index) => {
        tiles[index].innerHTML = `
            <img src="${poke.image}" alt="${poke.name}">
        `;
    });
}

loadPokemonImages();



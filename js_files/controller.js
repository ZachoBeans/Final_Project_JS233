//The core game logic for the game. Handles the matching of the tiles

import { fetchImage } from './fetchAPI.js';

let firstClick = null;
let secondClick = null;
let locked = false;

async function setupGame() {
    const pokemon = await fetchImage();

    if (!pokemon) {
        console.log("Could not load Pokémon.");
        return;
    }

    const tiles = document.querySelectorAll(".game-tile");
    const tileArray = Array.from(tiles);

    tileArray.forEach((tile, index) => {
        tile.dataset.name = pokemon[index].name;
        tile.dataset.image = pokemon[index].image;

        tile.innerHTML = ""; // hide image at start

        tile.addEventListener("click", () => {
            showPokemon(tile, tileArray);
        });
    });
}

function showPokemon(tile, tileArray) {
    if (locked) return;
    if (tile.classList.contains("matched")) return;
    if (tile === firstClick) return;

    tile.innerHTML = `
        <img src="${tile.dataset.image}" alt="${tile.dataset.name}">
    `;

    if (!firstClick) {
        firstClick = tile;
        return;
    }

    secondClick = tile;

    if (firstClick.dataset.name === secondClick.dataset.name) {
        firstClick.classList.add("matched");
        secondClick.classList.add("matched");

        firstClick = null;
        secondClick = null;

        const allMatched =
            document.querySelectorAll(".game-tile.matched").length === tileArray.length;

        if (allMatched) {
            document.getElementById("win").style.display = "block";
        }
    } else {
        locked = true;

        setTimeout(() => {
            firstClick.innerHTML = "";
            secondClick.innerHTML = "";

            firstClick = null;
            secondClick = null;
            locked = false;
        }, 1000);
    }
}

setupGame();
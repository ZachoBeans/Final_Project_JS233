//The core game logic for the game. Handles the matching of the tiles

import { fetchImage } from "./fetchAPI.js";
import { UI } from "./ui.js";

export default class GameController {
  constructor() {
    this.ui = new UI();

    this.ui.allBackOfTiles();
    this.firstClick = null;
    this.secondClick = null;
    this.locked = false;

    this.setupGame();
  }

  async setupGame() {
    const pokemon = await fetchImage();

    if (!pokemon) {
      console.log("Could not load Pokémon.");
      return;
    }

    const pairs = [...pokemon.slice(0, 10), ...pokemon.slice(0, 10)];
    pairs.sort(() => Math.random() - 0.5);

    this.tiles = Array.from(document.querySelectorAll(".game-tile"));

    this.tiles.forEach((tile, index) => {
      tile.dataset.name = pairs[index].name;
      tile.dataset.image = pairs[index].image;

      tile.innerHTML = "";

      tile.addEventListener("click", () => {
        this.showPokemon(tile);
      });
    });
  }

  showPokemon(tile) {
    if (this.locked) return;
    if (tile.classList.contains("matched")) return;
    if (tile === this.firstClick) return;

    this.ui.showPokemon(tile);

    if (!this.firstClick) {
      this.firstClick = tile;
      return;
    }

    this.secondClick = tile;

    if (this.firstClick.dataset.name === this.secondClick.dataset.name) {
      this.firstClick.classList.add("matched");
      this.secondClick.classList.add("matched");

      this.firstClick = null;
      this.secondClick = null;

      const allMatched =
        document.querySelectorAll(".game-tile.matched").length ===
        this.tiles.length;

      if (allMatched) {
        this.ui.showWinMessage();
      }
    } else {
      this.locked = true;

      setTimeout(() => {
        this.ui.hidePokemon(this.firstClick);
        this.ui.hidePokemon(this.secondClick);

        this.firstClick = null;
        this.secondClick = null;
        this.locked = false;
      }, 1000);
    }
  }
}

new GameController();

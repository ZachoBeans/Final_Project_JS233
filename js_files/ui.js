//The UI for the game. Displays the Pokemon images under each tile. I call these methods in the controller

const IMAGE_PATH = "../images/pokeCard.png";

export class UI {
  constructor() {
    this.tiles = Array.from(document.querySelectorAll(".game-tile"));
  }
  showPokemon(tile) {
    tile.style.backgroundImage = "none";
    tile.innerHTML = `<img src="${tile.dataset.image}" alt="${tile.dataset.name}">`;
  }

  hidePokemon(tile) {
    tile.innerHTML = "";
    tile.style.backgroundImage = `url(${IMAGE_PATH})`;
  }

  showWinMessage() {
    document.getElementById("win").style.display = "block";
  }

  allBackOfTiles() {
    for (let i = 0; i < this.tiles.length; i++) {
      this.backOfTile(i);
    }
  }

  backOfTile(index) {
    let tile = this.tiles[index];
    tile.style.backgroundImage = `url(${IMAGE_PATH})`;
  }

  showFrontOfTile(index) {
    let tile = this.tiles[index];
    tile.style.backgroundImage = "none";
  }
}

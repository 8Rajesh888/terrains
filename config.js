const r = require("raylib");
const ROWS = 105;
const COLUMNS = 150;

const TILE_WIDTH = 10;
const TILE_HEIGHT = 10;

const window = {
    height: ROWS * TILE_WIDTH,
    width: COLUMNS * TILE_HEIGHT,
    title: "Terrainnnnn",
    FPS: 50,
}
const palatte = {
    grass: "grass",
    house: "house",
    water: "water",
    mud: "mud",
    tree: "tree",
}

const cells = { rows: ROWS, cols: COLUMNS }
const data = { window, palatte, cells }

module.exports = { data };

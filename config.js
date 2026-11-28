const r = require("raylib");
const window = {
    height: 1100,
    width: 1700,
    title: "Terrainnnnn",
    FPS: 50,
};

const TILE_SIZE = 8;

const ROWS = Math.floor(window.height / TILE_SIZE);
const COLUMNS = Math.floor(window.width / TILE_SIZE);

const palatte = {
    grass: "grass",
    house: "house",
    water: "water",
    mud: "mud",
    tree: "tree",
};

const cells = { rows: ROWS, cols: COLUMNS };
const data = { window, palatte, cells };

module.exports = { data };

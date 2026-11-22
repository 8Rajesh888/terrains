const r = require("raylib");
const ROWS = 70;
const COLUMNS = 100;

const TILE_WIDTH = 15;
const TILE_HEIGHT = 15;

const window = {
    height: ROWS * TILE_WIDTH,
    width: COLUMNS * TILE_HEIGHT,
    title: "Terrainnnnn",
    FPS: 50,
}
const palatte = {
    grass: r.GREEN,
    house: r.WHITE,
    water: r.BLUE,
    mud: r.BROWN,
    tree: r.DARKGREEN,
}
const cells = { rows: ROWS, cols: COLUMNS }
const data = { window, palatte, cells }

module.exports = { data };

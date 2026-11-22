const r = require("raylib");
const cells = 50;
const tileSize = 20;
const window = {
    height: cells * tileSize,
    width: cells * tileSize,
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

const data = { window, palatte, cells }

module.exports = { data };

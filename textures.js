const r = require("raylib");

const loadTextures = function () {
    const texture = r.LoadTexture("assets/Pixel Art RPG Environment Tileset.png");

    return {
        texture,
        grass: { x: 30, y: 42, width: 95, height: 95 },
        mud: { x: 273, y: 42, width: 95, height: 95 },
        water: { x: 392, y: 42, width: 95, height: 95 },
        house: { x: 15, y: 405, width: 135, height: 155 },
        tree: { x: 630, y: 30, width: 140, height: 175 },
    };
};

module.exports = { loadTextures };
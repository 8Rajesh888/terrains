const r = require("raylib");

const loadTextures = function () {
    const texture = r.LoadTexture("assets/Pixel Art RPG Environment Tileset.png");

    return {
        texture,
        grass: { x: 30, y: 42, width: 95, height: 95 },
        dirt: { x: 155, y: 42, width: 95, height: 95 },
        sand: { x: 273, y: 42, width: 95, height: 95 },
        water: { x: 392, y: 42, width: 95, height: 95 },
        stone: { x: 516, y: 42, width: 95, height: 95 },

    };
};

module.exports = { loadTextures };
const { Noise } = require("noisejs");
const r = require("raylib");
const { cloneTerrain, getRandomXY } = require("./support");

const hasSurrounding = function (t, img, r, c) {
    const positions = [
        [r - 1, c - 1], [r - 1, c], [r - 1, c + 1],
        [r, c - 1], [r, c + 1],
        [r + 1, c - 1], [r + 1, c], [r + 1, c + 1]
    ]
    for (const [r, c] of positions) {
        if (t[r] === undefined) continue
        if (t[r][c] === img) return true;
    }
    return false;
}

const placeMud = function (terrain, cells, water, mud) {
    const t = cloneTerrain(terrain);

    for (let row = 0; row < cells; row++) {
        for (let col = 0; col < cells; col++) {
            if (hasSurrounding(t, water, row, col) && t[row][col] !== water) {
                t[row][col] = mud;
            }
        }
    }
    return t;
}

const placeTrees = function (terrain, cells, house, grass, tree) {
    const t = cloneTerrain(terrain);

    for (let row = 0; row < cells; row++) {
        for (let col = 0; col < cells; col++) {
            const canPlace = Math.floor(Math.random() * 20) < 6;
            if (!hasSurrounding(t, house, row, col) && t[row][col] === grass && canPlace) {
                t[row][col] = tree;
            }
        }
    }
    return t;
}

const createBase = function (num, grass) {
    const arr = [];
    for (let index = 0; index < num; index++) {
        arr.push(Array(num).fill(grass))
    }
    return arr;
}

const draw = function (cells, terrain) {
    const screenWidth = r.GetScreenWidth();
    const screenHeight = r.GetScreenHeight();
    const width = screenWidth / cells;
    const height = screenHeight / cells;
    for (let y = 0; y < cells; y++) {
        for (let x = 0; x < cells; x++) {
            r.DrawRectangle(x * width, y * width, width, height, terrain[y][x])
        }
    }
}

const canPlaceHouse = function (t, cells, { y: startRow, x: startCol }, grass) {
    for (let r = startRow - 1; r <= startRow + 2; r++) {
        for (let c = startCol - 1; c <= startCol + 2; c++) {
            if (r < 0 || r >= cells || c < 0 || c >= cells) return false;
            if (!(t[r][c] === grass)) return false;
        }
    }
    return true;
}

const placeHouses = function (terrain, cells, house, grass) {
    const t = cloneTerrain(terrain);

    const dim = Math.floor(cells / 3)
    const noOfHouse = Math.floor(1 + Math.random() * dim);
    let attempts = 0;
    for (let index = 0; index < noOfHouse; index++) {
        let cord = getRandomXY(cells);
        attempts = 0;
        while (!canPlaceHouse(t, cells, cord, grass) && attempts++ < 15) {
            cord = getRandomXY(cells);
        }
        if (attempts === 16) continue;
        const { x, y } = cord;
        t[y][x] = house;
        t[y + 1][x] = house;
        t[y][x + 1] = house;
        t[y + 1][x + 1] = house;
    }
    return t;
}

const addRiver = function (terrain, water) {
    const noise = new Noise(Math.random());
    const map = cloneTerrain(terrain);

    const { x: centerX, y: centerY } = getRandomXY(terrain.length);
    const baseRadius = 5;

    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[0].length; x++) {
            const dx = x - centerX;
            const dy = y - centerY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const angle = Math.atan2(dy, dx);

            const noiseVal = noise.perlin2(Math.cos(angle), Math.sin(angle));
            const maxRadius = baseRadius + noiseVal * 3;

            if (distance <= maxRadius) {
                map[y][x] = water;

            }
        }
    }

    return map;
};

const create = function (cells, palatte) {
    const { grass, house, water, mud, tree } = palatte;
    let t = createBase(cells, grass);
    t = addRiver(t, water);
    t = placeMud(t, cells, water, mud);
    t = placeHouses(t, cells, house, grass);
    t = placeTrees(t, cells, house, grass, tree);
    return t;
}

module.exports = { create, draw };
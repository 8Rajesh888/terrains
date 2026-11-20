const { Noise } = require("noisejs");
const grass = `🟩`;
const house = `🛖`;
const water = `🟦`;
const mud = `🟫`;
const tree = `🌲`;
const cells = 26;

function cloneTerrain(terrain) {
    const clone = [];
    for (const row of terrain) {
        clone.push([...row]);
    }
    return clone;
}



const pick = function (...values) {
    const index = Math.floor(Math.random() * values.length);
    return values[index]
}

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

const placeRiver = function (terrain, cells, water) {
    const t = cloneTerrain(terrain);

    const dim = Math.floor(cells / 3)
    const X = pick(0, cells - 1);
    const Y = pick(0, cells - 1);
    let width = Math.floor(Math.random() * dim + dim);
    const height = Math.floor(Math.random() * dim + dim);

    const stepX = X === 0 ? 1 : -1;
    const stepY = Y === 0 ? 1 : -1;

    for (let rowOffset = 0; rowOffset < height; rowOffset++) {
        const r = Y + (rowOffset * stepY);
        for (let colOffset = 0; colOffset < width; colOffset++) {
            const c = X + (colOffset * stepX);
            t[r][c] = water;
        }
        width = Math.max(1, width - Math.floor(Math.random() * 2));
    }

    return t;
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

const create = function (num, grass) {
    const arr = [];
    for (let index = 0; index < num; index++) {
        arr.push(Array(num).fill(grass))
    }
    return arr;
}

const draw = function (terrain) {
    for (const element of terrain) {
        console.log(...element);
    }
}

const getRandom = function (cells) {
    return Math.floor(Math.random() * (cells - 1));
}

const getRandomXY = function (cells) {
    return { x: getRandom(cells), y: getRandom(cells) };
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

// const addRiver = function (terrain, water) {
//     const noise = new Noise(Math.random());
//     const map = structuredClone(terrain);
//     // const centerX = Math.floor(Math.random() * map[0].length)
//     // const centerY = Math.floor(Math.random() * map.length)
//     const { x: centerX, y: centerY } = getRandomXY(terrain.length);
//     console.log({ centerX, centerY });

//     for (let i = 0; i < 20; i++) {
//         const point = noise.perlin2(i * 0.1, 10);
//         const actucalPoint = Math.floor(point * 10 + 1);
//         const degree = (360 / 20) * i;
//         const x = Math.floor(centerX + Math.sin(degree * Math.PI / 180) * actucalPoint);
//         const y = Math.floor(centerY + Math.cos(degree * Math.PI / 180) * actucalPoint);

//         // console.log(x,
//         //  y)
//         if (map[y] === undefined || map[y][x] === undefined) continue
//         map[y][x] = water;
//     }

//     // for (const row of map) {
//     // console.log(...row);
//     // }
//     return map;
// }


const addRiver = function (terrain, water) {
    const noise = new Noise(Math.random());
    const map = structuredClone(terrain);

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

            console.log(map[y][x]);
            if (distance <= maxRadius) {
                map[y][x] = water;

            }
        }
    }

    return map;
};




const createTerrain = function (cells, water, mud, grass, house) {
    let t = create(cells, grass);
    // t = placeRiver(t, cells, water);
    t = addRiver(t, water);
    t = placeMud(t, cells, water, mud);
    t = placeHouses(t, cells, house, grass);
    t = placeTrees(t, cells, house, grass, tree);
    return t
}

const terrain = createTerrain(cells, water, mud, grass, house);

draw(terrain);



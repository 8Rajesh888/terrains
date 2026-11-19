const grassImg = `🟩`;
const houseImg = `🛖`;
const waterImg = `🟦`;
const mudImg = `🟫`;
const cells = 10;

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

const placeRiver = function (terrain, cells, waterImg) {
    const t = [];
    for (const row of terrain) {
        t.push([...row]);
    }

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
            t[r][c] = waterImg;
        }
        width = Math.max(1, width - Math.floor(Math.random() * 2));
    }

    return t;
}

const placeMud = function (terrain, cells, waterImg, mudImg, grassImg) {
    const t = [];
    for (const row of terrain) {
        t.push([...row]);
    }

    for (let row = 0; row < cells; row++) {
        for (let col = 0; col < cells; col++) {
            if (hasSurrounding(t, waterImg, row, col) && t[row][col] !== waterImg) {
                t[row][col] = mudImg;
            }
        }
    }
    return t;
}

const create = function (num, grassImg) {
    const arr = [];
    for (let index = 0; index < num; index++) {
        arr.push(Array(num).fill(grassImg))
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

const canPlaceHouse = function (t, cells, { y: startRow, x: startCol }, grassImg) {
    for (let r = startRow - 1; r <= startRow + 2; r++) {
        for (let c = startCol - 1; c <= startCol + 2; c++) {
            if (r < 0 || r >= cells || c < 0 || c >= cells) return false;
            if (t[r][c] === `🛖` || !(t[r][c] === grassImg)) return false;
        }
    }
    return true;
}

const house = function (terrain, cells, houseImg, grassImg) {
    const t = [];
    for (const row of terrain) {
        t.push([...row]);
    }

    const noOfHouse = Math.floor(1 + Math.random() * 3);
    let attempts = 0;
    for (let index = 0; index < noOfHouse; index++) {
        let cord = getRandomXY(cells);
        while (!canPlaceHouse(t, cells, cord, grassImg) && attempts++ < 15) {
            cord = getRandomXY(cells);
        }
        if (attempts === 15) continue;
        attempts = 0;
        const { x, y } = cord;
        t[y][x] = houseImg;
        t[y + 1][x] = houseImg;
        t[y][x + 1] = houseImg;
        t[y + 1][x + 1] = houseImg;
    }
    return t;
}

let terrain = create(cells, grassImg);
terrain = placeRiver(terrain, cells, waterImg)
terrain = placeMud(terrain, cells, waterImg, mudImg, grassImg)
terrain = house(terrain, cells, houseImg, grassImg)

draw(terrain);
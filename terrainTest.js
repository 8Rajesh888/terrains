const grassImg = `🟩`;
const houseImg = `🛖`;
const waterImg = `🟦`;
const cells = 10;

const pick = function (...values) {
    const index = Math.floor(Math.random() * values.length);
    return values[index]
}

const placeRiver = function (terrain, cells, waterImg) {
    const t = [];
    for (const row of terrain) {
        t.push([...row]);
    }

    const X = pick(0, cells - 1);
    const Y = pick(0, cells - 1);
    let width = Math.floor(Math.random() * 3 + 3);
    const height = Math.floor(Math.random() * 3 + 3);

    const stepX = X === 0 ? 1 : -1;
    const stepY = Y === 0 ? 1 : -1;

    for (let rowOffset = 0; rowOffset < height; rowOffset++) {
        for (let colOffset = 0; colOffset < width; colOffset++) {
            const r = Y + (rowOffset * stepY);
            const c = X + (colOffset * stepX);
            t[r][c] = waterImg;
        }
        width = Math.max(1, width - Math.floor(Math.random() * 2));
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

const canPlaceHouse = function (t, cells, { y: startRow, x: startCol }) {

    for (let r = startRow - 1; r <= startRow + 2; r++) {
        for (let c = startCol - 1; c <= startCol + 2; c++) {
            if (r < 0 || r >= cells || c < 0 || c >= cells) return false;
            if (t[r][c] === `🛖`) return false;
        }
    }
    return true;
}

const house = function (terrain, cells, houseImg) {
    const t = [];
    for (const row of terrain) {
        t.push([...row]);
    }

    const noOfHouse = Math.floor(1 + Math.random() * 3);
    let attempts = 0;
    for (let index = 0; index < noOfHouse; index++) {
        let cord = getRandomXY(cells);
        while (!canPlaceHouse(t, cells, cord) && attempts++ < 15) {
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
terrain = house(terrain, cells, houseImg)
terrain = placeRiver(terrain, cells, waterImg)

draw(terrain);
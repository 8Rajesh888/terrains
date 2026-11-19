const grassImg = `🟩`;
const houseImg = `🛖`;

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

const house = function (terrain, cells, houseImg) {
    const x = Math.floor(Math.random() * (cells - 1));
    const y = Math.floor(Math.random() * (cells - 1));
    const t = [...terrain];
    t[x][y] = houseImg;
    t[x + 1][y] = houseImg;
    t[x][y + 1] = houseImg;
    t[x + 1][y + 1] = houseImg;
    return t;
}

const cells = 10
let terrain = create(cells, grassImg);
terrain = house(terrain, cells, houseImg)


draw(terrain)

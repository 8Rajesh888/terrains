const create = function (num) {
    const arr = [];
    for (let index = 0; index < num; index++) {
        arr.push(Array(num).fill("A"))
    }
    return arr;
}

const draw = function (terrain) {
    for (const element of terrain) {
        console.log(...element);
    }
}

const house = function (terrain, cells) {
    const x = Math.floor(Math.random() * cells - 1);
    const y = Math.floor(Math.random() * cells - 1);
    const t = [...terrain];
    t[x][y] = "H";
    t[x + 1][y] = "H";
    t[x][y + 1] = "H";
    t[x + 1][y + 1] = "H";
    return t;
}

const cells = 10
let terrain = create(cells);
terrain = house(terrain, cells)


draw(terrain)


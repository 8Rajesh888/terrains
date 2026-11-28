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
const getRandom = function (cells) {
    return Math.floor(Math.random() * (cells - 3));
}

const getRandomXY = function (cells) {
    return { x: getRandom(cells.cols), y: getRandom(cells.rows) };
}

module.exports = {
    cloneTerrain,
    pick,
    getRandomXY,
}
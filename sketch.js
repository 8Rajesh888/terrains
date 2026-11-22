const r = require("raylib");
const config = require("./config");
const nature = require("./nature");

function running() {
    return !r.WindowShouldClose();
}

function setup() {
    const { window, palatte, cells } = config.data;
    const { width, height, title, FPS } = window;

    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(width, height, title);
    r.SetTargetFPS(FPS);

    const terrain = nature.create(cells, palatte);

    return { terrain, cells };
}

function update() {

}

function draw(world) {
    const { terrain, cells } = world;
    r.BeginDrawing();
    r.ClearBackground(r.BLACK);
    nature.draw(cells, terrain);
    r.EndDrawing();

}

function teardown() {
    r.CloseWindow();
}

module.exports = {
    running,
    setup,
    update,
    draw,
    teardown,
};
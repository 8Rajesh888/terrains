const r = require("raylib");
const config = require("./config");
const nature = require("./nature");
const texture = require("./textures");

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
    const textures = texture.loadTextures()

    return { terrain, cells, textures };
}

function update() {

}

function draw(world) {
    const { terrain, cells, textures } = world;
    r.BeginDrawing();
    r.ClearBackground(r.BLACK);
    nature.draw(cells, terrain, textures);
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
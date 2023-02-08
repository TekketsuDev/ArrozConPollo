"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameMap = void 0;
const Cell_1 = require("./Cell");
class GameMap {
    constructor(width, height) {
        this.height = height;
        this.width = width;
        this.map = new Array(this.height);
        for (let y = 0; y < this.height; y++) {
            this.map[y] = new Array(this.width);
            for (let x = 0; x < this.width; x++) {
                this.map[y][x] = new Cell_1.Cell(x, y);
            }
        }
    }
    getCellByPos(pos) {
        return this.map[pos.y][pos.x];
    }
    getCell(x, y) {
        return this.map[y][x];
    }
    _setResource(type, x, y, amount) {
        const cell = this.getCell(x, y);
        cell.resource = {
            type, amount
        };
    }
}
exports.GameMap = GameMap;
//# sourceMappingURL=GameMap.js.map
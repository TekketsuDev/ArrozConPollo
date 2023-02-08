"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cell = void 0;
const Position_1 = require("./Position");
class Cell {
    constructor(x, y) {
        this.resource = null;
        this.citytile = null;
        this.road = 0;
        this.pos = new Position_1.Position(x, y);
    }
    hasResource() {
        return this.resource !== null && this.resource.amount > 0;
    }
}
exports.Cell = Cell;
//# sourceMappingURL=Cell.js.map
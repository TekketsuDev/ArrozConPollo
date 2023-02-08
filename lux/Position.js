"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Position = void 0;
const game_constants_json_1 = __importDefault(require("./game_constants.json"));
const { DIRECTIONS } = game_constants_json_1.default;
class Position {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    isAdjacent(pos) {
        const dx = this.x - pos.x;
        const dy = this.y - pos.y;
        return Math.abs(dx) + Math.abs(dy) <= 1;
    }
    equals(pos) {
        return this.x === pos.x && this.y === pos.y;
    }
    translate(direction, units) {
        switch (direction) {
            case DIRECTIONS.NORTH:
                return new Position(this.x, this.y - units);
            case DIRECTIONS.EAST:
                return new Position(this.x + units, this.y);
            case DIRECTIONS.SOUTH:
                return new Position(this.x, this.y + units);
            case DIRECTIONS.WEST:
                return new Position(this.x - units, this.y);
            case DIRECTIONS.CENTER:
                return new Position(this.x, this.y);
        }
    }
    /** Returns Manhattan distance to pos from this position */
    distanceTo(pos) {
        return Math.abs(pos.x - this.x) + Math.abs(pos.y - this.y);
    }
    /** Returns closest direction to targetPos, or null if staying put is best */
    directionTo(targetPos) {
        const checkDirections = [
            DIRECTIONS.NORTH,
            DIRECTIONS.EAST,
            DIRECTIONS.SOUTH,
            DIRECTIONS.WEST,
        ];
        let closestDirection = DIRECTIONS.CENTER;
        let closestDist = this.distanceTo(targetPos);
        checkDirections.forEach((dir) => {
            const newpos = this.translate(dir, 1);
            const dist = targetPos.distanceTo(newpos);
            if (dist < closestDist) {
                closestDist = dist;
                closestDirection = dir;
            }
        });
        return closestDirection;
    }
}
exports.Position = Position;
//# sourceMappingURL=Position.js.map
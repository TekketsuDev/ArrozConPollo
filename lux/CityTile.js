"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CityTile = void 0;
/** CityTile and Unit are both actionable and can return action strings to send to engine  */
const Position_1 = require("./Position");
class CityTile {
    constructor(teamid, cityid, x, y, cooldown) {
        this.cityid = cityid;
        this.team = teamid;
        this.pos = new Position_1.Position(x, y);
        this.cooldown = cooldown;
    }
    /** Whether or not this unit can research or build */
    canAct() {
        return this.cooldown < 1;
    }
    /** returns command to ask this tile to research this turn */
    research() {
        return `r ${this.pos.x} ${this.pos.y}`;
    }
    /** returns command to ask this tile to build a worker this turn */
    buildWorker() {
        return `bw ${this.pos.x} ${this.pos.y}`;
    }
    /** returns command to ask this tile to build a cart this turn */
    buildCart() {
        return `bc ${this.pos.x} ${this.pos.y}`;
    }
}
exports.CityTile = CityTile;
//# sourceMappingURL=CityTile.js.map
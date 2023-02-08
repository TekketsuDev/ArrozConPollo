"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Unit = void 0;
const game_constants_json_1 = __importDefault(require("./game_constants.json"));
const Position_1 = require("./Position");
class Unit {
    constructor(teamid, type, unitid, x, y, cooldown, wood, coal, uranium) {
        this.pos = new Position_1.Position(x, y);
        this.team = teamid;
        this.id = unitid;
        this.type = type;
        this.cooldown = cooldown;
        this.cargo = {
            wood,
            coal,
            uranium
        };
    }
    isWorker() {
        return this.type === game_constants_json_1.default.UNIT_TYPES.WORKER;
    }
    isCart() {
        return this.type === game_constants_json_1.default.UNIT_TYPES.CART;
    }
    getCargoSpaceLeft() {
        const spaceused = this.cargo.wood + this.cargo.coal + this.cargo.uranium;
        if (this.type === game_constants_json_1.default.UNIT_TYPES.WORKER) {
            return game_constants_json_1.default.PARAMETERS.RESOURCE_CAPACITY.WORKER - spaceused;
        }
        else {
            return game_constants_json_1.default.PARAMETERS.RESOURCE_CAPACITY.CART - spaceused;
        }
    }
    /** whether or not the unit can build where it is right now */
    canBuild(gameMap) {
        const cell = gameMap.getCellByPos(this.pos);
        return !cell.hasResource() && this.canAct() && (this.cargo.wood + this.cargo.coal + this.cargo.uranium) >= game_constants_json_1.default.PARAMETERS.CITY_BUILD_COST;
    }
    /** whether or not the unit can act or not. This does not check for potential collisions into other units or enemy cities */
    canAct() {
        return this.cooldown < 1;
    }
    /** return the command to move unit in the given direction */
    move(dir) {
        return `m ${this.id} ${dir}`;
    }
    /** return the command to transfer a resource from a source unit to a destination unit as specified by their ids or the units themselves */
    transfer(destUnitId, resourceType, amount) {
        return `t ${this.id} ${destUnitId} ${resourceType} ${amount}`;
    }
    /** return the command to build a city right under the worker */
    buildCity() {
        return `bcity ${this.id}`;
    }
    /** return the command to pillage whatever is underneath the worker */
    pillage() {
        return `p ${this.id}`;
    }
}
exports.Unit = Unit;
//# sourceMappingURL=Unit.js.map
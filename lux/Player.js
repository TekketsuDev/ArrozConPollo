"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
const game_constants_json_1 = __importDefault(require("./game_constants.json"));
/**
 * holds all data related to a player
 */
class Player {
    constructor(teamid) {
        this.researchPoints = 0;
        // Map unit id to the unit
        this.units = new Array();
        this.cities = new Map();
        this.cityTileCount = 0;
        this.team = teamid;
    }
    researchedCoal() {
        return this.researchPoints >= game_constants_json_1.default.PARAMETERS.RESEARCH_REQUIREMENTS.COAL;
    }
    researchedUranium() {
        return this.researchPoints >= game_constants_json_1.default.PARAMETERS.RESEARCH_REQUIREMENTS.URANIUM;
    }
}
exports.Player = Player;
//# sourceMappingURL=Player.js.map
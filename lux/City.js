"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.City = void 0;
// all data related to a city
const CityTile_1 = require("./CityTile");
class City {
    constructor(teamid, cityid, fuel, lightUpkeep) {
        this.citytiles = new Array();
        this.cityid = cityid;
        this.team = teamid;
        this.fuel = fuel;
        this.lightUpkeep = lightUpkeep;
    }
    addCityTile(x, y, cooldown) {
        const ct = new CityTile_1.CityTile(this.team, this.cityid, x, y, cooldown);
        this.citytiles.push(ct);
        return ct;
    }
    getLightUpkeep() {
        return this.lightUpkeep;
    }
}
exports.City = City;
//# sourceMappingURL=City.js.map
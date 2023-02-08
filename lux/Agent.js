"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.annotate = exports.Agent = void 0;
const readline_1 = __importDefault(require("readline"));
const Player_1 = require("./Player");
const GameMap_1 = require("./GameMap");
const City_1 = require("./City");
const Unit_1 = require("./Unit");
const Parser_1 = require("./Parser");
const io_1 = require("./io");
// Create parser and use ',' as the delimiter between commands being sent by the `Match` and `MatchEngine`
const parse = new Parser_1.Parser(' ');
/**
 * Agent for sequential `Designs`
 */
class Agent {
    _setup() {
        // Prepare to read input
        const rl = readline_1.default.createInterface({
            input: process.stdin,
            output: null,
        });
        const buffer = [];
        let currentResolve;
        let currentPromise;
        const makePromise = function () {
            return new Promise((resolve) => {
                currentResolve = resolve;
            });
        };
        // on each line, push line to buffer
        rl.on('line', (line) => {
            buffer.push(line);
            currentResolve();
            currentPromise = makePromise();
        });
        // The current promise for retrieving the next line
        currentPromise = makePromise();
        // with await, we pause process until there is input
        this.getLine = () => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                while (buffer.length === 0) {
                    // pause while buffer is empty, continue if new line read
                    yield currentPromise;
                }
                // once buffer is not empty, resolve the most recent line in stdin, and remove it
                resolve(parse(buffer.shift()));
            }));
        });
    }
    /**
     * Constructor for a new agent
     * User should edit this according to the `Design` this agent will compete under
     */
    constructor() {
        this._setup(); // DO NOT REMOVE
    }
    /**
     * Initialize Agent for the `Match`
     * User should edit this according to their `Design`
     */
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            // get agent ID
            const id = (yield this.getLine()).nextInt();
            // get some other necessary initial input
            let mapInfo = (yield this.getLine());
            let width = mapInfo.nextInt();
            let height = mapInfo.nextInt();
            const map = new GameMap_1.GameMap(width, height);
            const players = [new Player_1.Player(0), new Player_1.Player(1)];
            this.gameState = {
                id,
                map,
                players,
                turn: -1,
            };
        });
    }
    /**
     * Updates agent's own known state of `Match`
     * User should edit this according to their `Design`.
     */
    update() {
        return __awaiter(this, void 0, void 0, function* () {
            this.gameState.turn++;
            // wait for the engine to send any updates
            yield this.retrieveUpdates();
        });
    }
    resetPlayerStates() {
        const players = this.gameState.players;
        players[0].units = [];
        players[0].cities = new Map();
        players[0].cityTileCount = 0;
        players[1].units = [];
        players[1].cities = new Map();
        players[1].cityTileCount = 0;
    }
    retrieveUpdates() {
        return __awaiter(this, void 0, void 0, function* () {
            this.resetPlayerStates();
            // TODO: this can be optimized. we only reset because some resources get removed
            this.gameState.map = new GameMap_1.GameMap(this.gameState.map.width, this.gameState.map.height);
            while (true) {
                let update = (yield this.getLine());
                if (update.str === io_1.INPUT_CONSTANTS.DONE) {
                    break;
                }
                const inputIdentifier = update.nextStr();
                switch (inputIdentifier) {
                    case io_1.INPUT_CONSTANTS.RESEARCH_POINTS: {
                        const team = update.nextInt();
                        this.gameState.players[team].researchPoints = update.nextInt();
                        break;
                    }
                    case io_1.INPUT_CONSTANTS.RESOURCES: {
                        const type = update.nextStr();
                        const x = update.nextInt();
                        const y = update.nextInt();
                        const amt = update.nextInt();
                        this.gameState.map._setResource(type, x, y, amt);
                        break;
                    }
                    case io_1.INPUT_CONSTANTS.UNITS: {
                        const unittype = update.nextInt();
                        const team = update.nextInt();
                        const unitid = update.nextStr();
                        const x = update.nextInt();
                        const y = update.nextInt();
                        const cooldown = update.nextFloat();
                        const wood = update.nextInt();
                        const coal = update.nextInt();
                        const uranium = update.nextInt();
                        this.gameState.players[team].units.push(new Unit_1.Unit(team, unittype, unitid, x, y, cooldown, wood, coal, uranium));
                        break;
                    }
                    case io_1.INPUT_CONSTANTS.CITY: {
                        const team = update.nextInt();
                        const cityid = update.nextStr();
                        const fuel = update.nextFloat();
                        const lightUpkeep = update.nextFloat();
                        this.gameState.players[team].cities.set(cityid, new City_1.City(team, cityid, fuel, lightUpkeep));
                        break;
                    }
                    case io_1.INPUT_CONSTANTS.CITY_TILES: {
                        const team = update.nextInt();
                        const cityid = update.nextStr();
                        const x = update.nextInt();
                        const y = update.nextInt();
                        const cooldown = update.nextFloat();
                        const city = this.gameState.players[team].cities.get(cityid);
                        const citytile = city.addCityTile(x, y, cooldown);
                        this.gameState.map.getCell(x, y).citytile = citytile;
                        this.gameState.players[team].cityTileCount += 1;
                        break;
                    }
                    case io_1.INPUT_CONSTANTS.ROADS: {
                        const x = update.nextInt();
                        const y = update.nextInt();
                        const road = update.nextFloat();
                        this.gameState.map.getCell(x, y).road = road;
                        break;
                    }
                }
            }
        });
    }
    /**
     * End a turn
     */
    endTurn() {
        console.log('D_FINISH');
    }
    run(loop) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.initialize();
            while (true) {
                yield this.update();
                try {
                    const actions = loop(this.gameState);
                    console.log(actions.join(","));
                }
                catch (err) {
                    console.log(err);
                }
                this.endTurn();
            }
        });
    }
}
exports.Agent = Agent;
exports.annotate = {
    circle: (x, y) => {
        return `dc ${x} ${y}`;
    },
    x: (x, y) => {
        return `dx ${x} ${y}`;
    },
    line: (x1, y1, x2, y2) => {
        return `dl ${x1} ${y1} ${x2} ${y2}`;
    },
    text: (x1, y1, message, fontsize = 16) => {
        return `dt ${x1} ${y1} '${message}' ${fontsize}`;
    },
    sidetext: (message) => {
        return `dst '${message}'`;
    }
};
//# sourceMappingURL=Agent.js.map
const kit = require('./lux/kit');
const GAME_CONSTANTS = require('./lux/game_constants');
const DIRECTIONS = GAME_CONSTANTS.DIRECTIONS;
const HeatMap = require("./ArrozConPollo/HeatMap");
// create a new agent
const agent = new kit.Agent();
const annotate = kit.annotate;

// first initialize the agent, and then proceed to go in a loop waiting for updates and running the AI


agent.initialize().then(async () => {
  while (true) {
    /** Do not edit! **/
    // wait for updates
    await agent.update();

    const actions = [];
    const gameState = agent.gameState;
    /** AI Code Goes Below! **/

    const player = gameState.players[gameState.id];
    const opponent = gameState.players[(gameState.id + 1) % 2];
    const gameMap = gameState.map;
    const heat = new HeatMap(gameState);
    let map = heat.update(gameState);

    //const stateMachine = new StateMachine();
    for (let i = 0; i < player.units.length; i++) {
        let unit = player.units[i];
        
        //const dir = unit.pos.directionTo(closestResourceTile.pos)
        //actions = actions.push(unit.move("n"));
    }
    player.cities.forEach((city, cityID) => {
        //actions = actions.push();
        
    });
    // you can add debug annotations using the functions in the annotate object
    
    /** AI Code Goes Above! **/
    /** Do not edit! **/
    console.log(actions.join(","));
    // end turn
    agent.endTurn();
    }
});

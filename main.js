const kit = require('./lux/kit');
const GAME_CONSTANTS = require('./lux/game_constants');
const DIRECTIONS = GAME_CONSTANTS.DIRECTIONS;
const HeatMap = require("./ArrozConPollo/HeatMap");
const Astar_1 = require("./ArrozConPollo/utils/Astar");
const { Console } = require('console');
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
    const workers = player.units;
    const opponent = gameState.players[(gameState.id + 1) % 2];
    const gameMap = gameState.map;
    const heat = new HeatMap(gameState);
    let map= heat.update(gameState);
    const Astar = new Astar_1(gameState).getArrayPath();

/*     for (let f = 0; f < workers.length; f++) {
      console.log(workers[f].pos);
    } */
      
     for (let j = 0; j < gameMap.height; j++) {
        for (let i = 0; i < gameMap.width; i++) {
          let worker = map[j][i];

          /* 
            THE PROPERTY .ISUNIT IS OVERLOAD EVERYTIME IT PASSES A TURN
          */
          if(worker.hasOwnProperty('isUnit')) {
            if(gameState.turn == 1){
              let previousMove = map[j][i-1];
              console.log();
              console.log('TURNO ACTUAL x : ' + j + ' y : ' + i);
              console.log(worker);
              
              console.log('TURNO ANTERIOR x : ' + j + ' y : ' + (i-1));
              console.log(previousMove);
            }
          }
  
         /*     for (let f = 0; f < workers.length; f++) {
      console.log(workers[f].pos);
          }
              
          if(map[i][j]. = 'u_1' && ((gameState.turn == 0) || (gameState.turn == 5))){
               console.log(this.map[i][j].pos + this.map[i][j].pos);
        
            console.log('Turno del juego: ' + gameState.turn +  /* ' x:'+  + ' y:' + this.map[i][j].pos.y +  '  thisTile: ' + map[i][j].typeOfTile + ' ESTA UNIDAD:' + map[i][j].isUnit);
          }  */
     
      }
    } 
        
    //const stateMachine = new StateMachine();
    for (let i = 0; i < player.units.length; i++) {
        let unit = player.units[i];
        actions.push(unit.move(GAME_CONSTANTS.DIRECTIONS.NORTH));
        
        
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

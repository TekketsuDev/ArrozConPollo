const kit = require('../lux/kit');
const GAME_CONSTANTS = require('../lux/game_constants');
const { Console } = require('console');
class HeatMap {
  constructor(){

  }
  update(gameState) {
    this.gameState = gameState;
    this.gameMap = gameState.map;
    this.player = gameState.players[gameState.id];
    this.enemy = gameState.players[(gameState.id + 1) % 2];
    this.playerUnits = 1;
    this.enemyUnits = gameState.players;
    this.currentOwnWorkersPos = [];
    this.currentEnemyWorkersPos = [];
    this.heat= this.initializeMap(this.gameMap);
    //this.lol = this.mostEfficientTile(this.gameMap,this.heat);
     
  
  }
  /*
        gameMap.getCellByPos(unit.pos).hasResource();
  */

  initializeMap(gameMap) {
    this.map = new Array(gameMap.height).fill().map(() => new Array(gameMap.width).fill());
    for (let y = 0; y < gameMap.height; y++) {
      for (let x = 0; x < gameMap.width; x++) {
        let cell = gameMap.getCell(x, y);
        this.map[y][x] = this.checkTile(cell);
      }
    }
    return this.map;
    
  }
  checkTile(cell){
    let typeofTile;
    if(cell.hasResource()){
      console.table(cell.resource.amount); 
      //Have in consideration the enemy if its gathering resources better loop that in workers map
      if(cell.resource.type === GAME_CONSTANTS.RESOURCE_TYPES.WOOD){
        return typeofTile = 1;
      }
      else if(cell.resource.type === GAME_CONSTANTS.RESOURCE_TYPES.COAL){
        return typeofTile = 'COAL';
      }
      else if(cell.resource.type === GAME_CONSTANTS.RESOURCE_TYPES.URANIUM){
        return typeofTile = 'URANIUM';
      }
    }
    else if(cell.citytile != null) {
      
      if(cell.citytile.team == this.player.team){
        return typeofTile = 'ArrozCity';
      }
      else if(cell.citytile.team == this.enemy.team){
        return typeofTile = 'EnemyCity';
      }
    }
    else{
      return typeofTile = 'Avariable';
    }
/*     else if(cell.pos.equals(this.player)){
      
      return typeofTile = 'EnemyWorker';
    }
    else if(cell.pos.equals(this.enemy)){
      
      return typeofTile = 'OwnWorker';
    } */


  }
  mostEfficientTile(gameMap, map){

    //TOP-LEFT remove adjacent [x-1, y], [x, y-1]
    //TOP-RIGHT remove adjacent [x+1, y] [x, y-1]
    //BOTTOM-LEFT remove adjacent [x, y+1] [x-1, y]
    //BOTTOM-RIGHT remove adjacent [x+1, y], [x, y+1]
    const valueTile = []; 
    for (let y = 0; y < gameMap.height; y++) {
      for (let x = 0; x < gameMap.width; x++) {
        let current = map[x][y];

        let adjacentCells = [];
        if(x == 0 || y== 0 || y == gameMap.height || x == gameMap.width){
          if(x == 0)
            adjacentCells.push(map[x+1][y]);
          if(y == 0)
            adjacentCells.push(map[x][y+1]);
          if(x == gameMap.width)
            adjacentCells.push(map[x-1][y]);
          if(y == gameMap.height)
            adjacentCells.push(map[x][y-1]);

          adjacentCells.forEach(adjCell => {if(adjCell == map[x][y]){current++} });
        }
        else{
          adjacentCells = [(current[x+1][y]), (current[x][y+1]), (current[x-1][y]), (current[x][y-1])];
          adjacentCells.forEach(adjCell => {if(adjCell == map[x][y]){current++} });
        }
        this.map[y][x] = current;
        if(map[x][y] = 5 || 4){
        }
      }
    }
    return {
      map: this.map,
      valueTile: this.valueTile(),
    }
  }
}
module.exports = HeatMap;
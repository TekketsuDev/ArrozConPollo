const GAME_CONSTANTS = require('../lux/game_constants');
const { Console } = require('console');
class HeatMap {
  constructor(gameState){
    this.gameState = gameState;
    this.gameMap = gameState.map;
    this.width = gameState.map.width;
    this.height = gameState.map.height;
  }
  update(gameState) {
    this.gameState = gameState;
    this.gameMap = gameState.map;
    this.player = gameState.players[gameState.id];
    this.enemy = gameState.players[(gameState.id + 1) % 2];
    this.enemyUnitsPosArray = new Array();
    this.playerUnitsPosArray = new Array();
    
   
    this.playerUnitsPosArray = this.updateOwnWorkers();
    this.enemyUnitsPosArray = this.updateEnemyWorkers();
    this.map = new Array(this.height).fill().map(() => new Array(this.width).fill());
    
    this.heatMap = this.initializeMap(this.gameMap);
    //this.lol = this.mostEfficientTile(this.gameMap,this.heat);
  }
  updateOwnWorkers(){
    for(let u= 0; u < this.player.units.length; u++){
      this.playerUnitsPosArray.push(this.player.units[u].pos);
    }
    return this.playerUnitsPosArray;
  }
  updateEnemyWorkers(){
    for(let u=0; u < this.enemy.units.length; u++){
      this.enemyUnitsPosArray.push(this.enemy.units[u].pos);
    }
    return this.enemyUnitsPosArray;
  }
  initializeMap(gameMap){
    for (let y = 0; y < gameMap.height; y++) {
      for (let x = 0; x < gameMap.width; x++) {
        
        let cell = gameMap.getCell(x, y);
        this.map[x][y] = this.checkTile(cell, x, y); 
        
      }
    }
    return this.map;
  }
  checkTile(cell, x, y){
    let tileState;

    if(cell.hasResource()){
      //Have in consideration the enemy if its gathering resources better loop that in workers map
      if(cell.resource.type === GAME_CONSTANTS.RESOURCE_TYPES.WOOD){
        tileState = ['F',cell.resource.amount < 20 ? cell.resource.amount : 20];
      }
      else if(cell.resource.type === GAME_CONSTANTS.RESOURCE_TYPES.COAL ){
        tileState = ['F',this.player.researchedCoal() ? (cell.resource.amount < 50 ? cell.resource.amount : 50) : 0];
      }
      else if(cell.resource.type === GAME_CONSTANTS.RESOURCE_TYPES.URANIUM){
        tileState = this.player.researchedUranium() ? (cell.resource.amount < 80 ? cell.resource.amount : 80) : 0;
      }
    }
    else if(cell.citytile != null) {
      if(cell.citytile.team == this.player.team){
        tileState = 'ArrozCity';
      }
      else if(cell.citytile.team == this.enemy.team){
        tileState = 'EnemyCity';
      }
    }
    else{
       tileState = 'canBuild';
    }
    return tileState;

  }
  mostEfficientTile(gameMap, map){

    //TOP-LEFT remove adjacent [x-1, y], [x, y-1]
    //TOP-RIGHT remove adjacent [x+1, y] [x, y-1]
    //BOTTOM-LEFT remove adjacent [x, y+1] [x-1, y]
    //BOTTOM-RIGHT remove adjacent [x+1, y], [x, y+1]
    for (let y = 0; y < gameMap.height; y++) {
      for (let x = 0; x < gameMap.width; x++) {
        let current = map[x][y];
        let adjacentCells = [];
        if(x == 0 || y== 0 || y == gameMap.height || x == gameMap.width){
          if(x == 0){
            adjacentCells.push(map[x+1][y]);
          }
          if(y == 0){
            adjacentCells.push(map[x][y+1]);
          }
          if(x == gameMap.width){
            adjacentCells.push(map[x-1][y]);
          }
          if(y == gameMap.height){
            adjacentCells.push(map[x][y-1]);
          }
          adjacentCells.forEach(adjCell => {if(Number.isInteger(adjCell)){current += adjCell}});
        }
        else{
          adjacentCells = [(current[x+1][y]), (current[x][y+1]), (current[x-1][y]), (current[x][y-1])];
          adjacentCells.forEach(adjCell => {if(Number.isInteger(adjCell)){current += adjCell}});
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

  bestCityTileSpot(CityRole, CityID){
    switch (CityRole) {
      case 'Research':
        break;
      case 'SurviveFewResources':
        break;
      case 'Metropolis':
        break;
      case 'Mining':
        break;
      default:
        break;
    }
    for (let y = 0; y < gameMap.height; y++) {
      for (let x = 0; x < gameMap.width; x++) {
        let current = map[x][y];
        let adjacentCells = [];
        if(x == 0 || y== 0 || y == gameMap.height || x == gameMap.width){
          if(x == 0){
            adjacentCells.push(map[x+1][y]);
          }
          if(y == 0){
            adjacentCells.push(map[x][y+1]);
          }
          if(x == gameMap.width){
            adjacentCells.push(map[x-1][y]);
          }
          if(y == gameMap.height){
            adjacentCells.push(map[x][y-1]);
          }
          adjacentCells.forEach(adjCell => {if(Number.isInteger(adjCell)){current += adjCell}});
        }
        else{
          adjacentCells = [(current[x+1][y]), (current[x][y+1]), (current[x-1][y]), (current[x][y-1])];
          adjacentCells.forEach(adjCell => {if(Number.isInteger(adjCell)){current += adjCell}});
        }
        this.map[y][x] = current;
      }
    }
   
  }

}
module.exports = HeatMap;
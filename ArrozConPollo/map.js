class HeatMap {
    constructor(){
    }
    update(gameState) {
        this.gameState = gameState;
        this.player = gameState.players[gameState.id];
        this.enemy = gameState.players[(gameState.id + 1) % 2];
        this.ValueTile = [];
        this.currentWorkersPos = [];
        this.map = [];
        initializeMap();

    }


    /*
          gameMap.getCellByPos(unit.pos).hasResource();
    */


    initializeMap(gameMap) {
      this.map = [];
      for (let y = 0; y < gameMap.height; y++) {
        for (let x = 0; x < gameMap.width; x++) {
          const cell = gameMap.getCell(x, y);
          map[y][x] = this.checkTile(cell);     
        }
      }
      return this.map
    }
    checkTile(cell){
      let typeofTile;
      if(cell.hasResource()){
  
        if(cell.resource.type === GAME_CONSTANTS.RESOURCE_TYPES.WOOD){
          typeofTile = '1';
        }
        else if(cell.resource.type === GAME_CONSTANTS.RESOURCE_TYPES.COAL){
          typeofTile = 'C';
        }
        else if(cell.resource.type === GAME_CONSTANTS.RESOURCE_TYPES.URANIUM){
          typeofTile = 'U';
        }
      }
      else if(cell == null) {
        typeofTile = 'N';
      }
      return typeofTile;
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

          if(x == 0 || y== 0 || y == gameMap.height || x == gameMap.width ){
            if(x == 0)
              adjacentCells.push(map[x+1][y]);
            if(y == 0)
              adjacentCells.push(map[x][y+1]);
            if(x == gameMap.width)
              adjacentCells.push(map[x-1][y]);
            if(y == gameMap.height)
              adjacentCells.push(map[x][y-1]);

            adjacentCells.forEach(adjCell => {if(adjCell === map[x][y]){current++} });
          }
          else{
            adjacentCells = [map[x+1][y], map[x][y+1], map[x-1][y], map[x][y-1]];
            adjacentCells.forEach(adjCell => {if(adjCell === map[x][y]){current++} });
          }

          map[x][y] = current;
          if(map[x][y] = 5 || 4){
            x.push(this.ValueTile);
          }
        }
      }
     }
}
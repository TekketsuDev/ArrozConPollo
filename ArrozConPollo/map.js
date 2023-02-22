
class HeatMap {
    constructor(height, width){
        this.height = height;
        this.width = width;    
    }
    update(gameState) {
        this.gameState = gameState;
        this.player = gameState.players[gameState.id];
        this.enemy = gameState.players[(gameState.id + 1) % 2];
        this.ValueTile = [];
        this.currentWorkersPos = [];
        initializeMap();

    }


    /*
          gameMap.getCellByPos(unit.pos).hasResource();
    */


    initializeMap(gameMap) {
      let map = [];
      for (let y = 0; y < gameMap.height; y++) {
        for (let x = 0; x < gameMap.width; x++) {
          const cell = gameMap.getCell(x, y);
          map[y][x] = this.checkTile(cell);     
        }
      }
    }
    checkTile(cell){
      let typeofTile;
      if(cell.hasResource()){
  
        if(cell.resource.type === GAME_CONSTANTS.RESOURCE_TYPES.WOOD){
          typeofTile = 'W';
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
    mostEfficientTile(){
        //TOP-LEFT remove adjacent [x-1, y], [x, y-1]
        //TOP-RIGHT remove adjacent [x+1, y] [x, y-1]
        //BOTTOM-LEFT remove adjacent [x, y+1] [x-1, y]
        //BOTTOM-RIGHT remove adjacent [x+1, y], [x, y+1]
        for (let y = 0; y < gameMap.height; y++) {
          for (let x = 0; x < gameMap.width; x++) {
            const adjacentCell = [[x+1, y], [x, y+1], [x-1, y], [x, y-1]];
            map[y][x] = ;     
          }
        }
/*           let adjacentCell = 
          if (x == 0) // dont check [x-1, y]
          switch (true) {
            case (x == 0 && y== 0):
              
              break;
            case (x ==):
              
            break;

            case (value):
              
            break;

            case (value):
              
            break;
          
            default:
              break;
          }
          resourceTiles.push(cell);
          */
    }
} 
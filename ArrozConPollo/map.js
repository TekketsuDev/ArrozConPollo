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
        
    }

    initializeMap() {
        map = new HashMap();
        for (let y = 0; y < gameMap.height; y++) {
            for (let x = 0; x < gameMap.width; x++) {
              const cell = gameMap.getCell(x, y);
              
                resourceTiles.push(cell);
              }
            }
          }
        for(){
            cell.resource.type === GAME_CONSTANTS.RESOURCE_TYPES.COAL
            gameMap.getCellByPos(unit.pos).hasResource();
        }
    }


}
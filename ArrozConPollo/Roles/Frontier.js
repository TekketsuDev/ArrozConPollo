class Frontier extends WorkerRole{
    constructor(UnitAssigned, CityAssigned){
        this.unit = UnitAssigned;
        this.city = CityAssigned;
    }
    super(){
    }
    act(unit){
      if ( unit.isWorker() && unit.canAct()) {
        if (unit.getCargoSpaceLeft() > 0) {
          // if the unit is a worker and we have space in cargo, lets find the nearest resource tile and try to mine it
          let closestResourceTile = null;
          let closestDist = 9999999;
          resourceTiles.forEach((cell) => {
            if (cell.resource.type === GAME_CONSTANTS.RESOURCE_TYPES.COAL && !player.researchedCoal()) return;
            if (cell.resource.type === GAME_CONSTANTS.RESOURCE_TYPES.URANIUM && !player.researchedUranium()) return;
            const dist = cell.pos.distanceTo(unit.pos);
            if (dist < closestDist) {
              closestDist = dist;
              closestResourceTile = cell;
            }
          })
        }
      }
    }
}
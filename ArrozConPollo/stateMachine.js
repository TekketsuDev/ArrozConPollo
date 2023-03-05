class StateMachine {
    
    
    update(){
        this.actions = new Array();
        this.player = gameState.players[gameState.id];
        this.opponent = gameState.players[(gameState.id + 1) % 2];
        this.gameMap = gameState.map;
        this.cities = this.player.cities;

        //this.resourceTiles = helpers.getResourceTiles(this.gameMap); //CHANGE TO HASHMAP
        //this.freeTiles = helpers.getFreeTiles(this.gameMap);         //CHANGE TO HASHMAP
        this.refresh();
        this.workersRole();
        this.workersDecision();
        this.citiesRole();
        return this.actions;
    }

    refresh(

    )
    
    

}



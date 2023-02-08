"use strict";

const Agent_Bot = require("./lux/Agent");

const agent = new Agent_Bot.Agent();

agent.run((gameState) => {
    const player = gameState.players[gameState.id];
    const opponent = gameState.players[(gameState.id + 1) % 2];
    const gameMap = gameState.map;

    let actions  = new Array();
    for (let i = 0; i < player.units.length; i++) {
        let unit = player.units[i];
        
        const dir = unit.pos.directionTo(closestResourceTile.pos)
        actions = actions.push(unit.move("n"));
    }

    player.cities.forEach((city, cityID) => {
        actions = actions.push();
        
    });
    return actions;
});


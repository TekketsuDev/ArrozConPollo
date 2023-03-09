"use strict";
class Astar {
  constructor(gameState){
    this.gameState = gameState;
    this.gameMap = gameState.map;
    this.player = gameState.players[gameState.id];
    this.enemy = gameState.players[(gameState.id + 1) % 2];
    this.openSet = []; //array containing unevaluated grid points
    this.closedSet = []; //array containing completely evaluated grid points
    this.start; //starting grid point
    this.end; // ending grid point (goal)
    this.path = [];
  }
  getArrayPath(){
  
  return
  }
    //heuristic we will be using - Manhattan distance
  //for other heuristics visit - https://theory.stanford.edu/~amitp/GameProgramming/Heuristics.html
  heuristic(position0, position1) {
    let d1 = Math.abs(position1.x - position0.x);
    let d2 = Math.abs(position1.y - position0.y);

    return d1 + d2;
  }
  
  //constructor function to create all the grid points as objects containind the data for the points
   GridPoint(x, y) {
    this.x = x; //x location of the grid point
    this.y = y; //y location of the grid point
    this.f = 0; //total cost function
    this.g = 0; //cost function from start to the current grid point
    this.h = 0; //heuristic estimated cost function from current grid point to the goal
    this.neighbors = []; // neighbors of the current grid point
    this.parent = undefined; // immediate source of the current grid point
  
    // update neighbors array for a given grid point
    this.updateNeighbors = function (gameMap) {
      let i = this.x;
      let j = this.y;
      if (i < gameMap.height - 1) {
        this.neighbors.push(gameMap[i + 1][j]);
      }
      if (i > 0) {
        this.neighbors.push(gameMap[i - 1][j]);
      }
      if (j < gameMap.width - 1) {
        this.neighbors.push(gameMap[i][j + 1]);
      }
      if (j > 0) {
        this.neighbors.push(gameMap[i][j - 1]);
      }
    };
  }
  
  //initializing the grid
  init(gameMap) {
    //making a 2D array

    for (let i = 0; i < gameMap.height; i++) {
      for (let j = 0; j < gameMap.width; j++) {
        gameMap[i][j] = new GridPoint(i, j);
      }
    }
  
    for (let i = 0; i < gameMap.height; i++) {
      for (let j = 0; j < gameMap.width; j++) {
        gameMap[i][j].updateNeighbors(gameMap);
      }
    }
  
    this.start = gameMap[0][0];
    this.end = gameMap[gameMap.height - 1][gameMap.width - 1];
  
    this.openSet.push(start);
  
    console.log(gameMap);
  }
  
  //A star search implementation
  
  search(){
    init();
    while (openSet.length > 0) {
      //assumption lowest index is the first one to begin with
      let lowestIndex = 0;
      for (let i = 0; i < openSet.length; i++) {
        if (openSet[i].f < openSet[lowestIndex].f) {
          lowestIndex = i;
        }
      }
      let current = openSet[lowestIndex];
  
      if (current === end) {
        let temp = current;
        path.push(temp);
        while (temp.parent) {
          path.push(temp.parent);
          temp = temp.parent;
        }
        console.log("DONE!");
        // return the traced path
        return path.reverse();
      }
  
      //remove current from openSet
      openSet.splice(lowestIndex, 1);
      //add current to closedSet
      closedSet.push(current);
  
      let neighbors = current.neighbors;
  
      for (let i = 0; i < neighbors.length; i++) {
        let neighbor = neighbors[i];
  
        if (!closedSet.includes(neighbor)) {
          let possibleG = current.g + 1;
  
          if (!openSet.includes(neighbor)) {
            openSet.push(neighbor);
          } else if (possibleG >= neighbor.g) {
            continue;
          }
  
          neighbor.g = possibleG;
          neighbor.h = heuristic(neighbor, end);
          neighbor.f = neighbor.g + neighbor.h;
          neighbor.parent = current;
        }
      }
    }
  
    //no solution by default
    return undefined;
  }
  
  
}
module.exports = Astar;
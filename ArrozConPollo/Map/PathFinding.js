"use strict";
const HeatMap = require("./HeatMap");

class PathFinding extends HeatMap{
  static GetInstance() {
    if (this.instance)
        return this.instance;
    this.instance = new PathFinding();
    return this.instance;
  }
  constructor(gameState, startingCell ,destinationCell){
      this.gameState = gameState;
      this.gameMap = gameState.map;
      this.untrackedCells = []; //array containing unevaluated grid points
      this.trackedCells = []; //array containing completely evaluated grid points
      this.start = startingCell; //starting grid point
      this.end = destinationCell; // ending grid point (goal)
      this.path = [];
  }
  heuristic(position0, position1) {
    let d1 = Math.abs(position1.x - position0.x);
    let d2 = Math.abs(position1.y - position0.y);

    return d1 + d2;
  }
    
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
        if (i < gameMap.height - 1 && gameMap[i + 1][j] == 'canWalk') {
        this.neighbors.push(gameMap[i + 1][j]);
        }
        if (i > 0 && gameMap[i - 1][j] == 'canWalk') {
        this.neighbors.push(gameMap[i - 1][j]);
        }
        if (j < gameMap.width - 1 && gameMap[i][j + 1] == 'canWalk') {
        this.neighbors.push(gameMap[i][j + 1]);
        }
        if (j > 0 && gameMap[i][j - 1] == 'canWalk') {
        this.neighbors.push(gameMap[i][j - 1]);
        }
    };
    }

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
    
    this.untrackedCells.push(start);
  }

  search(){
    init(gameMap);
    while (untrackedCells.length > 0) {
      //assumption lowest index is the first one to begin with
      let lowestIndex = 0;
      for (let i = 0; i < untrackedCells.length; i++) {
        if (untrackedCells[i].f < untrackedCells[lowestIndex].f) {
          lowestIndex = i;
        }
      }
      let current = untrackedCells[lowestIndex];
  
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
  
      //remove current from untrackedCells
      untrackedCells.splice(lowestIndex, 1);
      //add current to trackedCells
      trackedCells.push(current);
  
      let neighbors = current.neighbors;
  
      for (let i = 0; i < neighbors.length; i++) {
        let neighbor = neighbors[i];
  
        if (!trackedCells.includes(neighbor)) {
          let possibleG = current.g + 1;
          
          if (!untrackedCells.includes(neighbor)) {
            untrackedCells.push(neighbor);
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
module.exports = PathFinding;
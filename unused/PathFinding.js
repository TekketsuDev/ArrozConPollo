"use strict";
class PathFinding
{
	constructor(i,j)
	{
		this.i=i;
		this.j=j;
	}

	findPath(gameMap, pathX, pathY, DesiredCell){
	// 1) Create BFS queue q
		let queue = [];
    // 2) Push Starting Cell
	for (let i = 0; i < gameMap.height; ++i) {
		for (let j = 0; j < gameMap.width; ++j) {

			// if there exists a cell in the matrix such
			// that its value is 1 then push it to q
			if (gameMap[i][j] == 'Ud1') {
				queue.push(new PathFinding(i, j));
				console.log('Starting Cell: ' + i + ' ' + j)
				break;
			}
		}
	}
	// 3) run BFS algorithm with q.
		while (queue.length != 0)
		{
			let x = queue.shift();
			
			let i = x.i;
			let j = x.j;
			
			// skipping cells which are not valid.
			// if outside the matrix bounds
			if (i < 0 || i >= gameMap.height || j < 0 || j >= gameMap.width)
				continue;
			
			// if they are walls (value is 0).
			if (gameMap[i][j] == 0)
				continue;
	
			// 3.1) if in the BFS algorithm process there was a
			// vertex x=(i,j) such that M[i][j] is 2 stop and
			// return true
			if (gameMap[i][j] == DesiredCell){
				console.log(queue);
				return true;
			}
			
			// marking as wall upon successful visitation
			gameMap[i][j] = 0;
	
			// pushing to queue u=(i,j+1),u=(i,j-1)
			// u=(i+1,j),u=(i-1,j)
			for (let k = -1; k <= 1; k += 2)
			{
				queue.push(new PathFinding(i + k, j));
				queue.push(new PathFinding(i, j + k));
			}
			
		}
			
		// BFS algorithm terminated without returning true
		// then there was no element gameMap[i][j] which is 2, then
		// return false
			return false;
	}
}

// Main Driver code
let gameMap= 
[[ 0, 3, 0, 'Ud1'],
[ 3, 0, 3, 3 ],
[3,]
[ 'Fuel', 3, 3, 3 ],
[ 0, 3, 3, 3 ]];
gameMap.height = 4;
gameMap.width = 4;

if(findPath(gameMap,0, 3,'Fuel') == true)
	console.log(gameMap);
else
	console.log("No");

module.exports = PathFinding;
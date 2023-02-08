

function BFS(grid, vis, row, col)
{
    // Stores indices of the matrix cells
    var q = [];
 
    // Mark the starting cell as visited
    // and push it into the queue
    q.push([row, col ]);
    vis[row][col] = true;
 
    // Iterate while the queue
    // is not empty
    while (q.length!=0) {
 
        var cell = q[0];
        var x = cell[0];
        var y = cell[1];
 
        document.write( grid[x][y] + " ");
 
        q.shift();
 
        // Go to the adjacent cells
        for (var i = 0; i < 4; i++) {
 
            var adjx = x + dRow[i];
            var adjy = y + dCol[i];
 
            if (isValid(vis, adjx, adjy)) {
                q.push([adjx, adjy ]);
                vis[adjx][adjy] = true;
            }
        }
    }
}
 
// Driver Code
// Given input matrix
var grid = [[1, 2, 3, 4 ],
                       [5, 6, 7, 8 ],
                       [9, 10, 11, 12 ],
                       [13, 14, 15, 16 ] ];
// Declare the visited array
var vis = Array.from(Array(ROW), ()=> Array(COL).fill(false));
BFS(grid, vis, 0, 0);
 
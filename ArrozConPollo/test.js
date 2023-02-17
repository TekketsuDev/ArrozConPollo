let map = [];
for (let y = 0; y < 5; y++) {
  map[y] = [];
  for (let x = 0; x < 9; x++) {
    const cell = gameMap.getCell(x, y);
    map[y][x] = null
     
    }
  }
  console.log(map);
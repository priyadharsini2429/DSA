//https://www.codingninjas.com/codestudio/problems/maze-obstacles_977241

// DP - Approach 1 - Recursive Approach with Memoization(top to bottom)
function mazeObstacles(row, col, arr) {
  const fn = (i, j, dpArray) => {
    if (i === 0 && j === 0) return 1;
    if (i < 0 || j < 0 || arr[i][j] === -1) return 0;
    if (dpArray[i][j] !== -1) return dpArray[i][j];

    const up = fn(i - 1, j, dpArray);
    const down = fn(i, j - 1, dpArray);

    return (dpArray[i][j] = up + down);
  };

  return fn(
    row - 1,
    col - 1,
    Array.from(Array(row), () => new Array(col).fill(-1))
  );
}

// DP - Approach 2 - Tabulation Approach (bottom to top) with Space Optimisation
function mazeObstacles(row, col, arr) {
  let prev = new Array(row).fill(0);

  for (i = 0; i < row; i++) {
    let temp = new Array(col).fill(-1);
    for (j = 0; j < col; j++) {
      if (i === 0 && j === 0) {
        temp[j] = 1;
        continue;
      }

      if (i > 0 && j > 0 && arr[i][j] === -1) {
        temp[j] = 0;
        continue;
      }

      let up = 0;
      if (i > 0) up = prev[j];
      let down = 0;
      if (j > 0) down = temp[j - 1];

      temp[j] = up + down;
    }
    prev = temp;
  }

  return prev[col - 1];
}

const rowSize = 3;
const colSize = 3;
const arr = [
  [0, 0, 0],
  [0, -1, 0],
  [0, 0, 0],
];
const output = mazeObstacles(rowSize, colSize, arr);
console.log(output);

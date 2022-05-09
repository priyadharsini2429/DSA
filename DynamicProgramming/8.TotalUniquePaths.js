//https://www.codingninjas.com/codestudio/problems/total-unique-paths_1081470

// DP - Approach 1 - Recursive Approach with Memoization(top to bottom)
function uniquePaths(row, col) {
  const fn = (i, j, dpArray) => {
    if (i === 0 && j === 0) return 1;
    if (i < 0 || j < 0) return 0;

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
function uniquePaths(row, col) {
  let prev = new Array(row).fill(0);

  for (i = 0; i < row; i++) {
    let temp = new Array(row).fill(0);
    for (j = 0; j < col; j++) {
      if (i == 0 && j == 0) {
        temp[j] = 1;
      } else {
        let up = 0;
        let down = 0;
        if (i - 1 >= 0) up = prev[i - 1];
        if (j - 1 >= 0) down = temp[j - 1];
        temp[j] = up + down;
      }
    }
    prev = temp;
  }
  return prev[col - 1];
}

const rowSize = 2;
const colSize = 3;
const output = uniquePaths(rowSize, colSize);
console.log(output);

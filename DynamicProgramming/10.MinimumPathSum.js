//https://www.codingninjas.com/codestudio/problems/minimum-path-sum_985349

// DP - Approach 1 - Recursive Approach with Memoization(top to bottom)
function minSumPath(row, col, arr) {
  const fn = (i, j, dpArray) => {
    if (i === 0 && j === 0) return arr[i][j];
    if (i < 0 || j < 0) return Infinity;
    if (dpArray[i][j] !== -1) return dpArray[i][j];

    const up = arr[i][j] + fn(i - 1, j, dpArray);
    const left = arr[i][j] + fn(i, j - 1, dpArray);

    return (dpArray[i][j] = Math.min(up, left));
  };

  return fn(
    row - 1,
    col - 1,
    Array.from(Array(row), () => new Array(col).fill(-1))
  );
}

// DP - Approach 2 - Tabulation Approach (bottom to top) without Space Optimisation
function minSumPath(row, col, arr) {
  const dpArray = Array.from(Array(row), () => new Array(col).fill(0));

  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (i === 0 && j === 0) {
        dpArray[i][j] = arr[i][j];
        continue;
      }

      let down = arr[i][j];
      if (i - 1 >= 0) down += dpArray[i - 1][j];
      else down += Infinity;

      let right = arr[i][j];
      if (j - 1 >= 0) right += dpArray[i][j - 1];
      else right += Infinity;

      dpArray[i][j] = Math.min(down, right);
    }
  }

  return dpArray[row - 1][col - 1];
}

// DP - Approach 3 - Tabulation Approach (bottom to top) with Space Optimisation
function minSumPath(row, col, arr) {
  let prev = new Array(col).fill(0);

  for (let i = 0; i < row; i++) {
    let temp = new Array(col).fill(0);

    for (let j = 0; j < col; j++) {
      if (i === 0 && j === 0) {
        temp[j] = arr[i][j];
        continue;
      }

      let down = arr[i][j];
      if (i - 1 >= 0) down += prev[j];
      else down += Infinity;

      let right = arr[i][j];
      if (j - 1 >= 0) right += temp[j - 1];
      else right += Infinity;

      temp[j] = Math.min(down, right);
    }
    prev = temp;
  }

  return prev[col - 1];
}

const arr = [
  [5, 9, 6],
  [11, 5, 2],
];
const arr2 = [
  [1, 2, 3],
  [4, 5, 4],
  [7, 5, 9],
];
const rowSize = arr.length;
const colSize = arr[0].length;
const output = minSumPath(rowSize, colSize, arr);
console.log(output);

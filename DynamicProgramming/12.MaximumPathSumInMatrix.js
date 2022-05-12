//https://www.codingninjas.com/codestudio/problems/maximum-path-sum-in-the-matrix_797998

// DP - Approach 1 - Recursive Approach with Memoization(top to bottom)
function maximumPathSumInMatrix(arr) {
  const rowSize = arr.length;
  const colSize = arr[rowSize - 1].length;

  const fn = (i, j, dpArray) => {
    if (j < 0 || j >= colSize) return -Infinity;
    if (i === 0) return arr[i][j];
    if (dpArray[i][j] !== -1) return dpArray[i][j];

    const up = arr[i][j] + fn(i - 1, j, dpArray);
    const leftDiagonal = arr[i][j] + fn(i - 1, j - 1, dpArray);
    const rightDiagonal = arr[i][j] + fn(i - 1, j + 1, dpArray);

    return (dpArray[i][j] = Math.max(up, leftDiagonal, rightDiagonal));
  };

  let maximumPathSum = -Infinity;
  for (let idx = 0; idx < colSize; idx++) {
    maximumPathSum = Math.max(
      maximumPathSum,
      fn(
        rowSize - 1,
        idx,
        Array.from(Array(rowSize), () => new Array(colSize).fill(-1))
      )
    );
  }

  return maximumPathSum;
}

// DP - Approach 2 - Tabulation Approach (bottom to top) without Space Optimisation
function maximumPathSumInMatrix(arr) {
  const rowSize = arr.length;
  const colSize = arr[rowSize - 1].length;

  let dpArray = Array.from(Array(rowSize), () => new Array(colSize).fill(-1));

  for (let idx = 0; idx < colSize; idx++) {
    dpArray[0][idx] = arr[0][idx];
  }

  for (let i = 1; i < rowSize; i++) {
    for (let j = 0; j < colSize; j++) {
      const down = arr[i][j] + dpArray[i - 1][j];
      let leftDiagonal = arr[i][j];
      leftDiagonal += j - 1 >= 0 ? dpArray[i - 1][j - 1] : -Infinity;

      let rightDiagonal = arr[i][j];
      rightDiagonal += j + 1 < colSize ? dpArray[i - 1][j + 1] : -Infinity;

      dpArray[i][j] = Math.max(down, leftDiagonal, rightDiagonal);
    }
  }

  let maximumPathSum = -Infinity;
  for (let idx = 0; idx < colSize; idx++) {
    maximumPathSum = Math.max(maximumPathSum, dpArray[rowSize - 1][idx]);
  }

  return maximumPathSum;
}

// DP - Approach 3 - Tabulation Approach (bottom to top) with Space Optimisation
function maximumPathSumInMatrix(arr) {
  const rowSize = arr.length;
  const colSize = arr[rowSize - 1].length;

  let prev = new Array(colSize).fill(-1);

  for (let idx = 0; idx < colSize; idx++) {
    prev[idx] = arr[0][idx];
  }

  for (let i = 1; i < rowSize; i++) {
    let curr = new Array(colSize).fill(-1);

    for (let j = 0; j < colSize; j++) {
      const down = arr[i][j] + prev[j];
      let leftDiagonal = arr[i][j];
      leftDiagonal += j - 1 >= 0 ? prev[j - 1] : -Infinity;

      let rightDiagonal = arr[i][j];
      rightDiagonal += j + 1 < colSize ? prev[j + 1] : -Infinity;

      curr[j] = Math.max(down, leftDiagonal, rightDiagonal);
    }
    prev = curr;
  }

  let maximumPathSum = -Infinity;
  for (let idx = 0; idx < colSize; idx++) {
    maximumPathSum = Math.max(maximumPathSum, prev[idx]);
  }

  return maximumPathSum;
}

const arr = [
  [1, 2, 10, 4],
  [100, 3, 2, 1],
  [1, 1, 20, 2],
  [1, 2, 2, 1],
];
const arr2 = [
  [10, 2, 3],
  [3, 7, 2],
  [8, 1, 5],
];

const output = maximumPathSumInMatrix(arr);
console.log(output);

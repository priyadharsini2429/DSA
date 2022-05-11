//https://www.codingninjas.com/codestudio/problems/triangle_1229398

// 1
// 2 3
// 3 6 7
// 8 9 6 10

// DP - Approach 1 - Recursive Approach with Memoization(top to bottom)
function minPathSum(arr, row) {
  const fn = (i, j, dpArray) => {
    if (i === row - 1) return arr[i][j];
    if (dpArray[i][j] !== -1) dpArray[i][j];

    const down = arr[i][j] + fn(i + 1, j, dpArray);
    const diagonal = arr[i][j] + fn(i + 1, j + 1, dpArray);

    return (dpArray[i][j] = Math.min(down, diagonal));
  };

  return fn(
    0,
    0,
    Array.from(Array(row), (_, i) => new Array(i + 1).fill(-1))
  );
}

// DP - Approach 2 - Tabulation Approach (bottom to top) without Space Optimisation
function minPathSum(arr, row) {
  let dpArray = Array.from(Array(row), (_, i) => new Array(i + 1).fill(-1));

  for (let j = 0; j <= row; j++) {
    dpArray[row - 1][j] = arr[row - 1][j];
  }

  for (let i = row - 2; i >= 0; i--) {
    for (let j = i; j >= 0; j--) {
      const down = arr[i][j] + dpArray[i + 1][j];
      const diagonal = arr[i][j] + dpArray[i + 1][j + 1];
      dpArray[i][j] = Math.min(down, diagonal);
    }
  }
  return dpArray[0][0];
}

// DP - Approach 3 - Tabulation Approach (bottom to top) with Space Optimisation
function minPathSum(arr, row) {
  let front = new Array(row).fill(-1);

  for (let j = 0; j <= row; j++) {
    front[j] = arr[row - 1][j];
  }

  for (let i = row - 2; i >= 0; i--) {
    let curr = new Array(i).fill(-1);
    for (let j = i; j >= 0; j--) {
      const down = arr[i][j] + front[j];
      const diagonal = arr[i][j] + front[j + 1];
      curr[j] = Math.min(down, diagonal);
    }
    front = curr;
  }
  return front[0];
}

const arr = [[1], [2, 3], [3, 6, 7], [8, 9, 6, 10]];
const arr2 = [[2], [3, 4], [6, 5, 7], [4, 1, 8, 3]];
const rowSize = arr.length;
const output = minPathSum(arr, rowSize);
console.log(output);

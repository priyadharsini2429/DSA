//https://www.codingninjas.com/codestudio/problems/ninja-and-his-friends_3125885

// DP - Approach 1 - Recursive Approach with Memoization(top to bottom)
function maximumChocolates(row, col, arr) {
  const fn = (i, j1, j2, dpArray) => {
    if (j1 < 0 || j1 >= col || j2 < 0 || j2 >= col) return -Infinity;
    if (i === row - 1) {
      if (j1 === j2) return arr[i][j1];
      else return arr[i][j1] + arr[i][j2];
    }
    if (dpArray[i][j1][j2] !== -1) return dpArray[i][j1][j2];

    let maximumChocolate = -Infinity;
    for (let a = -1; a <= 1; a++) {
      for (let b = -1; b <= 1; b++) {
        if (j1 === j2) {
          maximumChocolate = Math.max(
            maximumChocolate,
            arr[i][j1] + fn(i + 1, j1 + a, j2 + b, dpArray)
          );
        } else {
          maximumChocolate = Math.max(
            maximumChocolate,
            arr[i][j1] + arr[i][j2] + fn(i + 1, j1 + a, j2 + b, dpArray)
          );
        }
      }
    }
    return (dpArray[i][j1][j2] = maximumChocolate);
  };

  return fn(
    0,
    0,
    col - 1,
    Array.from(new Array(3), () =>
      Array.from(new Array(4), () => new Array(4).fill(-1))
    )
  );
}

// DP - Approach 2 - Tabulation Approach (bottom to top) without Space Optimisation
function maximumChocolates(row, col, arr) {
  let dpArray = Array.from(new Array(3), () =>
    Array.from(new Array(4), () => new Array(4).fill(-1))
  );

  for (let j1 = 0; j1 < col; j1++) {
    for (let j2 = 0; j2 < col; j2++) {
      dpArray[row - 1][j1][j2] =
        j1 === j2 ? arr[row - 1][j1] : arr[row - 1][j2] + arr[row - 1][j1];
    }
  }

  for (let i = row - 2; i >= 0; i--) {
    for (let j1 = 0; j1 < col; j1++) {
      for (let j2 = 0; j2 < col; j2++) {
        let maximumChocolate = -Infinity;
        for (let a = -1; a <= 1; a++) {
          for (let b = -1; b <= 1; b++) {
            let ans = j1 === j2 ? arr[i][j1] : arr[i][j1] + arr[i][j2];
            ans +=
              j1 + a < 0 || j1 + a >= col || j2 + b < 0 || j2 + b >= col
                ? -Infinity
                : dpArray[i + 1][j1 + a][j2 + b];

            maximumChocolate = Math.max(maximumChocolate, ans);
          }
        }
        dpArray[i][j1][j2] = maximumChocolate;
      }
    }
  }
  return dpArray[0][0][col - 1];
}

// DP - Approach 3 - Tabulation Approach (bottom to top) with Space Optimisation
function maximumChocolates(row, col, arr) {
  let front = Array.from(new Array(4), () => new Array(4).fill(-1));

  for (let j1 = 0; j1 < col; j1++) {
    for (let j2 = 0; j2 < col; j2++) {
      front[j1][j2] =
        j1 === j2 ? arr[row - 1][j1] : arr[row - 1][j2] + arr[row - 1][j1];
    }
  }

  for (let i = row - 2; i >= 0; i--) {
    let curr = Array.from(new Array(4), () => new Array(4).fill(-1));
    for (let j1 = 0; j1 < col; j1++) {
      for (let j2 = 0; j2 < col; j2++) {
        let maximumChocolate = -Infinity;
        for (let a = -1; a <= 1; a++) {
          for (let b = -1; b <= 1; b++) {
            let ans = j1 === j2 ? arr[i][j1] : arr[i][j1] + arr[i][j2];
            ans +=
              j1 + a < 0 || j1 + a >= col || j2 + b < 0 || j2 + b >= col
                ? -Infinity
                : front[j1 + a][j2 + b];

            maximumChocolate = Math.max(maximumChocolate, ans);
          }
        }
        curr[j1][j2] = maximumChocolate;
      }
    }
    front = curr;
  }
  return front[0][col - 1];
}

const arr = [
  [2, 3, 1, 2],
  [3, 4, 2, 2],
  [5, 6, 3, 5],
];

const rowSize = 3;
const colSize = 4;

const output = maximumChocolates(rowSize, colSize, arr);
console.log(output);

//https://www.codingninjas.com/codestudio/problems/number-of-subsets_3952532

// DP - Approach 1 - Recursive Approach with Memoization(top to bottom)
function findWays(arr, n, k) {
  const fn = (idx, target, dpArray) => {
    if (target === 0) return 1;
    if (idx === 0) {
      return arr[0] === target ? 1 : 0;
    }

    if (dpArray[idx][target] !== -1) return dpArray[idx][target];

    const notPick = fn(idx - 1, target, dpArray);
    const pick =
      arr[idx] <= target ? fn(idx - 1, target - arr[idx], dpArray) : 0;

    return (dpArray[idx][target] = notPick + pick);
  };

  return fn(
    n - 1,
    k,
    Array.from(Array(n), () => new Array(k + 1).fill(-1))
  );
}

// DP - Approach 2 - Tabulation Approach (bottom to top) without Space Optimisation
function findWays(arr, n, k) {
  const dpArray = Array.from(Array(n), () => new Array(k + 1).fill(0));

  for (let i = 0; i < n; i++) {
    dpArray[i][0] = 1;
  }

  if (arr[0] <= k) dpArray[0][arr[0]] = 1;

  for (let idx = 1; idx < n; idx++) {
    for (let target = 1; target <= k; target++) {
      const notPick = dpArray[idx - 1][target];
      const pick = arr[idx] <= target ? dpArray[idx - 1][target - arr[idx]] : 0;

      dpArray[idx][target] = notPick + pick;
    }
  }
  return dpArray[n - 1][k];
}

// DP - Approach 3 - Tabulation Approach (bottom to top) with Space Optimisation
function findWays(arr, n, k) {
  let prev = new Array(k + 1).fill(0);
  prev[0] = 1;

  if (arr[0] <= k) prev[arr[0]] = 1;

  for (let idx = 1; idx < n; idx++) {
    let curr = new Array(k + 1).fill(0);
    curr[0] = 1;
    for (let target = 1; target <= k; target++) {
      const notPick = prev[target];
      const pick = arr[idx] <= target ? prev[target - arr[idx]] : 0;

      curr[target] = notPick + pick;
    }
    prev = curr;
  }
  return prev[k];
}

const arr = [1, 2, 2, 3];
const arrSize = arr.length;
const output = findWays(arr, arrSize, 3);
console.log(output);

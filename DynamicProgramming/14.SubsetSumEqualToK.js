//https://www.codingninjas.com/codestudio/problems/subset-sum-equal-to-k_1550954

// DP - Approach 1 - Recursive Approach with Memoization(top to bottom)
function SubsetSumEqualToK(arr, n, k) {
  const fn = (idx, target, dpArray) => {
    if (target === 0) return true;
    if (idx === 0) return arr[idx] === target;
    if (dpArray[idx][target] !== -1) return dpArray[idx][target];

    let pick = false;
    if (arr[idx] <= target) pick = fn(idx - 1, target - arr[idx], dpArray);
    const notPick = fn(idx - 1, target, dpArray);

    return (dpArray[idx][target] = pick || notPick);
  };

  return fn(
    n - 1,
    k,
    Array.from(new Array(n), () => new Array(k + 1).fill(-1))
  );
}

// DP - Approach 2 - Tabulation Approach (bottom to top) without Space Optimisation
function SubsetSumEqualToK(arr, n, k) {
  const dpArray = Array.from(new Array(n), () => new Array(k + 1).fill(false));

  for (let i = 0; i < n; i++) {
    dpArray[i][0] = true;
  }

  if (arr[0] <= k) {
    dpArray[0][arr[0]] = true;
  }

  for (let idx = 1; idx < n; idx++) {
    for (let target = 1; target <= k; target++) {
      let pick = false;
      if (arr[idx] <= target) pick = dpArray[idx - 1][target - arr[idx]];
      const notPick = dpArray[idx - 1][target];

      dpArray[idx][target] = pick || notPick;
    }
  }
  return dpArray[n - 1][k];
}

// DP - Approach 3 - Tabulation Approach (bottom to top) with Space Optimisation
function SubsetSumEqualToK(arr, n, k) {
  let prev = new Array(k + 1).fill(false);

  prev[0] = true;

  if (arr[0] <= k) {
    prev[arr[0]] = true;
  }

  for (let idx = 1; idx < n; idx++) {
    let curr = new Array(k + 1).fill(false);
    for (let target = 1; target <= k; target++) {
      let pick = false;
      if (arr[idx] <= target) pick = prev[target - arr[idx]];
      const notPick = prev[target];

      curr[target] = pick || notPick;
    }
    prev = curr;
  }
  return prev[k];
}

const arr = [4, 3, 2, 1];
const arrSize = arr.length;
const K = 0;
const output = SubsetSumEqualToK(arr, arrSize, K);
console.log(output);

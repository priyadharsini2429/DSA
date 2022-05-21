//https://www.codingninjas.com/codestudio/problems/ways-to-make-coin-change_630471

function countWaysToMakeChange(arr, n, k) {
  const fn = (idx, target, dpArray) => {
    if (idx === 0) {
      if (target % arr[idx]) return 0;
      else return 1;
    }

    if (dpArray[idx][target] !== -1) return dpArray[idx][target];

    const pick = target >= arr[idx] ? fn(idx, target - arr[idx], dpArray) : 0;
    const nonPick = fn(idx - 1, target, dpArray);

    return (dpArray[idx][target] = pick + nonPick);
  };

  return fn(
    n - 1,
    k,
    Array.from(new Array(n), () => new Array(k + 1).fill(-1))
  );
}

function countWaysToMakeChange(arr, n, k) {
  const dpArray = Array.from(new Array(n), () => new Array(k + 1).fill(0));

  for (let i = 0; i <= k; i++) {
    if (i % arr[0] === 0) dpArray[0][i] = 1;
  }

  for (let idx = 1; idx < n; idx++) {
    for (let target = 0; target <= k; target++) {
      const pick = target >= arr[idx] ? dpArray[idx][target - arr[idx]] : 0;
      const nonPick = dpArray[idx - 1][target];

      dpArray[idx][target] = pick + nonPick;
    }
  }
  return dpArray[n - 1][k];
}

function countWaysToMakeChange(arr, n, k) {
  let prev = new Array(k + 1).fill(0);

  for (let i = 0; i <= k; i++) {
    if (i % arr[0] === 0) prev[i] = 1;
  }

  for (let idx = 1; idx < n; idx++) {
    let curr = new Array(k + 1).fill(0);
    for (let target = 0; target <= k; target++) {
      const pick = target >= arr[idx] ? curr[target - arr[idx]] : 0;
      const nonPick = prev[target];

      curr[target] = pick + nonPick;
    }
    prev = curr;
  }
  return prev[k];
}

const coins = [1, 2, 3];
const arrSize = coins.length;
const target = 4;
const output = countWaysToMakeChange(coins, arrSize, target);
console.log(output);

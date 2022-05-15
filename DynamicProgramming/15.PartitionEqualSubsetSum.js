//https://www.codingninjas.com/codestudio/problems/partition-equal-subset-sum_892980

function SubsetSumEqualToK(arr, n, k) {
  const fn = (idx, target, dpArray) => {
    if (target === 0) return true;
    if (idx === 0) return arr[idx] === target;
    if (dpArray[idx][target] !== -1) return dpArray[idx][target];

    let pick = false;
    if (arr[idx] <= target) {
      pick = fn(idx - 1, target - arr[idx], dpArray);
    }
    const notPick = fn(idx - 1, target, dpArray);

    return (dpArray[idx][target] = pick || notPick);
  };

  return fn(
    n - 1,
    k,
    Array.from(new Array(n), () => new Array(k + 1).fill(-1))
  );
}

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
      if (arr[idx] <= target) {
        pick = dpArray[idx - 1][target - arr[idx]];
      }
      const notPick = dpArray[idx - 1][target];

      dpArray[idx][target] = pick || notPick;
    }
  }

  return dpArray[n - 1][k];
}

function SubsetSumEqualToK(arr, n, k) {
  let prev = new Array(k + 1).fill(false);

  prev[0] = true;

  if (arr[0] <= k) {
    prev[arr[0]] = true;
  }

  for (let idx = 1; idx < n; idx++) {
    let temp = new Array(k + 1).fill(false);
    for (let target = 1; target <= k; target++) {
      let pick = false;
      if (arr[idx] <= target) {
        pick = prev[target - arr[idx]];
      }
      const notPick = prev[target];

      temp[target] = pick || notPick;
    }
    prev = temp;
  }

  return prev[k];
}

function canPartition(arr, arrSize) {
  const TotalSum = arr.reduce((acc, cur) => acc + cur, 0);
  if (TotalSum % 2) return false;

  return SubsetSumEqualToK(arr, arrSize, TotalSum / 2);
}

const arr = [5, 6, 5, 11, 6];
const arrSize = arr.length;
const output = canPartition(arr, arrSize);
console.log(output);

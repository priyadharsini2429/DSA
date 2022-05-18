function findWays(arr, n, k) {
  const fn = (idx, target, dpArray) => {
    if (idx === 0) {
      if (arr[idx] === 0 && target === 0) return 2;
      if (target === 0 || arr[idx] === target) return 1;
      return 0;
    }
    if (dpArray[idx][target] !== -1) return dpArray[idx][target];

    const pick =
      arr[idx] <= target ? fn(idx - 1, target - arr[idx], dpArray) : 0;
    const notPick = fn(idx - 1, target, dpArray);

    return (dpArray[idx][target] = pick + notPick);
  };

  return fn(
    n - 1,
    k,
    Array.from(Array(n), () => new Array(k + 1).fill(-1))
  );
}

function findWays(arr, n, k) {
  let dpArray = Array.from(Array(n), () => new Array(k + 1).fill(0));
  if (arr[0] === 0) dpArray[0][0] = 2;
  else dpArray[0][0] = 1;

  if (arr[0] !== 0 && arr[0] <= k) dpArray[0][arr[0]] = 1;

  for (let idx = 1; idx < n; idx++) {
    for (let target = 0; target <= k; target++) {
      const pick = arr[idx] <= target ? dpArray[idx - 1][target - arr[idx]] : 0;
      const notPick = dpArray[idx - 1][target];

      dpArray[idx][target] = pick + notPick;
    }
  }

  return dpArray[n - 1][k];
}

function findWays(arr, n, k) {
  let prev = new Array(k + 1).fill(0);
  if (arr[0] === 0) prev[0] = 2;
  else prev[0] = 1;

  if (arr[0] !== 0 && arr[0] <= k) prev[arr[0]] = 1;

  for (let idx = 1; idx < n; idx++) {
    let curr = new Array(k + 1).fill(0);
    for (let target = 0; target <= k; target++) {
      const pick = arr[idx] <= target ? prev[target - arr[idx]] : 0;
      const notPick = prev[target];

      curr[target] = pick + notPick;
    }
    prev = curr;
  }

  return prev[k];
}

const arr = [0, 0, 1];
const arrSize = arr.length;
const output = findWays(arr, arrSize, 1);
console.log(output);

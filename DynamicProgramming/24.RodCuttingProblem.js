//https://www.codingninjas.com/codestudio/problems/rod-cutting-problem_800284

function cutRod(arr, n, k) {
  const fn = (idx, target, dpArray) => {
    if (idx === 0) return arr[0] * target;
    if (dpArray[idx][target] !== -1) return dpArray[idx][target];

    const pick =
      target - (idx + 1) >= 0
        ? arr[idx] + fn(idx, target - (idx + 1), dpArray)
        : -Infinity;
    const nonPick = 0 + fn(idx - 1, target, dpArray);

    return (dpArray[idx][target] = Math.max(pick, nonPick));
  };

  return fn(
    n - 1,
    k,
    Array.from(new Array(n), () => new Array(k + 1).fill(-1))
  );
}

function cutRod(arr, n, k) {
  const dpArray = Array.from(new Array(n), () => new Array(k + 1).fill(0));

  for (let target = 0; target <= k; target++) {
    dpArray[0][target] = arr[0] * target;
  }

  for (let idx = 1; idx < n; idx++) {
    for (let target = 0; target <= k; target++) {
      const pick =
        target - (idx + 1) >= 0
          ? arr[idx] + dpArray[idx][target - (idx + 1)]
          : -Infinity;
      const nonPick = 0 + dpArray[idx - 1][target];

      dpArray[idx][target] = Math.max(pick, nonPick);
    }
  }

  return dpArray[n - 1][k];
}

function cutRod(arr, n, k) {
  let prev = new Array(k + 1).fill(0);

  for (let target = 0; target <= k; target++) {
    prev[target] = arr[0] * target;
  }

  for (let idx = 1; idx < n; idx++) {
    let curr = new Array(k + 1).fill(-1);
    for (let target = 0; target <= k; target++) {
      const pick =
        target - (idx + 1) >= 0
          ? arr[idx] + curr[target - (idx + 1)]
          : -Infinity;
      const nonPick = 0 + prev[target];

      curr[target] = Math.max(pick, nonPick);
    }
    prev = curr;
  }

  return prev[k];
}

function cutRod(arr, n, k) {
  let temp = new Array(k + 1).fill(0);

  for (let target = 0; target <= k; target++) {
    temp[target] = arr[0] * target;
  }

  for (let idx = 1; idx < n; idx++) {
    for (let target = 0; target <= k; target++) {
      const pick =
        target - (idx + 1) >= 0
          ? arr[idx] + temp[target - (idx + 1)]
          : -Infinity;
      const nonPick = 0 + temp[target];

      temp[target] = Math.max(pick, nonPick);
    }
  }

  return temp[k];
}

const price = [2, 5, 7, 8, 10];
const length = 5;
const arrSize = price.length;
const output = cutRod(price, arrSize, length);
console.log(output);

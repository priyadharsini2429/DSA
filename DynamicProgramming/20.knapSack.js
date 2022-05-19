//https://www.codingninjas.com/codestudio/problems/0-1-knapsack_920542

function knapsack(weight, value, n, k) {
  const fn = (idx, target, dpArray) => {
    if (idx === 0) {
      if (weight[0] <= target) return value[0];
      else return 0;
    }

    if (dpArray[idx][target] !== -1) return dpArray[idx][target];

    const pick =
      weight[idx] <= target
        ? value[idx] + fn(idx - 1, target - weight[idx], dpArray)
        : 0;

    const notPick = 0 + fn(idx - 1, target, dpArray);

    return (dpArray[idx][target] = Math.max(pick, notPick));
  };

  return fn(
    n - 1,
    k,
    Array.from(new Array(n), () => new Array(k + 1).fill(-1))
  );
}

function knapsack(weight, value, n, k) {
  const dpArray = Array.from(new Array(n), () => new Array(k + 1).fill(0));

  for (let i = weight[0]; i <= k; i++) {
    dpArray[0][i] = value[0];
  }

  for (let idx = 1; idx < n; idx++) {
    for (let target = 0; target <= k; target++) {
      const pick =
        weight[idx] <= target
          ? value[idx] + dpArray[idx - 1][target - weight[idx]]
          : 0;

      const notPick = 0 + dpArray[idx - 1][target];

      dpArray[idx][target] = Math.max(pick, notPick);
    }
  }

  return dpArray[n - 1][k];
}

function knapsack(weight, value, n, k) {
  let prev = new Array(k + 1).fill(0);

  for (let i = weight[0]; i <= k; i++) {
    prev[i] = value[0];
  }

  for (let idx = 1; idx < n; idx++) {
    let curr = new Array(k + 1).fill(0);
    for (let target = 0; target <= k; target++) {
      const pick =
        weight[idx] <= target ? value[idx] + prev[target - weight[idx]] : 0;

      const notPick = 0 + prev[target];

      curr[target] = Math.max(pick, notPick);
    }
    prev = curr;
  }

  return prev[k];
}

//1D space Optimization
function knapsack(weight, value, n, k) {
  let prev = new Array(k + 1).fill(0);

  for (let i = weight[0]; i <= k; i++) {
    prev[i] = value[0];
  }

  for (let idx = 1; idx < n; idx++) {
    for (let target = k; target >= 0; target--) {
      const pick =
        weight[idx] <= target ? value[idx] + prev[target - weight[idx]] : 0;

      const notPick = 0 + prev[target];

      prev[target] = Math.max(pick, notPick);
    }
  }

  return prev[k];
}

const weight = [1, 2, 4, 5];
const value = [5, 4, 8, 6];
const maxWeight = 5;
const arrSize = weight.length;
const output = knapsack(weight, value, arrSize, maxWeight);
console.log(output);

//https://www.codingninjas.com/codestudio/problems/unbounded-knapsack_1215029

function unboundedKnapsack(weight, value, n, k) {
  const fn = (idx, target, dpArray) => {
    if (idx === 0) {
      if (weight[0] <= target && target % weight[0] === 0) {
        return (target / weight[0]) * value[0];
      } else {
        return 0;
      }
    }

    if (dpArray[idx][target] !== -1) return dpArray[idx][target];

    const pick =
      target >= weight[idx]
        ? value[idx] + fn(idx, target - weight[idx], dpArray)
        : 0;
    const nonPick = 0 + fn(idx - 1, target, dpArray);

    return (dpArray[idx][target] = Math.max(pick, nonPick));
  };

  return fn(
    n - 1,
    k,
    Array.from(new Array(n), () => new Array(k + 1).fill(-1))
  );
}

function unboundedKnapsack(weight, value, n, k) {
  const dpArray = Array.from(new Array(n), () => new Array(k + 1).fill(0));

  for (let target = 0; target <= k; target++) {
    if (weight[0] <= target && target % weight[0] === 0) {
      dpArray[0][target] = (target / weight[0]) * value[0];
    }
  }

  for (let idx = 1; idx < n; idx++) {
    for (let target = 0; target <= k; target++) {
      const pick =
        target >= weight[idx]
          ? value[idx] + dpArray[idx][target - weight[idx]]
          : 0;
      const nonPick = 0 + dpArray[idx - 1][target];

      dpArray[idx][target] = Math.max(pick, nonPick);
    }
  }
  return dpArray[n - 1][k];
}

function unboundedKnapsack(weight, value, n, k) {
  let prev = new Array(k + 1).fill(0);

  for (let target = 0; target <= k; target++) {
    if (weight[0] <= target && target % weight[0] === 0) {
      prev[target] = (target / weight[0]) * value[0];
    }
  }

  for (let idx = 1; idx < n; idx++) {
    let curr = new Array(k + 1).fill(0);
    for (let target = 0; target <= k; target++) {
      const pick =
        target >= weight[idx] ? value[idx] + curr[target - weight[idx]] : 0;
      const nonPick = 0 + prev[target];

      curr[target] = Math.max(pick, nonPick);
    }
    prev = curr;
  }
  return prev[k];
}

//1D optimization
function unboundedKnapsack(weight, value, n, k) {
  let temp = new Array(k + 1).fill(0);

  for (let target = 0; target <= k; target++) {
    if (weight[0] <= target && target % weight[0] === 0) {
      temp[target] = (target / weight[0]) * value[0];
    }
  }

  for (let idx = 1; idx < n; idx++) {
    for (let target = 0; target <= k; target++) {
      const pick =
        target >= weight[idx] ? value[idx] + temp[target - weight[idx]] : 0;
      const nonPick = 0 + temp[target];

      temp[target] = Math.max(pick, nonPick);
    }
  }
  return temp[k];
}

const weight = [5, 10, 20];
const value = [7, 2, 4];
const maxWeight = 15;
const arrSize = weight.length;
const output = unboundedKnapsack(weight, value, arrSize, maxWeight);
console.log(output);

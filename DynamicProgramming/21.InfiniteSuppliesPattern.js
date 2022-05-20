//https://www.codingninjas.com/codestudio/problems/minimum-elements_3843091
function minimumCoins(coins, n, k) {
  const fn = (idx, target, dpArray) => {
    if (idx === 0) {
      if (target % coins[0] === 0) return target / coins[0];
      else Infinity;
    }

    if (dpArray[idx][target] !== -1) return dpArray[idx][target];

    const pick =
      target >= coins[idx]
        ? 1 + fn(idx, target - coins[idx], dpArray)
        : Infinity;
    const nonPick = 0 + fn(idx - 1, target, dpArray);

    return (dpArray[idx][target] = Math.min(pick, nonPick));
  };

  return fn(
    n - 1,
    k,
    Array.from(new Array(n), () => new Array(k + 1).fill(-1))
  );
}

function minimumCoins(coins, n, k) {
  const dpArray = Array.from(new Array(n), () => new Array(k + 1).fill(-1));

  for (let target = 0; target <= k; target++) {
    if (target % coins[0] === 0) dpArray[0][target] = target / coins[0];
    else dpArray[0][target] = Infinity;
  }

  for (let idx = 1; idx < n; idx++) {
    for (let target = 0; target <= k; target++) {
      const pick =
        target >= coins[idx] ? 1 + dpArray[idx][target - coins[idx]] : Infinity;
      const nonPick = 0 + dpArray[idx - 1][target];

      dpArray[idx][target] = Math.min(pick, nonPick);
    }
  }
  return dpArray[n - 1][k];
}

function minimumCoins(coins, n, k) {
  let prev = new Array(k + 1).fill(-1);

  for (let target = 0; target <= k; target++) {
    if (target % coins[0] === 0) prev[target] = target / coins[0];
    else prev[target] = Infinity;
  }

  for (let idx = 1; idx < n; idx++) {
    let curr = new Array(k + 1).fill(-1);
    for (let target = 0; target <= k; target++) {
      const pick =
        target >= coins[idx] ? 1 + curr[target - coins[idx]] : Infinity;
      const nonPick = 0 + prev[target];

      curr[target] = Math.min(pick, nonPick);
    }
    prev = curr;
  }
  return prev[k];
}

const coins = [1, 2, 3];
const arrSize = coins.length;
const target = 7;
const output = minimumCoins(coins, arrSize, target);
console.log(output);

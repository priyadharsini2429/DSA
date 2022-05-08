//https://www.codingninjas.com/codestudio/problems/house-robber_839733

// DP - Approach 1 - Recursive Approach with Memoization(top to bottom)
function houseRobber(valueInHouse) {
  const fn = (idx, values, dpArray) => {
    if (idx === 0) return values[idx];
    if (dpArray[idx] !== -1) return dpArray[idx];

    let pick = values[idx];

    if (idx - 2 >= 0) {
      pick += fn(idx - 2, values, dpArray);
    }

    const nonPick = 0 + fn(idx - 1, values, dpArray);

    return (dpArray[idx] = Math.max(pick, nonPick));
  };

  const [, ...eliminatingFirst] = valueInHouse;
  const eliminatinglast = valueInHouse.slice(0, -1);

  const robbingWithoutFirstHouse = fn(
    eliminatingFirst.length - 1,
    eliminatingFirst,
    new Array(eliminatingFirst.length).fill(-1)
  );
  const robbingWithoutLastHouse = fn(
    eliminatinglast.length - 1,
    eliminatinglast,
    new Array(eliminatinglast.length).fill(-1)
  );

  return Math.max(robbingWithoutFirstHouse, robbingWithoutLastHouse);
}

// DP - Approach 2 - Tabulation Approach (bottom to top) with Space Optimisation
function houseRobber(valueInHouse) {
  const fn = (values) => {
    let prev = values[0];
    let prev2 = 0;

    for (let idx = 1; idx < values.length; idx++) {
      let pick = values[idx];
      if (idx - 2 >= 0) {
        pick += prev2;
      }

      const nonPick = 0 + prev;
      const temp = Math.max(pick, nonPick);
      prev2 = prev;
      prev = temp;
    }

    return prev;
  };

  const [, ...eliminatingFirst] = valueInHouse;
  const eliminatinglast = valueInHouse.slice(0, -1);

  const robbingWithoutFirstHouse = fn(eliminatingFirst);
  const robbingWithoutLastHouse = fn(eliminatinglast);

  return Math.max(robbingWithoutFirstHouse, robbingWithoutLastHouse);
}

const input = [2, 3, 2];
const output = houseRobber(input);
console.log(output);

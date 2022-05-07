//https://www.codingninjas.com/codestudio/problems/maximum-sum-of-non-adjacent-elements_843261

// DP - Approach 1 - Recursive Approach with Memoization(top to bottom)
function MaximumSumOfNonAdjacentElements(elements) {
  const fn = (idx, dpArray) => {
    if (idx === 0) return elements[idx];
    if (idx < 0) return 0;
    if (dpArray[idx] !== -1) return dpArray[idx];

    const pick = elements[idx] + fn(idx - 2, dpArray);
    const nonPick = 0 + fn(idx - 1, dpArray);

    return (dpArray[idx] = Math.max(pick, nonPick));
  };

  return fn(elements.length - 1, new Array(elements.length).fill(-1));
}

// DP - Approach 2 - Tabulation Approach (bottom to top) with Space Optimisation
function MaximumSumOfNonAdjacentElements(elements) {
  let prev = elements[0];
  let prev2 = 0;

  for (let idx = 1; idx < elements.length; idx++) {
    let pick = elements[idx];
    if (idx - 2 >= 0) pick += prev2;
    const nonPick = 0 + prev;
    temp = Math.max(pick, nonPick);
    prev2 = prev;
    prev = temp;
  }
  return prev;
}

const input = [2, 1, 4, 9];
const output = MaximumSumOfNonAdjacentElements(input);
console.log(output);

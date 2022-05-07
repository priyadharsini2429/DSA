// Problem Statement
// https://atcoder.jp/contests/dp/tasks/dp_b

// DP - Approach 1 - Recursive Approach with Memoization(top to bottom)
const frogJumpKSteps = (heights, step) => {
  const fn = (idx, dpArray) => {
    if (idx === 0) return 0;
    if (dpArray[idx !== -1]) return dpArray[idx];
    let minStep = Infinity;

    for (let j = 1; j < step; j++) {
      if (idx - j >= 0) {
        jump = fn(idx - j, dpArray) + Math.abs(heights[idx] - heights[idx - j]);
        minStep = Math.min(minStep, jump);
      }
    }
    return (dpArray[idx] = minStep);
  };

  return fn(heights.length - 1, new Array(heights.length).fill(-1));
};

// DP - Approach 2 - Tabulation Approach (bottom to top)
const frogJumpK = (heights, step) => {
  const dpArray = [0];

  for (let idx = 1; idx < heights.length; idx++) {
    let minStep = Infinity;
    for (let j = 1; j < step; j++) {
      if (idx - j >= 0) {
        jump = dpArray[idx - j] + Math.abs(heights[idx] - heights[idx - j]);
        minStep = Math.min(minStep, jump);
      }
    }

    dpArray[idx] = minStep;
  }

  return dpArray[heights.length - 1];
};

const input = [10, 20, 40, 50, 20];
const output = frogJumpKSteps(input, 4);

console.log(output);

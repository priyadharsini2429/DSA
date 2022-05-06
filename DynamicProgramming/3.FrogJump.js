// Problem Statement
// There is a frog on the 1st step of an N stairs long staircase. The frog wants to reach the Nth stair. HEIGHT[i] is the height of the (i+1)th stair.If Frog jumps from ith to jth stair, the energy lost in the jump is given by |HEIGHT[i-1] - HEIGHT[j-1] |.In the Frog is on ith staircase, he can jump either to (i+1)th stair or to (i+2)th stair. Your task is to find the minimum total energy used by the frog to reach from 1st stair to Nth stair.

// If the given ‘HEIGHT’ array is [10,20,30,10], the answer 20 as the frog can jump from 1st stair to 2nd stair (|20-10| = 10 energy lost) and then a jump from 2nd stair to last stair (|10-20| = 10 energy lost). So, the total energy lost is 20.

//https://www.codingninjas.com/codestudio/problems/frog-jump_3621012

//Approach the problem in index
//Do all stuff
//return min(All stuff)

// DP - Approach 1 - Recursive Approach (top to bottom)
function frogJump(heights) {
  const fn = (idx, dp) => {
    if (idx === 0) return 0;

    if (dp[idx] !== -1) return dp[idx];

    const oneStair =
      fn(idx - 1, dp) + Math.abs(heights[idx] - heights[idx - 1]);
    let twoStair = Infinity;

    if (idx > 1) {
      twoStair = fn(idx - 2, dp) + Math.abs(heights[idx] - heights[idx - 2]);
    }

    return (dp[idx] = Math.min(oneStair, twoStair));
  };

  return fn(heights.length - 1, new Array(heights.length).fill(-1));
}

// DP - Approach 2 - Tabulation Approach (bottom to top) with Space Optimisation
function frogJump(heights) {
  let prev = 0;
  let prev2 = 0;

  for (let idx = 1; idx < heights.length; idx++) {
    const oneStair = prev + Math.abs(heights[idx] - heights[idx - 1]);
    let twoStair = Infinity;

    if (idx > 1) {
      twoStair = prev2 + Math.abs(heights[idx] - heights[idx - 2]);
    }

    temp = Math.min(oneStair, twoStair);
    prev2 = prev;
    prev = temp;
  }
  return prev;
}

const input = [10, 20, 30, 10];
const output = frogJump(input);

console.log(output);

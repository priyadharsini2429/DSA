// Problem Statement
// You have been given a number of stairs. Initially, you are at the 0th stair, and you need to reach the Nth stair. Each time you can either climb one step or two steps. You are supposed to return the number of distinct ways in which you can climb from the 0th step to Nth step.
// Example :
// N=3

//Use Recursion -> All possible ways

//shortcut
//Try to represent problem in terms of index
//Do all possible stuff on index based on problem statement
// sum up all stuff -> count all ways
// min(all stuff) -> find min
// max(all stuff) -> find max

// https://www.codingninjas.com/codestudio/problems/count-ways-to-reach-nth-stairs_798650
(function countDistinctWayToClimbStair() {
  const climbStair = (idx) => {
    if (idx <= 1) return 1;

    return climbStair(idx - 1) + climbStair(idx - 2);
  };

  console.log(climbStair(44));
})();

//2nd approach
(function (n) {
  if (n === 1) return 1;

  let first = 1;
  let second = 2;

  for (let i = 3; i <= n; i++) {
    let third = first + second;
    first = second;
    second = third;
  }
  console.log(second);
})(44);

//Partition a set into two subsets such that the difference of subset sums is minimum.
//https://www.codingninjas.com/codestudio/problems/partition-a-set-into-two-subsets-such-that-the-difference-of-subset-sums-is-minimum_842494

function SubsetSumEqualToKPossibility(arr, n, k) {
  let prev = new Array(k + 1).fill(false);

  prev[0] = true;

  if (arr[0] <= k) {
    prev[arr[0]] = true;
  }

  for (let idx = 1; idx < n; idx++) {
    let temp = new Array(k + 1).fill(false);
    for (let target = 1; target <= k; target++) {
      let pick = false;
      if (arr[idx] <= target) {
        pick = prev[target - arr[idx]];
      }
      const notPick = prev[target];

      temp[target] = pick || notPick;
    }
    prev = temp;
  }

  return prev;
}

function minSubsetSumDifference(arr, n) {
  const totalSum = arr.reduce((acc, curr) => acc + curr, 0);

  const possibilities = SubsetSumEqualToKPossibility(arr, n, totalSum);

  let minimum = Infinity;
  for (let i = 0; i <= totalSum / 2; i++) {
    if (possibilities[i]) {
      let sum1 = i;
      let sum2 = totalSum - sum1;
      minimum = Math.min(minimum, Math.abs(sum1 - sum2));
    }
  }

  return minimum;
}

const arr = [1, 2, 3, 4];
const arrSize = arr.length;
const output = minSubsetSumDifference(arr, arrSize);
console.log(output);

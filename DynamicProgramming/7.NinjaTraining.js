//https://www.codingninjas.com/codestudio/problems/ninja-s-training_3621003

// DP - Approach 1 - Recursive Approach with Memoization(top to bottom)
function NinjaTraining(days, points) {
  const fn = (day, lastTaskPerformed, dpArray) => {
    if (lastTaskPerformed !== 3 && dpArray[day][lastTaskPerformed] !== -1)
      return dpArray[day][lastTaskPerformed];

    let dayTask = points[day];
    let possibleTask = dayTask.filter(
      (task) => task !== dayTask[lastTaskPerformed]
    );

    if (day === 0) {
      return Math.max(...possibleTask);
    }

    let max = -Infinity;
    for (let i = 0; i < 3; i++) {
      const activityPoint = dayTask[i] + fn(day - 1, i, dpArray);
      max = Math.max(max, activityPoint);
    }
    return (dpArray[day][lastTaskPerformed] = max);
  };

  return fn(days - 1, 3, new Array(days).fill(new Array(3).fill(-1)));
}

// DP - Approach 2 - Tabulation Approach (bottom to top) with Space Optimisation
function NinjaTraining(days, points) {
  let dpArray = [
    [
      Math.max(points[0][1], points[0][2]),
      Math.max(points[0][0], points[0][2]),
      Math.max(points[0][0], points[0][1]),
      Math.max(points[0][0], points[0][1], points[0][2]),
    ],
  ];

  for (let day = 1; day < days; day++) {
    dpArray[day] = Array(4).fill(-1);
    for (let last = 0; last <= 3; last++) {
      for (let i = 0; i < 3; i++) {
        const activityPoint = points[day][i] + dpArray[day - 1][i];
        dpArray[day][last] = Math.max(dpArray[day][last], activityPoint);
      }
    }
  }
  return dpArray[days - 1][3];
}

const points = [
  [10, 40, 70],
  [20, 50, 80],
  [30, 60, 90],
];
const days = 3;
const output = NinjaTraining(days, points);
console.log(output);

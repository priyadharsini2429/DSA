//https://www.codingninjas.com/codestudio/problems/longest-common-subsequence_624879

function lcs(str1, str2) {
  const str1Len = str1.length;
  const str2Len = str2.length;

  const fn = (idx1, idx2, dpArray) => {
    if (idx1 < 0 || idx2 < 0) return 0;
    if (dpArray[idx1][idx2] !== -1) return dpArray[idx1][idx2];
    if (str1[idx1] === str2[idx2])
      return (dpArray[idx1][idx2] = 1 + fn(idx1 - 1, idx2 - 1, dpArray));

    return (dpArray[idx1][idx2] =
      0 + Math.max(fn(idx1 - 1, idx2, dpArray), fn(idx1, idx2 - 1, dpArray)));
  };

  return fn(
    str1Len - 1,
    str2Len - 1,
    Array.from(new Array(str1Len), () => new Array(str2Len).fill(-1))
  );
}

//right shift by 1
function lcs(str1, str2) {
  const str1Len = str1.length;
  const str2Len = str2.length;

  const fn = (idx1, idx2, dpArray) => {
    if (idx1 === 0 || idx2 === 0) return 0;
    if (dpArray[idx1][idx2] !== -1) return dpArray[idx1][idx2];
    if (str1[idx1 - 1] === str2[idx2 - 1])
      return (dpArray[idx1][idx2] = 1 + fn(idx1 - 1, idx2 - 1, dpArray));

    return (dpArray[idx1][idx2] =
      0 + Math.max(fn(idx1 - 1, idx2, dpArray), fn(idx1, idx2 - 1, dpArray)));
  };

  return fn(
    str1Len,
    str2Len,
    Array.from(new Array(str1Len + 1), () => new Array(str2Len + 1).fill(-1))
  );
}

function lcs(str1, str2) {
  const str1Len = str1.length;
  const str2Len = str2.length;

  const dpArray = Array.from(new Array(str1Len + 1), () =>
    new Array(str2Len + 1).fill(-1)
  );

  for (let i = 0; i <= str1Len; i++) {
    dpArray[i][0] = 0;
  }

  for (let j = 0; j <= str2Len; j++) {
    dpArray[0][j] = 0;
  }

  for (let idx1 = 1; idx1 <= str1Len; idx1++) {
    for (let idx2 = 1; idx2 <= str2Len; idx2++) {
      dpArray[idx1][idx2] =
        str1[idx1 - 1] === str2[idx2 - 1]
          ? 1 + dpArray[idx1 - 1][idx2 - 1]
          : 0 + Math.max(dpArray[idx1 - 1][idx2], dpArray[idx1][idx2 - 1]);
    }
  }
  return dpArray[str1Len][str2Len];
}

function lcs(str1, str2) {
  const str1Len = str1.length;
  const str2Len = str2.length;

  let prev = new Array(str2Len + 1).fill(0);

  for (let idx1 = 1; idx1 <= str1Len; idx1++) {
    let curr = new Array(str2Len + 1).fill(0);
    for (let idx2 = 1; idx2 <= str2Len; idx2++) {
      curr[idx2] =
        str1[idx1 - 1] === str2[idx2 - 1]
          ? 1 + prev[idx2 - 1]
          : 0 + Math.max(prev[idx2], curr[idx2 - 1]);
    }
    prev = curr;
  }
  return prev[str2Len];
}

const str1 = "adebc";
const str2 = "dcadb";
const output = lcs(str1, str2);
console.log(output);

const myArray = [
  { group: "one", color: "red" },
  { group: "two", color: "blue" },
  { group: "one", color: "green" },
  { group: "one", color: "black" },
];

//expected output
//   [
//     {group: "one", color: ["red", "green", "black"]}
//     {group: "two", color: ["blue"]}
//   ]

function GroupArrayBySimilarKeys(arr, key) {
  const obj = arr.reduce((result, curr) => {
    const { group, color } = curr;
    result[group] = result[group] || [];
    result[group].push(color);
    return result;
  }, {}); //{ one: [ 'red', 'green', 'black' ], two: [ 'blue' ] }

  return Object.keys(obj).map((key) => ({ group: key, color: obj[key] }));
}

const output = GroupArrayBySimilarKeys(myArray);
console.log(output);

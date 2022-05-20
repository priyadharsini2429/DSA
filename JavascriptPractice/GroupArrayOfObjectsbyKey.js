const cars = [
  {
    make: "audi",
    model: "r8",
    year: "2012",
  },
  {
    make: "audi",
    model: "rs5",
    year: "2013",
  },
  {
    make: "ford",
    model: "mustang",
    year: "2012",
  },
  {
    make: "ford",
    model: "fusion",
    year: "2015",
  },
  {
    make: "kia",
    model: "optima",
    year: "2012",
  },
];

//expectedOutput

// const cars = {
//     'audi': [
//         {
//             'model': 'r8',
//             'year': '2012'
//         }, {
//             'model': 'rs5',
//             'year': '2013'
//         },
//     ],
//     'ford': [
//         {
//             'model': 'mustang',
//             'year': '2012'
//         }, {
//             'model': 'fusion',
//             'year': '2015'
//         }
//     ],
//     'kia': [
//         {
//             'model': 'optima',
//             'year': '2012'
//         }
//     ]
// }

function GroupArrayOfObjectsbyKey(obj, key) {
  return obj.reduce((result, curr) => {
    const { [key]: mainKey, ...rest } = curr;
    result[mainKey] = result[mainKey] || [];
    result[mainKey].push(rest);
    return result;
  }, {});
}

const output = GroupArrayOfObjectsbyKey(cars, "make");
console.log(output);

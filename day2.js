const fs = require('fs');

const isIncresing = (arr) => {
  let cont = 0
  for (let index = 0; index < arr.length - 1; index++) {
    const sum = arr[index + 1] - arr[index]
    cont += sum
  }
  return cont > 0
}
const test = (arr) => {
  if (isSafe(arr)) {
    return true;
  }
  // Try removing each element and check if the resulting array is safe
  for (let index = 0; index < arr.length; index++) {
    const newArr = arr.slice(0, index).concat(arr.slice(index + 1));
    if (isSafe(newArr)) {
      return true;
    }
  }
  return false;
}

const isSafe = (arr) => {
  const flag = isIncresing(arr); // Determine if the array should be increasing or decreasing
  for (let index = 0; index < arr.length - 1; index++) {
    const diff = arr[index + 1] - arr[index];
    const absDiff = Math.abs(diff);
    const inc = diff > 0;
    if (inc !== flag || absDiff > 3 || absDiff < 1) {
      return false;
    }
  }
  return true;
}

let arr = []
const allFileContents = fs.readFileSync('nums.txt', 'utf-8');

allFileContents.split(/\r?\n/).forEach(line => {
  const nums = line.match(/([0-9])+/g)
  if (nums) {
    arr.push(nums.map(elm => parseInt(elm)))
  }
});

let safe = arr.length
for (let i = 0; i < arr.length; i++) {
  let actual = arr[i]
  const res = test(actual)
  if (!res) safe--
}
console.log(safe)

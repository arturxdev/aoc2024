const fs = require('fs');
let arr = []
const allFileContents = fs.readFileSync('day4-input.txt', 'utf-8');

allFileContents.split(/\r?\n/).forEach(line => {
  const nums = line.match(/[A-Z]/g)
  if (nums) {
    arr.push(nums.map(elm => elm))
  }
});
let cont = 0
const yLen = arr.length - 1
const xLen = arr[0].length - 1

//Part 1
// const validate = (x, y, z) => {
//   return (x == "M" && y == "A" && z == "S")
// }
//
// for (let y = 0; y < arr.length; y++) {
//   for (let x = 0; x < arr[y].length; x++) {
//     if (arr[y][x] == "X") {
//       //left-right
//       if (x + 3 <= xLen) validate(arr[y][x + 1], arr[y][x + 2], arr[y][x + 3]) ? cont++ : null
//       if (x - 3 >= 0) validate(arr[y][x - 1], arr[y][x - 2], arr[y][x - 3]) ? cont++ : null
//       //up-down
//       if (y + 3 <= yLen) validate(arr[y + 1][x], arr[y + 2][x], arr[y + 3][x]) ? cont++ : null
//       if (y - 3 >= 0) validate(arr[y - 1][x], arr[y - 2][x], arr[y - 3][x]) ? cont++ : null
//       //diag right to left
//       if (y - 3 >= 0 && x - 3 >= 0) validate(arr[y - 1][x - 1], arr[y - 2][x - 2], arr[y - 3][x - 3]) ? cont++ : null
//       if (y + 3 <= yLen && x + 3 <= xLen) validate(arr[y + 1][x + 1], arr[y + 2][x + 2], arr[y + 3][x + 3]) ? cont++ : null
//       //diag from left to right
//       if (y + 3 <= yLen && x - 3 >= 0) validate(arr[y + 1][x - 1], arr[y + 2][x - 2], arr[y + 3][x - 3]) ? cont++ : null
//       if (y - 3 >= 0 && x + 3 <= xLen) validate(arr[y - 1][x + 1], arr[y - 2][x + 2], arr[y - 3][x + 3]) ? cont++ : null
//     }
//   }
// }
// part 2
const validate = (x, y) => {
  return (x == "M" && y == "S")
}

for (let y = 0; y < arr.length; y++) {
  for (let x = 0; x < arr[y].length; x++) {
    let aux = 0
    if (arr[y][x] == "A") {
      //diag right to left
      if (y - 1 >= 0 && x - 1 >= 0 && y + 1 <= yLen && x + 1 <= xLen) {
        validate(arr[y - 1][x - 1], arr[y + 1][x + 1]) ? aux++ : null
        validate(arr[y + 1][x + 1], arr[y - 1][x - 1]) ? aux++ : null
      }
      //diag from left to right
      if (y + 1 <= yLen && x - 1 >= 0 && y - 1 >= 0 && x + 1 <= xLen) {
        validate(arr[y + 1][x - 1], arr[y - 1][x + 1]) ? aux++ : null
        validate(arr[y - 1][x + 1], arr[y + 1][x - 1]) ? aux++ : null
      }
    }
    if (aux == 2) cont++
  }
}
console.log(cont)


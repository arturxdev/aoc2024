const fs = require('fs');
const { loadEnvFile } = require('process');
let map = []

const allFileContents = fs.readFileSync('input.txt', 'utf-8');
allFileContents.split(/\r?\n/).forEach((line, indexY) => {
  const row = line
  if (row != '') {
    map = row.split('')
  }
});

let count = 0
let arr = []
const fillSpaces = (x, num) => {
  for (let i = 0; i < num; i++) {
    arr.push(x)
  }
}
const printString = (data) => {
  let str = ''
  for (let index = 0; index < data.length; index++) {
    const element = data[index];
    str += element
  }
  console.log(str)
}

for (let i = 0; i < map.length; i++) {
  if ((i + 1) % 2 == 0) {
    fillSpaces(".", parseInt(map[i]))
  } else {
    fillSpaces(count, parseInt(map[i]))
    count++
  }
}
let left = 0, right = arr.length - 1
const copy = JSON.parse(JSON.stringify(arr))
while (left != right) {
  if (arr[right] != ".") {
    if (arr[left] == ".") {
      arr[left] = arr[right]
      arr[right] = "."
      left++
      right--
    } else left++
  } else right--

}
let res = 0
for (let i = 0; i < arr.length; i++) {
  if (arr[i] == '.') break
  const op = arr[i] * i
  res += op
}
printString(copy)
printString(arr)
console.log(res)

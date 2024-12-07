const fs = require('fs');
let map = []
let original = []
let x = -1, y = -1, val = ""
const mapX = new Map()
const mapY = new Map()

const allFileContents = fs.readFileSync('input.txt', 'utf-8');
allFileContents.split(/\r?\n/).forEach((line, indexY) => {
  const row = line
  if (row) {
    const arr = row.split('')
    const index = arr.find((elm, indexX) => {
      if (elm == ">" || elm == "<" || elm == "^" || elm == "v") {
        x = indexX
        y = indexY
        val = elm
      }
      if (elm == "#") {
        if (!mapX.has(indexX)) {
          mapX.set(indexX, [indexY]);
        } else {
          mapX.get(indexX).push(indexY);
        }
        if (!mapY.has(indexY)) {
          mapY.set(indexY, [indexX]);
        } else {
          mapY.get(indexY).push(indexX);
        }
      }
    })
    map.push(arr)
  }
});

console.log(mapY)
console.log(mapX)
original = JSON.parse(JSON.stringify(map));


const printMap = map => {
  let str = ''
  map.forEach(row => {
    str += row.join('') + '\n'
  })
  console.log(str)
}
const step = () => {
  const xLen = map[0].length, yLen = map.length
  switch (val) {
    case '^':
      if (y - 1 < 0) {
        map[y][x] = "X"
        return true
      }
      if (map[y - 1][x] == "#") {
        map[y][x] = ">"
        val = ">"
        return false
      }
      map[y][x] = "X"
      map[y - 1][x] = "^"
      y--
      return false
    case 'v':
      if (y + 1 >= yLen) {
        map[y][x] = "X"
        return true
      }
      if (map[y + 1][x] == "#") {
        map[y][x] = "<"
        val = "<"
        return false
      }
      map[y][x] = "X"
      map[y + 1][x] = "v"
      y++
      return false
    case '>':
      if (x + 1 == xLen) {
        map[y][x] = "X"
        return true
      }
      if (map[y][x + 1] == "#") {
        map[y][x] = "v"
        val = "v"
        return false
      }
      map[y][x] = "X"
      map[y][x + 1] = ">"
      x++
      return false
    case '<':
      if (x - 1 < 0) {
        map[y][x] = "X"
        return true
      }
      if (map[y][x - 1] == "#") {
        map[y][x] = "^"
        val = "^"
        return false
      }
      map[y][x] = "X"
      map[y][x - 1] = "<"
      x--
      return false

    default:
      console.log("no step")
      break;
  }
}
// FIRST PART
// let stop = false
// let index = 0
// while (!stop) {
//   stop = step()
// }
// let cont = 0
// for (let i = 0; i < map.length; i++) {
//   for (let j = 0; j < map[i].length; j++) {
//     if (map[i][j] == "X") cont++
//   }
// }
// printMap(map)
// console.log(cont)
// console.log(y, x, val)

// SECOND PART

let multiverse = []
const createMultiverse = (x, y) => {
  const arr = JSON.parse(JSON.stringify(original));
  arr[y][x] = "O"
  return arr
}
const stepAndFork = () => {
  const xLen = map[0].length, yLen = map.length
  if (mapY.has(y)) {
    console.log("added in y", y, x)
    x - 1 > 0 ? multiverse.push(createMultiverse(x - 1, y)) : null
    x + 1 < xLen ? multiverse.push(createMultiverse(x + 1, y)) : null
  }
  if (mapX.has(x)) {
    console.log("added in x", y, x)
    y - 1 > 0 ? multiverse.push(createMultiverse(x, y - 1)) : null
    y + 1 < yLen ? multiverse.push(createMultiverse(x, y + 1)) : null
  }
  switch (val) {
    case '^':
      if (y - 1 < 0) {
        map[y][x] = "X"
        return true
      }
      if (map[y - 1][x] == "#") {
        map[y][x] = ">"
        val = ">"
        return false
      }
      map[y][x] = "X"
      map[y - 1][x] = "^"
      y--
      return false
    case 'v':
      if (y + 1 >= yLen) {
        map[y][x] = "X"
        return true
      }
      if (map[y + 1][x] == "#") {
        map[y][x] = "<"
        val = "<"
        return false
      }
      map[y][x] = "X"
      map[y + 1][x] = "v"
      y++
      return false
    case '>':
      if (x + 1 == xLen) {
        map[y][x] = "X"
        return true
      }
      if (map[y][x + 1] == "#") {
        map[y][x] = "v"
        val = "v"
        return false
      }
      map[y][x] = "X"
      map[y][x + 1] = ">"
      x++
      return false
    case '<':
      if (x - 1 < 0) {
        map[y][x] = "X"
        return true
      }
      if (map[y][x - 1] == "#") {
        map[y][x] = "^"
        val = "^"
        return false
      }
      map[y][x] = "X"
      map[y][x - 1] = "<"
      x--
      return false
    default:
      console.log("no step")
      break;
  }
}
printMap(map)
// for (let index = 0; index < 10; index++) {
//   stepAndFork()
// }
let stop = false
while (!stop) {
  printMap(map)
  stop = stepAndFork()
}
printMap(map)
console.log(multiverse.length)
printMap(multiverse[178])

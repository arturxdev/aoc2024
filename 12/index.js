const fs = require('fs');
let map = []

const allFileContents = fs.readFileSync('input.txt', 'utf-8');
allFileContents.split(/\r?\n/).forEach((line) => {
  const row = line
  if (row != '') {
    map.push(row.split(''))
  }
});
const printMap = map => {
  let str = ''
  map.forEach(row => {
    str += row.join('') + '\n'
  })
  console.log(str)
}

const xLen = map[0].length
const yLen = map.length

class Field {
  constructor(y, x) {
    this.y = y
    this.x = x
  }
}


const findRegion = (y, x) => {
  const target = map[y][x]
  const aux = new Set()
  let area = 0
  let peri = 2
  let stack = [new Field(y, x)]
  map[y][x] = "."
  aux.add(`${y},${x}`)
  while (stack.length != 0) {
    const field = stack.shift()
    aux.add(`${field.y},${field.x}`)
    //Area
    area++
    //perimeter
    const a = aux.has(`${field.y - 1},${field.x}`)
    const b = aux.has(`${field.y + 1},${field.x}`)
    const c = aux.has(`${field.y},${field.x + 1}`)
    const d = aux.has(`${field.y},${field.x - 1}`)
    const sum = [a, b, c, d].reduce((acc, curr) => curr ? acc + 1 : acc, 0)
    if (sum >= 2) peri += 0
    else peri += 2

    //up - down
    if (field.y - 1 >= 0 && map[field.y - 1][field.x] == target) {
      stack.push(new Field(field.y - 1, field.x))
      map[field.y - 1][field.x] = "."
    }
    if (field.y + 1 < yLen && map[field.y + 1][field.x] == target) {
      stack.push(new Field(field.y + 1, field.x))
      map[field.y + 1][field.x] = "."
    }
    //left-right
    if (field.x + 1 < xLen && map[field.y][field.x + 1] == target) {
      stack.push(new Field(field.y, field.x + 1))
      map[field.y][field.x + 1] = "."
    }
    if (field.x - 1 >= 0 && map[field.y][field.x - 1] == target) {
      stack.push(new Field(field.y, field.x - 1))
      map[field.y][field.x - 1] = "."
    }
  }
  // console.log(`Target ${target}: ${area}*${peri}=${area * peri}`)
  return area * peri
}

// findRegion(0, 9)
// printMap(map)
let res = 0
for (let i = 0; i < map.length; i++) {
  for (let j = 0; j < map[i].length; j++) {
    if (map[i][j] != '.') {
      res += findRegion(i, j)
    }
  }
}
console.log(res)

const fs = require('fs');
let map = []

const allFileContents = fs.readFileSync('input.txt', 'utf-8');
allFileContents.split(/\r?\n/).forEach((line, indexY) => {
  const row = line
  if (row != '') {
    const arr = row.split('')
    map.push(arr)
  }
});
const printMap = map => {
  let str = ''
  map.forEach(row => {
    str += row.join('') + '\n'
  })
  console.log(str)
}

let antennas = []
for (let y = 0; y < map.length; y++) {
  for (let x = 0; x < map[y].length; x++) {
    if (map[y][x] != '.') antennas.push([map[y][x], y, x])
  }
}
let antidote = new Set()
const xLen = map[0].length
const yLen = map.length

for (let y = 0; y < antennas.length; y++) {
  for (let x = y + 1; x < antennas.length; x++) {
    // console.log(antennas[y], antennas[x])
    if (antennas[y][0] == antennas[x][0]) {
      const xDiff = Math.abs(antennas[x][2] - antennas[y][2])
      const yDiff = Math.abs(antennas[x][1] - antennas[y][1])
      const slope = -1 * ((antennas[y][1] - antennas[x][1]) / (antennas[y][2] - antennas[x][2]))

      if (antennas[y][2] == antennas[x][2]) {
        console.log("|")
      } else if (antennas[y][1] == antennas[x][1]) {
        console.log("-")
      } else if (slope > 0) {
        // console.log("/")
        // console.log(antennas[y], antennas[x], yDiff, xDiff)
        if (antennas[y][1] - yDiff >= 0 && antennas[y][2] + xDiff < xLen) {
          const pointY = antennas[y][1] - yDiff
          const pointX = antennas[y][2] + xDiff
          antidote.add(`${pointY},${pointX}`)
          if (map[pointY][pointX] == '.')
            map[pointY][pointX] = "#"
        }
        if (antennas[x][1] + yDiff < yLen && antennas[x][2] - xDiff >= 0) {
          const pointY = antennas[x][1] + yDiff
          const pointX = antennas[x][2] - xDiff
          antidote.add(`${pointY},${pointX}`)
          if (map[pointY][pointX] == '.')
            map[pointY][pointX] = "#"
        }
      } else if (slope < 0) {
        if (antennas[y][1] - yDiff >= 0 && antennas[y][2] - xDiff >= 0) {
          const pointY = antennas[y][1] - yDiff
          const pointX = antennas[y][2] - xDiff
          antidote.add(`${pointY},${pointX}`)
          if (map[pointY][pointX] == '.')
            map[pointY][pointX] = "#"
        }
        if (antennas[x][1] + yDiff < yLen && antennas[x][2] + xDiff < xLen) {
          const pointY = antennas[x][1] + yDiff
          const pointX = antennas[x][2] + xDiff
          antidote.add(`${pointY},${pointX}`)
          if (map[pointY][pointX] == '.')
            map[pointY][pointX] = "#"
        }
      }
    }
  }
}
printMap(map)
console.log(antidote.size)

// const sumY = antennas[y][0] + yDiff
// if (antennas[y][0] + yDiff < yLen && antennas[y][1] + xDiff < xLen) {
//   antidote.add(``)
// }



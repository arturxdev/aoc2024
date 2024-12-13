// const data = "125 17"
const data = "112 1110 163902 0 7656027 83039 9 74"
let rocks = data.split(" ")
rocks = rocks.map(elm => parseInt(elm))

// const isEven = (elm) => {
//   const str = elm.toString()
//   const mid = str.length / 2;
//   const res = [parseInt(str.slice(0, mid)), parseInt(str.slice(mid))];
//   map.set(elm, res)
//   return res
// }
// const isOdd = (elm) => {
//   map.set(elm, [elm * 2024])
//   return elm * 2024
// }
// console.log(rocks)
// let aux = []
// for (let rock of rocks) {
//   for (let i = 0; i < 6; i++) {
//     console.log(`Repeticion ${i + 1}`)
//     if (map.has(rock)) aux.push(...map.get(rock))
//     else if (rock == 0) aux.push(1)
//     else if (rock.toString().length % 2 == 0) aux.push(...isEven(rock))
//     else aux.push(isOdd(rock))
//   }
//   rocks = aux
//   aux = []
// }
// console.log(rocks.length)

const recursive = (rock, num, map) => {
  if (num == 0) return 1
  if (map.has(`${rock}-${num}`)) {
    return map.get(`${rock}-${num}`)
  }
  else if (rock == 0) {
    const res = recursive(1, num - 1, map)
    map.set(`${0}-${num}`, res)
    return res
  }
  else if (rock.toString().length % 2 == 0) {
    const str = rock.toString()
    const mid = str.length / 2;
    const splited = [parseInt(str.slice(0, mid)), parseInt(str.slice(mid))];
    const res = recursive(splited[0], num - 1, map) + recursive(splited[1], num - 1, map)
    map.set(`${rock}-${num}`, res)
    return res
  }
  const res = recursive(rock * 2024, num - 1, map)
  map.set(`${rock}-${num}`, res)
  return res
}
const map = new Map()
// console.log(recursive(125, 6, map))
let count = 0
for (const rock of rocks) {
  const res = recursive(rock, 75, map)
  console.log(`rock ${rock}: ${res}`)
  count += res
}
console.log(count)

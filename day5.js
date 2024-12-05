const fs = require('fs');
let rules = []
let pages = []
const allFileContents = fs.readFileSync('day5-input.txt', 'utf-8');
let isRules = true
allFileContents.split(/\r?\n/).forEach(line => {
  if (line == "") {
    isRules = false
    return
  }
  if (isRules) {
    const nums = line.split('|')
    if (nums) {
      rules.push(nums.map(elm => parseInt(elm)))
    }
  } else {
    pages.push(line.split(',').map(elm => parseInt(elm)))
  }
});
// console.log(rules)
// console.log(pages)


const delPage = (page, rule) => {
  let x = page.indexOf(rule[0])
  let y = page.indexOf(rule[1])
  if (x == -1 || y == -1) return false
  if (x < y) return false
  return true
}
let wrongPages = []
for (let i = 0; i < rules.length; i++) {
  for (let j = 0; j < pages.length; j++) {
    const eval = delPage(pages[j], rules[i])
    if (eval) {
      wrongPages.push(pages[j])
      pages.splice(j, 1);
    }
  }
}

let cont = 0
for (let i = 0; i < pages.length; i++) {
  cont += pages[i][Math.floor(pages[i].length / 2)];
}
console.log("first", cont)
//SECOND PART -------------------------------------------
const fix = (a, b) => {
  for (let i = 0; i < rules.length; i++) {
    if (a == rules[i][0] && b == rules[i][1]) return 1 //+ a es mayor
    if (b == rules[i][0] && a == rules[i][1]) return -1//- b es menor
  }
  return 0 // 0 nada cambia
}
cont = 0
for (let j = 0; j < wrongPages.length; j++) {
  const sorted = wrongPages[j].sort(fix)
  cont += sorted[Math.floor(sorted.length / 2)];

}
console.log("second", cont)

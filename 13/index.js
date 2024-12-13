const fs = require('fs');

let ecuation = []
let a1 = 0, b1 = 0, r1 = 0
let a2 = 0, b2 = 0, r2 = 0

const allFileContents = fs.readFileSync('input.txt', 'utf-8');
allFileContents.split(/\r?\n/).forEach((line) => {
  const row = line
  if (row != '') {
    if (row.includes("Button A")) {
      const nums = row.match(/[0-9]+/g)
      a1 = parseInt(nums[0])
      b1 = parseInt(nums[1])
    }
    if (row.includes("Button B")) {
      const nums = row.match(/[0-9]+/g)
      a2 = parseInt(nums[0])
      b2 = parseInt(nums[1])
    }
    if (row.includes("Prize")) {
      const nums = row.match(/[0-9]+/g)
      r1 = parseInt(nums[0]) + 10000000000000
      r2 = parseInt(nums[1]) + 10000000000000

      ecuation.push({ a1, b1, a2, b2, r1, r2 })
    }
  }
});
function isFloat(n) {
  return Number(n) === n && n % 1 !== 0;
}
function solveEquations(obj) {
  // Coefficients of the equations
  const a = obj.a1, b = obj.a2, e = obj.r1; // First equation: 94c + 22d = 8400
  const c = obj.b1, d = obj.b2, f = obj.r2; // Second equation: 34c + 67d = 5400

  // Calculate the determinant of the coefficient matrix
  const determinant = a * d - b * c;

  if (determinant === 0) {
    return { a: -1, b: -1 }
  }
  // Use Cramer's Rule to calculate c and d
  const cValue = (e * d - b * f) / determinant;
  const dValue = (a * f - e * c) / determinant;
  if (isFloat(cValue) || isFloat(dValue)) {
    return { a: -1, b: -1 }
  }

  return { a: cValue, b: dValue };
}
let cont = 0
for (const elm of ecuation) {
  const res = solveEquations(elm)
  if (res.a != -1) {
    cont += (res.a * 3 + res.b * 1)
  }
}
console.log(cont)

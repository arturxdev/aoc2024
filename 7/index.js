const fs = require('fs');
let nums = []
let res = []

const allFileContents = fs.readFileSync('input.txt', 'utf-8');
allFileContents.split(/\r?\n/).forEach((line, indexY) => {
  const row = line
  if (row != '') {
    const arr = row.split(':')
    res.push(parseInt(arr[0]))
    nums.push(arr[1].match(/([0-9])+/g).map((elm) => parseInt(elm)))
  }
});

const bruteForce = (res, nums) => {
  let options = []
  options.push(nums[0] + nums[1])
  options.push(nums[0] * nums[1])
  options.push(parseInt(`${nums[0]}${nums[1]}`))
  nums.shift()
  nums.shift()
  let index = 0
  const helper = (options, nums, index) => {
    // console.log(index, options, nums)
    index++
    if (nums.length == 0) return options
    let aux = []
    for (let i = 0; i < options.length; i++) {
      aux.push(options[i] + nums[0])
      aux.push(options[i] * nums[0])
      aux.push(parseInt(`${options[i]}${nums[0]}`))
    }
    nums.shift()
    options = aux
    return helper(options, nums, index)
  }
  const data = helper(options, nums, index)
  // console.log(data)
  return data.includes(res)
}
// console.log(bruteForce(res[0], nums[0]))
// console.log(nums)
let cont = 0
for (let i = 0; i < res.length; i++) {
  const eval = bruteForce(res[i], nums[i])
  console.log(eval, res[i])
  if (eval) cont += res[i]
}
console.log(cont)

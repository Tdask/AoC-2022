const fs = require("fs");

const input = fs
  .readFileSync("day1input.txt", { encoding: "utf8" })
  .split("\n")
  .map((el) => parseInt(el));

const answer = () => {
  let maxSum = 0;
  let currSum = 0;
  for (let i = 0; i < input.length; i++) {
    const curr = input[i];
    if (Number.isNaN(curr)) {
      maxSum = Math.max(currSum, maxSum);
      currSum = 0;
    } else {
      currSum += curr;
    }
  }
};

answer();

const answer2 = () => {
  const sumsArr = []
  let currSum = 0
  for (let i = 0; i < input.length; i++){
    const curr = input[i];
    if (Number.isNaN(curr)) {
      sumsArr.push(currSum)
      currSum = 0
    } else {
      currSum += curr
    }
    if(i === input.length-1){
      sumsArr.push(currSum)
    }
  }
  sumsArr.sort((a,b) => a-b)
  console.log(sumsArr[sumsArr.length-1] + sumsArr[sumsArr.length-2] + sumsArr[sumsArr.length-3])
};

answer2()

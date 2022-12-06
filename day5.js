const fs = require("fs");

const input = fs
  .readFileSync("day5input.txt", { encoding: "utf8" })
  .split("\n");

const n = input.length;
const m = input[0].length; //the number of stacks
const stackHeight = n - 1; // the height of the stacks
const stackAmount = Math.ceil(m / 4);

const moves = fs
  .readFileSync("day5Moves.txt", { encoding: "utf8" })
  .split("\n");

const getProcessedMoves = (moves) => {
  return moves.map((move) =>
    move
      .split(" ")
      .map((str) => parseInt(str))
      .filter((el) => !Number.isNaN(el))
  );
};

const getProcessedSlice = (horizontalStr) => {
  let i = 1;
  let sliceProcessed = [];
  while (i < m) {
    sliceProcessed.push(
      horizontalStr[i].charCodeAt(0) === 32 ? null : horizontalStr[i]
    );
    i += 4;
  }
  return sliceProcessed;
};

const makeStacks = (inputArr) => {
  const stackObj = {};
  for (let i = 1; i <= stackAmount; i++) {
    stackObj[i] = [];
  }
  //iterate from bottom up in horizontal slices
  for (let i = n - 2; i >= 0; i--) {
    const processedSliceArr = getProcessedSlice(inputArr[i]);
    for (const [idx, curr] of processedSliceArr.entries()) {
      if (curr !== null) {
        stackObj[idx + 1].push(curr);
      }
    }
  }
  return stackObj;
};

const answer1 = () => {
  const stacks = makeStacks(input);
  let runningTops = "";
  const processedMoves = getProcessedMoves(moves);
  for (const [amount, from, to] of processedMoves) {
    for (let i = 1; i <= amount; i++) {
      stacks[to].push(stacks[from].pop());
    }
  }
  for (const stack in stacks) {
    const currStack = stacks[stack];
    if (currStack[currStack.length - 1]) {
      runningTops += currStack[currStack.length - 1];
    }
  }
  return runningTops;
};
console.log(answer1());

const answer2 = () => {
  const stacks = makeStacks(input);
  let runningTops = "";
  const processedMoves = getProcessedMoves(moves);
  for (const [amount, from, to] of processedMoves) {
    //slice suffix off, replace from's with updated prefix
    const suffix = stacks[from].slice(
      stacks[from].length - amount,
      stacks[from].length
    );
    const prefix = stacks[from].slice(0, stacks[from].length - amount);
    stacks[to] = stacks[to].concat(suffix)
    stacks[from] = prefix;
  }
  for (const stack in stacks) {
    const currStack = stacks[stack];
    if (currStack[currStack.length - 1]) {
      runningTops += currStack[currStack.length - 1];
    }
  }
  return runningTops
};
console.log(answer2());

const fs = require("fs");

const input = fs
  .readFileSync("day11input.txt", { encoding: "utf8" })
  .split("\n");

const prodOfAllDivisors = 5 * 17 * 2 * 7 * 3 * 11 * 13 * 19;
const operationsMap = {
  "*": (a, b) => a * b,
  "+": (a, b) => a + b,
};
const monkeys = {};
for (let i = 0; i < input.length; i += 7) {
  const monkeyNum = input[i].split(" ")[1][0];
  monkeys[monkeyNum] = {};
  const items = input[i + 1]
    .split(" ")
    .filter((el) => !Number.isNaN(parseInt(el)));
  monkeys[monkeyNum].items = items;
  const opLine = input[i + 2].split("=")[1];
  const opAmount = parseInt(opLine.split(" ").pop());
  const operation = opLine.split(" ")[2];
  monkeys[monkeyNum].op = (item) => {
    const bItem = Number.isNaN(opAmount) ? item : opAmount;
    return operationsMap[operation](item, bItem);
  };
  const divisableBy = parseInt(input[i + 3].split(" ").pop());
  monkeys[monkeyNum].test = (item) => item % divisableBy === 0;
  const truePass = parseInt(input[i + 4].split(" ").pop());
  const falsePass = parseInt(input[i + 5].split(" ").pop());
  monkeys[monkeyNum].ifTrue = truePass;
  monkeys[monkeyNum].ifFalse = falsePass;
}
//{items: [79, 98], op: (item) => item*19, test: (item) => item % 23 === 0, ifTrue: 2,  ifFalse: 3}

const inspectionCountMap = {};
Object.keys(monkeys).map((key) => (inspectionCountMap[key] = 0));

const playTurn = (monkeyKey) => {
  const currMonkey = monkeys[monkeyKey];
  inspectionCountMap[monkeyKey] += currMonkey.items.length;
  for (const item of currMonkey.items) {
    const newWorryRating =
      currMonkey.op(parseInt(item)) % prodOfAllDivisors;
    const isDivisable = currMonkey.test(newWorryRating);
    const toPass = isDivisable ? currMonkey.ifTrue : currMonkey.ifFalse;
    monkeys[toPass].items.push(newWorryRating);
  }
  currMonkey.items = [];
};

//playing a turn
/*
inspectionCountMap = {
  0: 2,
  1:,
  2:,
  3:,
}
//add the length of items to running inspectionCount for currMonkey
currMonkey.items.length// 2
inspectionCountMap[currMonkey] += currMonkey.items.length

//go thru items, for each item:
  -op
  -/3
  -test
//now we know which monkey to pass to
monkeys[toPass].items.push(item)
//currMonkey's items are empty now, update it to reflect
monkeys[currMonkey].items = []

*/

const playRound = () => {
  for (const key of Object.keys(monkeys)) {
    playTurn(key);
  }
};
answer1 = () => {
  for (let i = 1; i <= 10000; i++) {
    playRound();
  }
};

answer1();
const values = Object.values(inspectionCountMap).sort((a, b) => a - b);
const result = values[values.length - 1] * values[values.length - 2];
console.log(result);

const fs = require("fs");

const input = fs.readFileSync("day6input.txt", { encoding: "utf8" });

const initializeCount = (str) => {
  const obj = {};
  for (let i = 0; i < 4; i++) {
    const curr = str[i];
    if (obj[curr]) {
      obj[curr]++;
    } else {
      obj[curr] = 1;
    }
  }
  return obj;
};

const answer1 = () => {
  const count = initializeCount(input);
  //initialize count with first 4
  //define left and right pointers, increment both at once
  //at each step check number of keys in obj if it is 4, we've found our first marker and are done.
  //incremenent or decrement count of each pointer's curr char
  //call helper function that removes any chars of count 0
  //check the length of object, if its anything less than 4, keep going
  let i = 0;
  let j = 3;
  while (j < input.length) {
    const currCountAmount = Object.keys(count).length;
    if (currCountAmount === 4) {
      break;
    }
    count[input[i]]--;
    if (count[input[i]] === 0) {
      delete count[input[i]];
    }
    i++;
    j++;
    if (count[input[j]] === undefined) {
      count[input[j]] = 1;
    } else {
      count[input[j]]++;
    }
  }
  return j + 1;
};
// console.log(answer1());

const initializeCount2 = (str) => {
  const obj = {};
  for (let i = 0; i < 14; i++) {
    const curr = str[i];
    if (obj[curr]) {
      obj[curr]++;
    } else {
      obj[curr] = 1;
    }
  }
  return obj;
};
const answer2 = () => {
  const count = initializeCount2(input);
  let i = 0;
  let j = 13;
  while (j < input.length) {
    const currCountAmount = Object.keys(count).length;
    if (currCountAmount === 14) {
      break;
    }
    count[input[i]]--;
    if (count[input[i]] === 0) {
      delete count[input[i]];
    }
    i++;
    j++;
    if (count[input[j]] === undefined) {
      count[input[j]] = 1;
    } else {
      count[input[j]]++;
    }
  }
  return j + 1;
};

console.log(answer2());

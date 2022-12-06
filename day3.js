const fs = require("fs");

const input = fs
  .readFileSync("day3input.txt", { encoding: "utf8" })
  .split("\n");

const getPriority = (char) => {
  const code = char.charCodeAt(0);
  if (code >= 97 && code <= 122) {
    return code - 96;
  }
  if (code >= 65 && code <= 90) {
    return code - 38;
  }
};

const answer1 = () => {
  let runningSum = 0;
  for (const sack of input) {
    const firstHalf = sack.slice(0, sack.length / 2);
    const secondHalf = sack.slice(sack.length / 2, sack.length);
    const firstSet = new Set();

    //iterate thru first half, add everything to a Set
    for (let i = 0; i < firstHalf.length; i++) {
      firstSet.add(firstHalf[i]);
    }
    //iterate thru second half, check if in set, if it is stop and calculate priority number, add to running sum
    for (let i = 0; i < secondHalf.length; i++) {
      if (firstSet.has(secondHalf[i])) {
        runningSum += getPriority(secondHalf[i]);
        break;
      }
    }
  }
  return runningSum;
};

const getFirstIntersection = (set, sackStr) => {
  const intersection = new Set();
  for (let i = 0; i < sackStr.length; i++) {
    if (set.has(sackStr[i])) {
      intersection.add(sackStr[i]);
    }
  }
  return intersection;
};

const answer2 = () => {
  let i = 0;
  let runningSum = 0;
  while (i < input.length) {
    const firstSack = input[i];
    const secondSack = input[i + 1];
    const thirdSack = input[i + 2];
    const firstSet = new Set();
    for (let j = 0; j < firstSack.length; j++) {
      const currChar = firstSack[j];
      firstSet.add(currChar);
    }
    const firstIntersectionSet = getFirstIntersection(firstSet, secondSack);
    for (let j = 0; j < thirdSack.length; j++) {
      if (firstIntersectionSet.has(thirdSack[j])) {
        runningSum += getPriority(thirdSack[j]);
        break;
      }
    }
    i += 3;
  }
  return runningSum;
};

console.log(answer2());

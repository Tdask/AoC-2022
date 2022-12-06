const fs = require("fs");

const input = fs
  .readFileSync("day4input.txt", { encoding: "utf8" })
  .split("\n");

//returns [{a: [2,4], b: [6,8]}, ...]
const getProcessed = (inputArr) => {
  return inputArr.map((str) => {
    const obj = {};
    const pairs = str.split(",");
    obj.a = pairs[0].split("-").map((el) => parseInt(el));
    obj.b = pairs[1].split("-").map((el) => parseInt(el));
    return obj;
  });
};

const answer1 = () => {
  const processed = getProcessed(input);
  let count = 0;
  //go thru processed, determine person with min start time,
  //in order for them to encompass other, other persons start must be >= to minperson's start,
  //AND other person's end must be <= minperson's end
  for (const pair of processed) {
    const minStartPerson =
      pair.a[0] === Math.min(pair.a[0], pair.b[0]) ? pair.a : pair.b;
    const otherPerson =
      pair.a[0] === Math.max(pair.a[0], pair.b[0]) ? pair.a : pair.b;
    if (
      otherPerson[0] >= minStartPerson[0] &&
      otherPerson[1] <= minStartPerson[1]
    ) {
      count++;
    }
  }
  return count;
};

// console.log(answer1());

const answer2 = () => {
  const processed = getProcessed(input);
  let count = 0;
  for (const pair of processed) {
    const minStartPerson =
      pair.a[0] === Math.min(pair.a[0], pair.b[0]) ? pair.a : pair.b;
    const otherPerson =
      pair.a[0] === Math.max(pair.a[0], pair.b[0]) ? pair.a : pair.b;

    //otherPerson is overlapping if their start time is <= to minPerson's end time
    if (otherPerson[0] <= minStartPerson[1]) {
      count++;
    }
  }
  return count;
};
console.log(answer2());

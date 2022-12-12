const fs = require("fs");

const input = fs
  .readFileSync("day10input.txt", { encoding: "utf8" })
  .split("\n");

const cyclesToCheck = [20, 60, 100, 140, 180, 220];
let runningSum = 0;

const checkCycle = (cycle, register) => {
  if (cyclesToCheck.includes(cycle)) {
    runningSum += cycle * register;
  }
};

const getProcessedLined = (line) => {
  const [cmd, amt] = line.split(" ");
  return [cmd, parseInt(amt)];
};

const answer1 = () => {
  let cycle = 1;
  let register = 1;
  for (const line of input) {
    const [cmd, amt] = getProcessedLined(line);
    if (cmd === "noop") {
      cycle++;
      //check if its 20, 40, 60 cycle etc. if so calc the signal strength
      checkCycle(cycle, register);
    }
    if (cmd === "addx") {
      for (let i = 1; i <= 2; i++) {
        cycle++;
        if (i === 2) {
          register += amt;
        }
        //check if its 20, 40,60 etc, calc strength
        checkCycle(cycle, register);
      }
    }
  }
  console.log(runningSum);
};
// answer1();

const CRT = Array(6);
for (let i = 0; i < CRT.length; i++) {
  const newRow = Array(40).fill(".");
  CRT[i] = newRow;
}

const checkPixel = (cycle, register) => {
  let singleRowPix = (cycle % 40) - 1;
  if(singleRowPix === -1){
    singleRowPix = 39
  }
  let currRow = Math.floor(cycle/40)
  if(cycle >= 40 && cycle % 40 === 0){
    currRow--
  }
  if(register -1 === singleRowPix || register === singleRowPix || register+1 === singleRowPix){
    CRT[currRow][singleRowPix] = '#'
  }
};

const answer2 = () => {
  let cycle = 1;
  let register = 1;
  checkPixel(cycle, register);
  for (const line of input) {
    const [cmd, amt] = getProcessedLined(line);
    if (cmd === "noop") {
      cycle++;
      checkPixel(cycle, register);
    }
    if (cmd === "addx") {
      for (let i = 1; i <= 2; i++) {
        cycle++;
        if (i === 2) {
          register += amt;
        }
        checkPixel(cycle, register);
      }
    }
  }
  console.table(CRT);
};

answer2();

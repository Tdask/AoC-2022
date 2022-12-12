const fs = require("fs");

const input = fs
  .readFileSync("day7input.txt", { encoding: "utf8" })
  .split("\n");

const calculateSumOfLevel = (obj, path) => {
  const currLevel = obj[path];
  let runSum = 0;
  for (const item of currLevel) {
    if (typeof item === "number") {
      runSum += item;
    } else {
      runSum += calculateSumOfLevel(obj, item)
    }
  }
  return runSum
};

const getCurrLevel = (idx, list, currPath) => {
  let j = idx + 1;
  const level = [];
  //if it's not a command, it's part of the level
  while (j < list.length && list[j][0] !== "$") {
    //if it's not a dir, add its amount
    if (list[j].indexOf("dir") === -1) {
      level.push(parseInt(list[j].split(" ")[0]));
    } else {
      //otherwise it's a dir and need to append to currPath and add to level
      const newPath = currPath + list[j].split(" ")[1] + "/";
      level.push(newPath);
    }
    j++;
  }
  return level;
};

const answer1 = () => {
  const stack = [];
  let currPath = "";
  const sumMap = {};

  let i = 0;
  //build up sumMap
  while (i < input.length) {
    const currLine = input[i];
    //if '$ls' command
    if (currLine[0] === "$" && currLine.indexOf("ls") !== -1) {
      //get current level's nodes, add them to sumMap
      const currLevel = getCurrLevel(i, input, currPath);
      //fill up sumMap with currLevel, increment i by length of currLevel
      sumMap[currPath] = [];
      for (node of currLevel) {
        sumMap[currPath].push(node);
      }
      i += currLevel.length + 1;
      continue;
    }
    //if its $cd command
    if (currLine[0] === "$" && currLine.indexOf("cd") !== -1) {
      //if we are going deeper into a directory
      if (currLine.indexOf("..") === -1) {
        //push currPath into stack, update currPath
        stack.push(currPath);
        currPath = currPath + currLine.split(" ")[2] + "/";
      } else {
        if(!stack.length){
          break
        }
        //pop off path from stack, update currPath
        currPath = stack.pop();
      }
      i++;
      continue;
    }
  }

  //iterate thru sumMap calculating sum of each level using recursive helper. keep running set of all level sums <= 100k, then add them all up and return
  let runningSum = 0
  for (const key of Object.keys(sumMap)){
    const currSum = calculateSumOfLevel(sumMap, key)
    if(currSum <= 100000){
      runningSum += currSum
    }
  }

  console.log({runningSum})
};
answer1();

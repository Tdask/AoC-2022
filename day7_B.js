const fs = require("fs");

const input = fs
  .readFileSync("day7input.txt", { encoding: "utf8" })
  .split("\n");

const addPathToMap = (path, map) => {
  if (map[path] === undefined) {
    map[path] = 0;
  }
};
const answer1 = () => {
  const sizeMap = {};
  let stack = [];
  let currPath = "";
  for (const line of input) {
    if (line.indexOf("cd") !== -1) {
      if (line.indexOf("$ cd ..") === -1 && line.indexOf("$ cd /") === -1) {
        //going down into child directory
        if (currPath === "/") {
          currPath += line.split(" ")[2];
        } else {
          currPath += "/" + line.split(" ")[2];
        }
        stack.push(currPath);
        addPathToMap(currPath, sizeMap);
      } else if (line.trim() === "$ cd /") {
        currPath = "/";
        stack = ["/"];
        addPathToMap(currPath, sizeMap);
      } else if (line.trim() === "$ cd ..") {
        //going up a parent
        stack.pop();
        currPath = stack[stack.length - 1];
      }
    }
    if (!Number.isNaN(parseInt(line.split(" ")[0]))) {
      for (const path of stack) {
        sizeMap[path] += parseInt(line.split(" ")[0]);
      }
    }
  }
  let runningSum = 0;
  for (const key of Object.keys(sizeMap)) {
    if (sizeMap[key] <= 100000) {
      runningSum += sizeMap[key];
    }
  }
  const totalUsed = sizeMap["/"];
  const unused = 70000000 - totalUsed;
  //want unused to be at least 30mil,
  //what is the smallest size directory we can delete that gets us to 30mil unused
  const minToDelete = 30000000 - unused
  let minDeleteAmount = Infinity;
  for (const key of Object.keys(sizeMap)) {
    if (sizeMap[key] >= minToDelete) {
      minDeleteAmount = Math.min(minDeleteAmount, sizeMap[key]);
    }
  }
  console.log("answer2", minDeleteAmount);
};

answer1();

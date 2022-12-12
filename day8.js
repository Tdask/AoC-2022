const fs = require("fs");

const input = fs
  .readFileSync("day8input.txt", { encoding: "utf8" })
  .split("\n");
const n = input.length;
const m = input[0].length;
const matrix = Array(n);
for (let i = 0; i < n; i++) {
  const currStr = input[i];
  const newArr = [];
  matrix[i] = newArr;
  for (let j = 0; j < m; j++) {
    matrix[i].push(currStr[j]);
  }
}

const isVisible = (grid, i, j) => {
  const curr = parseInt(grid[i][j]);
  //look left
  let newJ = j - 1;
  let isVisibleFromLeft = true;
  while (newJ >= 0) {
    if (grid[i][newJ] >= curr) {
      isVisibleFromLeft = false;
      break;
    }
    newJ--;
  }
  //look up
  let newI = i - 1;
  let isVisibleFromUp = true;
  while (newI >= 0) {
    if (grid[newI][j] >= curr) {
      isVisibleFromUp = false;
      break;
    }
    newI--;
  }
  //look right
  newJ = j + 1;
  let isVisibleFromRight = true;
  while (newJ < m) {
    if (grid[i][newJ] >= curr) {
      isVisibleFromRight = false;
      break;
    }
    newJ++;
  }
  //look down
  newI = i + 1;
  let isVisibleFromDown = true;
  while (newI < n) {
    if (grid[newI][j] >= curr) {
      isVisibleFromDown = false;
      break;
    }
    newI++;
  }
  return (
    isVisibleFromLeft ||
    isVisibleFromRight ||
    isVisibleFromUp ||
    isVisibleFromDown
  );
};

const answer1 = () => {
  let visibleCount = 0;
  //now iterate through 'inner' trees and for each one do DFS
  for (let i = 1; i < n - 1; i++) {
    for (let j = 1; j < m - 1; j++) {
      if (isVisible(matrix, i, j)) {
        visibleCount++;
      }
    }
  }
  visibleCount += 2 * n + 2 * (m - 2);
  return visibleCount;
};
// console.log(answer1());

const getVisCount = (grid, i, j) => {
  const curr = grid[i][j];
  //look left
  let newJ = j - 1;
  let leftCount = 0;
  while (newJ >= 0) {
    leftCount++;
    if (grid[i][newJ] >= curr) {
      break;
    }
    newJ--;
  }
  //look up
  let newI = i - 1;
  let upCount = 0;
  while (newI >= 0) {
    upCount++;
    if (grid[newI][j] >= curr) {
      break;
    }
    newI--;
  }
  //look right
  newJ = j + 1;
  let rightCount = 0;
  while (newJ < m) {
    rightCount++;
    if (grid[i][newJ] >= curr) {
      isVisibleFromRight = false;
      break;
    }
    newJ++;
  }
  //look down
  newI = i + 1;
  let downCount = 0;
  while (newI < n) {
    downCount++;
    if (grid[newI][j] >= curr) {
      break;
    }
    newI++;
  }
  return leftCount * upCount * rightCount * downCount;
};

const answer2 = () => {
  let runningMaxVis = 0;
  for (let i = 1; i < n - 1; i++) {
    for (let j = 1; j < m - 1; j++) {
      const currVisCount = getVisCount(matrix, i, j);
      runningMaxVis = Math.max(runningMaxVis, currVisCount);
    }
  }
  return runningMaxVis;
};

console.log(answer2());

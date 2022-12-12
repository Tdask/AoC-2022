const fs = require("fs");

const input = fs
  .readFileSync("day9input.txt", { encoding: "utf8" })
  .split("\n");

const moveRight = ([i, j]) => {
  return [i, j + 1];
};
const moveLeft = ([i, j]) => {
  return [i, j - 1];
};
const moveUp = ([i, j]) => {
  return [i + 1, j];
};
const moveDown = ([i, j]) => {
  return [i - 1, j];
};

const moves = {
  R: moveRight,
  L: moveLeft,
  U: moveUp,
  D: moveDown,
};

const getManhattanDistance = (p1,p2) => {
  const [i1, j1] = p1
  const [i2, j2] = p2
  return Math.abs(i1-i2) + Math.abs(j1-j2)
}

const moveDiagonal = (tail, head) => {
  const [iT, jT] = tail
  const [iH, jH] = head
  if(iH > iT && jH > jT){
    //up-right
    return [iT+1, jT+1]
  } else if(iH < iT && jH > jT){
    //down-right
    return [iT-1, jT+1]
  } else if (iH < iT && jH < jT){
    //down-left
    return [iT-1, jT-1]
  } else {
    //up-left
    return[iT+1, jT-1]
  }
}

const maybeUpdateTail = (oldTail, newHead, dir) => {
  //if in same row or col
  if (oldTail[0] === newHead[0] || oldTail[1] === newHead[1]) {
    if(getManhattanDistance(oldTail, newHead) === 2){
      return moves[dir](oldTail);
    } else if(getManhattanDistance(oldTail, newHead) <= 1) {
      return oldTail
    }
  }
  //THE POINTS DONT SHARE ROW OR COLUMN
  if (getManhattanDistance(oldTail, newHead) === 2) {
    //they are diagonal and touching
    return oldTail;
  } else {
    //they're not in same row or col, AND they're not touching
    return moveDiagonal(oldTail, newHead)
  }
};

const answer = () => {
  let currTail = [0, 0];
  let currHead = [0, 0];
  let prevHead = null;
  const tailVisited = new Set();
  tailVisited.add(currTail.join());
  for (const line of input) {
    const dir = line[0];
    const moveCount = line.split(' ')[1];
    for (let i = 1; i <= moveCount; i++) {
      //update head
      prevHead = currHead;
      currHead = moves[dir](currHead);
      //maybe update tail
      currTail = maybeUpdateTail(currTail, currHead, dir);
      tailVisited.add(currTail.join());
    }
  }
  // console.log('answer1', tailVisited.size);
};

answer();

const answer2 = () => {
  const knots = [[0,0], [0,0], [0,0], [0,0], [0,0], [0,0], [0,0], [0,0], [0,0], [0,0]]
  const lastKnotVisited = new Set()
  lastKnotVisited.add(knots[9].join());
  let currHead = [0,0]
  let currTail = [0,0]
  for (const line of input) {
    const dir = line[0];
    const moveCount = parseInt(line.split(' ')[1]);
    for (let i = 1; i <= moveCount; i++) {
      //update H
      currHead = moves[dir](knots[0]); //[0,1]
      knots[0] = currHead
      for(let i = 0; i < knots.length-1; i++){ //i =8
        currHead = knots[i] //[0,0]
        currTail = knots[i+1] // [0,0]
        //update currTail?
        currTail = maybeUpdateTail(currTail, currHead, dir); //[0,0]
        knots[i+1] = currTail
        currHead = currTail
        lastKnotVisited.add(knots[9].join())
      }
    }
  }
  console.log('answer2', lastKnotVisited.size)
}
answer2()


/*
  [H       T]
[(0,1), (0,0), (0,0), (0,0), (0,0), (0,0), (0,0), (0,0), (0,0), (0,0)]
 H       1      2     3       4     5       6     7       8      9
*/

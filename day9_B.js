const fs = require("fs");

const input = fs
  .readFileSync("day9input.txt", { encoding: "utf8" })
  .split("\n");

const directions = { U: [1, 0], D: [-1, 0], R: [0, 1], L: [0, -1] };
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
const knots = [[0,0], [0,0], [0,0], [0,0], [0,0], [0,0], [0,0], [0,0], [0,0], [0,0]]
lastKnotVisited = new Set()

for (const line of input){
  const currDir = line[0]
  const currAmount = parseInt(line.split(' ').pop())
  for(let i = 1; i <= currAmount; i++){
    //update Head, aka knots[0]
    const [n, m] = directions[currDir]
    const movedHead = [knots[0][0]+n, knots[0][1]+m]
    knots[0] = movedHead
    for(let j = 1; j < knots.length; j++){
      const currHead = knots[j-1]
      const currTail = knots[j]
      const dHeight = currHead[0] - currTail[0]
      const dWidth = currHead[1] - currTail[1]
      if(Math.abs(dHeight) <=1 && Math.abs(dWidth) <=1){
        continue;
      } else if(Math.abs(dHeight) >= 2 && dWidth === 0){
        //move up or down 1
        const currDirToMove = currHead[0] > currTail[0] ? 'U' : 'D'
        const movedTail = [currTail[0] + directions[currDirToMove][0], currTail[1]]
        knots[j] = movedTail
      } else if (Math.abs(dWidth) >=2 && dHeight === 0){
        //move left or right 1
        const currDirToMove = currHead[1] > currTail[1] ? 'R' : 'L'
        const movedTail = [currTail[0], currTail[1] + directions[currDirToMove][1]]
        knots[j] = movedTail
      } else if(Math.abs(dHeight) ===2 && Math.abs(dWidth) >= 1){
        const movedTail = moveDiagonal(currTail, currHead)
        knots[j] = movedTail
      } else if(Math.abs(dWidth) === 2 && Math.abs(dHeight) >= 1){
        const movedTail = moveDiagonal(currTail, currHead)
        knots[j] = movedTail
      }
    }
    //cascaded thru all nodes after moving head once, now check last knot
    lastKnotVisited.add(knots[9].join())
  }
}
console.log(lastKnotVisited.size)

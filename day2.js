const fs = require("fs");

const input = fs
  .readFileSync("day2input.txt", { encoding: "utf8" })
  .split("\n");

const playDict = {
  X: { shapeval: 1, winsAgainst: 'C', losesAgainst: 'B', drawsAgainst: 'A' },
  Y: { shapeval: 2, winsAgainst: 'A', losesAgainst: 'C', drawsAgainst: 'B' },
  Z: { shapeval: 3, winsAgainst: 'B', losesAgainst: 'A', drawsAgainst: 'C' },
};
const answer1 = () => {
  let runningScore = 0

for (const play of input) {
  const opponent = play[0];
  const myPlay = play[2];
  //now determine the score
  const currKey = playDict[myPlay]

  let currScore = currKey.shapeval
  if(currKey.winsAgainst === opponent){
    //then we win, add 6
    currScore += 6
  } else if (currKey.drawsAgainst === opponent){
    //then we draw
    currScore += 3
  }
  runningScore += currScore
}

// console.log({runningScore})
}

answer1()


const opponentMap = {
  A: {X: 'scissors', Y: 'rock',  Z: 'paper'},
  B: {X: 'rock', Y: 'paper', Z: 'scissors' },
  C: {X: 'paper', Y: 'scissors', Z: 'rock'}
}

const myShapeVals = {
  rock: 1,
  paper: 2,
  scissors: 3
}

outcomeDict = {
  X: 0,
  Y: 3,
  Z: 6
}

const answer2 = () => {
  let runningScore = 0
  for (const play of input) {
  const opponent = play[0];
  const outcome = play[2];
  const subObj = opponentMap[opponent]
  const myPlay = subObj[outcome]
  //determine score, get shapeVal, and get outcomeVal
  const currScore = myShapeVals[myPlay] + outcomeDict[outcome]
  runningScore += currScore
  }
  console.log(runningScore)
}

answer2()

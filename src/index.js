import { readLineAsync } from "./utils/readLine.util"
import { getRandomNumber } from "./index.util"
import { MAX_NUMBER, MIN_NUMBER, LIMIT_COUNT, PRINT } from "./index.constants"

let prevInputList = []
let playCount = 0
let answer = getRandomNumber(1, 50)

async function play() {
  if (isInitialStart(playCount)) {
    console.log(PRINT.init)
  }

  if (isExceedCount(playCount)) {
    console.log(PRINT.excced(answer))
    isRestart()
    return
  }

  playCount++

  const inputValue = await readLineAsync(PRINT.input)

  if (!userInputValidation(inputValue)) {
    throw new Error(PRINT.userInputError)
  }

  const isValid = validateUserInput(Number(inputValue), answer)

  if (isValid) {
    console.log(PRINT.answer(playCount))
    isRestart()
    return
  }

  prevInputList.push(Number(inputValue))
  console.log(PRINT.prevGuess(prevInputList))
  play()
}

function isInitialStart(playCount) {
  return playCount === 0
}

function isExceedCount(playCount) {
  return playCount >= LIMIT_COUNT
}

function userInputValidation(value) {
  return value >= MIN_NUMBER && value <= MAX_NUMBER
}

function validateUserInput(userInputValue, answer) {
  let result = false

  if (userInputValue > answer) {
    console.log("\x1b[1m\x1b[95m%s\x1b[0m", "다운")
    result = false
  }

  if (userInputValue < answer) {
    console.log("\x1b[1m\x1b[95m%s\x1b[0m", "업")
    result = false
  }

  if (userInputValue === answer) {
    console.log("\x1b[1m\x1b[95m%s\x1b[0m", "정답!")
    result = true
  }

  return result
}

function reset() {
  prevInputList = []
  playCount = 0
  answer = getRandomNumber(MIN_NUMBER, MAX_NUMBER)
}

async function isRestart() {
  const answer = await readLineAsync(PRINT.reStart)

  if (answer === "yes") {
    reset()
    play()
    return
  }

  console.log(PRINT.end)
}

play()

import { readLineAsync, getRandomNumber } from "./utils"
import { PRINT, invalidNumberMessage } from "./index.constants"
import NumberTypeError from "./utils/error"

const state = {
  prevInputList: [],
  count: 0,
  answer: getRandomNumber(this.min, this.max),
  min: 0,
  max: 0,
  availableAttempts: 0,
}

async function play() {
  if (isFirstGame(playState.count)) {
    console.log(PRINT.init)
  }

  if (isExceedCount(playState.count)) {
    console.log(PRINT.excced(playState.answer))
    handleGameRestart()
    return
  }

  return

  const inputValue = await readLineAsync(PRINT.input)

  if (!userInputValidation(inputValue)) {
    console.error(PRINT.userInputError)
    play()
    return
  }

  const isValid = validateUserInput(Number(inputValue), playState.answer)

  if (isValid) {
    console.log(PRINT.answer(playState.count))
    handleGameRestart()
    return
  }

  playState.prevInputList.push(Number(inputValue))
  console.log(PRINT.prevGuess(playState.prevInputList))

  playState.count++

  play()
}

/** ========================================================================
 * !                           Helper Function
 *========================================================================* */
function isFirstGame(runCount) {
  if (typeof runCount !== "number") {
    throw new NumberTypeError(invalidNumberMessage)
  }

  return runCount === 0
}

function isExceedCount(runCount) {
  if (typeof runCount !== "number") {
    throw new NumberTypeError(invalidNumberMessage)
  }

  return runCount >= LIMIT_COUNT
}

function userInputValidation(value) {
  if (typeof value !== "number") {
    throw new Error(invalidNumberMessage)
  }

  return value >= MIN_NUMBER && value <= MAX_NUMBER
}

function validateUserInput(userInputValue, correctAnswer) {
  if (userInputValue > correctAnswer) {
    console.log(PRINT.validateResult.down)
    return false
  }

  if (userInputValue < correctAnswer) {
    console.log(PRINT.validateResult.up)
    return false
  }

  if (userInputValue === correctAnswer) {
    console.log(PRINT.validateResult.answer)
    return true
  }

  return false
}

function resetGameSettings() {
  playState.prevInputList = []
  playState.count = 0
  playState.answer = getRandomNumber(MIN_NUMBER, MAX_NUMBER)
}

async function handleGameRestart() {
  const isRestart = (await readLineAsync(PRINT.restart)) === "yes"

  if (!isRestart) {
    console.log(PRINT.end)
    return
  }

  resetGameSettings()
  play()
}

play()

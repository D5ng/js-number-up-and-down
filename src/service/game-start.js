import { invalidNumberMessage, PRINT } from "../index.constants"
import { state } from "../model"
import { readLineAsync, NumberTypeError } from "../utils"

export async function start() {
  // Todo: 게임을 처음 시작할 때
  if (isFirstGame(state.count)) {
    console.log(PRINT.play.start(state.min, state.max))
  }

  // Todo: 진행 가능 횟수를 초과했을 때
  if (state.count >= state.limitCount) {
    console.log(PRINT.play.excced(state.answer, state.limitCount))
    await handleGameRestart()
    return
  }

  // Todo: 사용자한테 값을 입력 받음.
  const inputValue = await readLineAsync(PRINT.input)
  const parsedInputValue = Number(inputValue)

  // Todo: 사용자가 입력한 값의 범위가 벗어났을 때
  if (!userInputValidation(parsedInputValue)) {
    console.error(PRINT.userInputError)
    start()
    return
  }

  const isValid = validateUserInput(parsedInputValue, state.answer)

  if (isValid) {
    console.log(PRINT.play.answer(state.count))
    await handleGameRestart()
    return
  }

  state.prevInputList.push(Number(inputValue))
  console.log(PRINT.play.prevGuess(state.prevInputList))

  state.count++

  start()
}

function isFirstGame(runCount) {
  if (typeof runCount !== "number") {
    throw new NumberTypeError(invalidNumberMessage)
  }

  return runCount === 0
}

function userInputValidation(value) {
  if (typeof value !== "number") {
    throw new Error(invalidNumberMessage)
  }

  return value >= state.min && value <= state.max
}

function validateUserInput(userInputValue, correctAnswer) {
  if (userInputValue > correctAnswer) {
    console.log(PRINT.play.validateResult.down)
    return false
  }

  if (userInputValue < correctAnswer) {
    console.log(PRINT.play.validateResult.up)
    return false
  }

  if (userInputValue === correctAnswer) {
    console.log(PRINT.play.validateResult.answer)
    return true
  }

  return false
}

function resetGameSettings() {
  state.prevInputList = []
  state.count = 0
  state.answer = 0
}

async function handleGameRestart() {
  const isRestart = (await readLineAsync(PRINT.play.restart)) === "yes"

  if (!isRestart) {
    console.log(PRINT.play.end)
    return
  }

  resetGameSettings()
}

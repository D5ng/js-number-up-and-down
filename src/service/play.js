import { invalidNumberMessage, PRINT } from "../index.constants"
import { setState, state } from "../model"
import { readLineAsync, NumberTypeError } from "../utils"

export async function play() {
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
  const userInputValue = await promptUserInput()

  // Todo: 사용자가 입력한 값의 범위가 벗어났을 때
  if (!validateRange(userInputValue)) {
    console.error(PRINT.userInputError)
    return
  }

  // Todo: 입력한 값에 대한 결과를 반환
  const resultType = validateAnswer(userInputValue, state.answer)
  console.log(PRINT.play.validateResult[resultType])

  // Todo: 결과가 true라면 ~
  if (resultType === "answer") {
    console.log(PRINT.play.answer(state.count))
    await handleGameRestart()
    return
  }

  // Todo: 이전에 입력한 값들을 출력
  const updatePrevGuess = [...state.prevInputList, Number(userInputValue)]
  setState({ prevInputList: updatePrevGuess })
  console.log(PRINT.play.prevGuess(state.prevInputList))

  state.count++
}

export async function promptUserInput() {
  const inputValue = Number(await readLineAsync(PRINT.input))

  if (typeof inputValue !== "number") {
    throw new Error("반드시 숫자로 입력해주세요!")
  }

  return inputValue
}

export function isFirstGame(runCount) {
  if (typeof runCount !== "number") {
    throw new NumberTypeError(invalidNumberMessage)
  }

  return runCount === 0
}

export function validateRange(value) {
  if (typeof value !== "number") {
    throw new Error(invalidNumberMessage)
  }

  return value >= state.min && value <= state.max
}

export function validateAnswer(userInputValue, correctAnswer) {
  if (userInputValue > correctAnswer) {
    return "down"
  }

  if (userInputValue < correctAnswer) {
    return "up"
  }

  if (userInputValue === correctAnswer) {
    return "answer"
  }

  return null
}

function resetGameSettings() {
  setState({ prevInputList: [], count: 0, answer: null })
}

export async function handleGameRestart() {
  const isRestart = (await readLineAsync(PRINT.play.restart)) === "yes"

  if (!isRestart) {
    console.log(PRINT.play.end)
    return
  }

  resetGameSettings()
}

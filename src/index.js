/* eslint-disable no-restricted-syntax */
/* eslint-disable no-continue */

import { readLineAsync, getRandomNumber } from "./utils"
import { PRINT, invalidNumberMessage } from "./index.constants"
import NumberTypeError from "./utils/error"

const { state, setState } = (() => {
  const state = {
    prevInputList: [],
    count: 0,
    answer: 0,
    min: 0,
    max: 0,
    limitCount: 0,
  }

  return {
    get state() {
      return { ...state }
    },

    setState(newState) {
      if (typeof newState !== "object" || newState === null) {
        return
      }

      for (const key in state) {
        if (!(key in newState)) {
          continue
        }

        state[key] = newState[key]
      }
    },
  }
})()

/**
 * 업앤다운
 * 1. 게임 설정
 *  1-1 게임을 진행할 때 필요한 최소값, 최대값 설정
 *  1-2 게임 진행 횟수를 설정
 * 2. 게임 진행
 */

async function play() {
  // Todo: 게임을 시작하면 최소 값, 최대 값을 유저에게 물어본다.
  await promptValueRange((range) => {
    const [min, max] = range
    const answer = getRandomNumber(min, max)
    setState({ min, max, answer })
  })

  // Todo: 진행 가능 횟수를 유저에게 물어본다.
  const limitCount = await promptAvailableAttempts()
  state.limitCount = limitCount

  // Todo: 게임을 처음 시작할 때
  if (isFirstGame(state.count)) {
    console.log(PRINT.play.start(state.min, state.max))
  }

  async function start() {
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
      play()
      return
    }

    const isValid = validateUserInput(parsedInputValue, state.answer)

    if (isValid) {
      console.log(PRINT.answer(state.count))
      await handleGameRestart()
      return
    }

    state.prevInputList.push(Number(inputValue))
    console.log(PRINT.play.prevGuess(state.prevInputList))

    state.count++

    start()
  }
  start()
}

/** ========================================================================
 * !                           Helper Function
 *========================================================================* */

async function promptValueRange(callback) {
  console.log(PRINT.settings.minAndMax)
  const valueRange = await readLineAsync(PRINT.input)
  const transformedValueRange = valueRange
    .split(",")
    .map((value) => Number(value.trim()))
    .sort((a, b) => a - b)

  if (transformedValueRange.length !== 2) {
    throw new Error("최소값과 최대값을 입력해주세요. 예(1, 50)")
  }

  if (Number.isNaN(transformedValueRange[0]) || Number.isNaN(transformedValueRange[1])) {
    throw new NumberTypeError(invalidNumberMessage)
  }

  callback(transformedValueRange)
}

async function promptAvailableAttempts() {
  console.log(PRINT.settings.availableAttempts)
  const limitCount = await readLineAsync(PRINT.input)
  const parsedNumber = Number(limitCount)

  if (Number.isNaN(parsedNumber)) {
    throw new NumberTypeError(invalidNumberMessage)
  }

  return parsedNumber
}

function isFirstGame(runCount) {
  if (typeof runCount !== "number") {
    throw new NumberTypeError(invalidNumberMessage)
  }

  return runCount === 0
}

// function isExceedCount(runCount) {
//   if (typeof runCount !== "number") {
//     throw new NumberTypeError(invalidNumberMessage)
//   }

//   return runCount >= state.availableAttempts
// }

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

play()

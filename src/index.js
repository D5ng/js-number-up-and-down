import { readLineAsync } from "./utils/readLine.util"
import { getRandomNumber } from "./index.util"
import { MAX_NUMBER, MIN_NUMBER, LIMIT_COUNT } from "./index.constants"

let prevInputList = []
let playCount = 0
let answer = getRandomNumber(1, 50)

async function play() {
  if (isInitialStart(playCount)) {
    console.log(`컴퓨터가 1~50 사이의 숫자를 선택했습니다. 숫자를 맞춰보세요.`)
  }

  if (isExceedCount(playCount)) {
    console.log(`\x1b[1m\x1b[31m${`5회 초과! 숫자를 맞추지 못했습니다. (정답: ${answer})`}\x1b[0m`)
    isRestart()
    return
  }

  playCount++

  const inputValue = await readLineAsync(`\x1b[1m\x1b[96m숫자 입력: \x1b[0m`)

  if (!userInputValidation(inputValue)) {
    throw new Error(`\x1b[31m${"숫자는 1~50 사이로 입력해주세요."}\x1b[0m`)
  }

  const isValid = validateUserInput(Number(inputValue), answer)

  if (isValid) {
    console.log(`\x1b[1m\x1b[32m${`축하합니다! ${playCount}번 만에 숫자를 맞추셨습니다.`}\x1b[0m`)
    isRestart()
    return
  }

  prevInputList.push(Number(inputValue))
  console.log(`\x1b[93m${`이전 추측: ${prevInputList.join(", ")} \n`}\x1b[0m`)
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
  const answer = await readLineAsync(`\x1b[1m\x1b[96m게임을 다시 시작하시겠습니까? (yes/no): \x1b[0m`)

  if (answer === "yes") {
    reset()
    play()
    return
  }

  console.log(`\x1b[1m\x1b[96m게임을 종료합니다.\x1b[0m`)
}

play()

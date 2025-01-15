export const MAX_NUMBER = 50
export const MIN_NUMBER = 1
export const LIMIT_COUNT = 5

export const PRINT = Object.freeze({
  init: `컴퓨터가 1~50 사이의 숫자를 선택했습니다. 숫자를 맞춰보세요.`,
  userInputError: `\x1b[31m${"숫자는 1~50 사이로 입력해주세요."}\x1b[0m`,
  input: `\x1b[1m\x1b[96m숫자 입력: \x1b[0m`,
  reStart: `\x1b[1m\x1b[96m게임을 다시 시작하시겠습니까? (yes/no): \x1b[0m`,
  end: `\x1b[1m\x1b[96m게임을 종료합니다.\x1b[0m`,
  answer: (playCount) => `\x1b[1m\x1b[32m${`축하합니다! ${playCount}번 만에 숫자를 맞추셨습니다.`}\x1b[0m`,
  prevGuess: (prevInputList) => `\x1b[93m${`이전 추측: ${prevInputList.join(", ")} \n`}\x1b[0m`,
  excced: (answer) => `\x1b[1m\x1b[31m${`5회 초과! 숫자를 맞추지 못했습니다. (정답: ${answer})`}\x1b[0m`,
})

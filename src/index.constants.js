/**
 * 게임 상태
 */
export const MAX_NUMBER = 50
export const MIN_NUMBER = 1
export const LIMIT_COUNT = 5

/**
 * 프린터 색상 강조
 */
const PRINT_COLOR = {
  purple: (text) => `\x1b[1m\x1b[95m${text}\x1b[0m`,
  yellow: (text) => `\x1b[93m${text}\x1b[0m`,
  sky: (text) => `\x1b[1m\x1b[96m${text}\x1b[0m`,
  red: (text) => `\x1b[1m\x1b[31m${text}\x1b[0m`,
  green: (text) => `\x1b[1m\x1b[32m${text}\x1b[0m`,
}

/**
 * 프린터 출력 함수
 */
export const PRINT = Object.freeze({
  init: `컴퓨터가 1~50 사이의 숫자를 선택했습니다. 숫자를 맞춰보세요.`,
  userInputError: PRINT_COLOR.red("숫자는 1~50 사이로 입력해주세요."),
  input: PRINT_COLOR.sky("숫자 입력: "),
  restart: PRINT_COLOR.sky("게임을 다시 시작하시겠습니까? (yes/no):"),
  validateResult: {
    down: PRINT_COLOR.purple("다운"),
    up: PRINT_COLOR.purple("업"),
    answer: PRINT_COLOR.purple("정답!"),
  },
  end: PRINT_COLOR.sky("게임을 종료합니다."),
  answer: (playCount) => PRINT_COLOR.green(`축하합니다! ${playCount}번 만에 숫자를 맞추셨습니다.`),
  prevGuess: (prevInputList) => PRINT_COLOR.yellow(`이전 추측: ${prevInputList.join(", ")}`),
  excced: (answer) => PRINT_COLOR.red(`5회 초과! 숫자를 맞추지 못했습니다. (정답: ${answer})`),
})

export const invalidNumberMessage = "반드시 숫자를 입력해주세요!"

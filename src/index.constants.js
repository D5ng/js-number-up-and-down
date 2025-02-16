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
  settings: {
    minAndMax: `[게임 설정] 게임 시작을 위해 최소 값, 최대 값을 입력해주세요. (예: 1, 50)`,
    availableAttempts: `[게임 설정] 게임 시작을 위해 진행 가능 횟수를 입력해주세요.`,
  },
  play: {
    restart: PRINT_COLOR.sky("게임을 다시 시작하시겠습니까? (yes/no):"),
    validateResult: {
      down: PRINT_COLOR.purple("다운"),
      up: PRINT_COLOR.purple("업"),
      answer: PRINT_COLOR.purple("정답!"),
    },
    end: PRINT_COLOR.sky("게임을 종료합니다."),
    start: (min, max) => `[게임 시작] ${min}~${max} 사이의 숫자를 선택했습니다. 숫자를 맞춰보세요.`,
    userInputError: (min, max) => PRINT_COLOR.red(`숫자는 ${min}~${max} 사이로 입력해주세요.`),
    answer: (playCount) => PRINT_COLOR.green(`축하합니다! ${playCount}번 만에 숫자를 맞추셨습니다.`),
    prevGuess: (prevInputList) => PRINT_COLOR.yellow(`이전 추측: ${prevInputList.join(", ")}`),
    excced: (answer, limitCount) =>
      PRINT_COLOR.red(`${limitCount}회 초과! 숫자를 맞추지 못했습니다. (정답: ${answer})`),
  },
  input: PRINT_COLOR.sky("숫자 입력: "),
})

export const invalidNumberMessage = "반드시 숫자를 입력해주세요!"

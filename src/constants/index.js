import { logThemes } from "../utils"

const validateResult = Object.freeze({
  down: logThemes.hint("다운"),
  up: logThemes.hint("업"),
  answer: logThemes.hint("정답!"),
})

const prompt = Object.freeze({
  range: logThemes.prompt(`[게임 설정] 게임 시작을 위해 최소 값, 최대 값을 입력해주세요. (예: 1, 50)`),
  availableAttempts: logThemes.prompt(`[게임 설정] 게임 시작을 위해 진행 가능 횟수를 입력해주세요.`),
  end: logThemes.prompt("게임을 종료합니다."),
  restart: logThemes.prompt("게임을 다시 시작하시겠습니까? (yes/no):"),
  start: (min, max) => logThemes.prompt(`[게임 시작] ${min}~${max} 사이의 숫자를 선택했습니다. 숫자를 맞춰보세요.`),
})

export const PRINT = Object.freeze({
  prompt: prompt,
  validateResult: validateResult,
  input: logThemes.primary("숫자 입력: "),
  victory: (playCount) => logThemes.victory(`축하합니다! ${playCount}번 만에 숫자를 맞추셨습니다.`),
  userInputError: (min, max) => logThemes.error(`숫자는 ${min}~${max} 사이로 입력해주세요.`),
  prevGuess: (prevInputList) => logThemes.hint(`이전 추측: ${prevInputList.join(", ")}`),
  excced: (answer, limitCount) => logThemes.error(`${limitCount}회 초과! 숫자를 맞추지 못했습니다. (정답: ${answer})`),
  error: (message) => logThemes.error(message),
})

/**
 * 게임에서 사용되는 최대 숫자
 * @constant
 */
export const MAX_NUMBER = 50

/**
 * 게임에서 사용되는 최소 숫자
 * @constant
 */
export const MIN_NUMBER = 1

/**
 * 숫자 추측 가능 횟수 제한
 * @constant
 */
export const LIMIT_COUNT = 5

/**
 * 게임에서 출력되는 메시지 상수 모음
 * @constant
 */
export const PRINT = Object.freeze({
  /**
   * 게임 시작 메세지
   * @type {string}
   */
  init: `컴퓨터가 1~50 사이의 숫자를 선택했습니다. 숫자를 맞춰보세요.`,

  /**
   * 사용자가 잘못된 숫자를 입력했을 때 표시되는 에러 메시지
   * @type {string}
   */
  userInputError: `\x1b[31m${"숫자는 1~50 사이로 입력해주세요."}\x1b[0m`,

  /**
   * 사용자 입력 프롬프트 메시지
   * @type {string}
   */
  input: `\x1b[1m\x1b[96m숫자 입력: \x1b[0m`,

  /**
   * 게임 재시작 여부를 묻는 메시지
   * @type {string}
   */
  reStart: `\x1b[1m\x1b[96m게임을 다시 시작하시겠습니까? (yes/no): \x1b[0m`,

  /**
   * 게임 종료 메시지
   * @type {string}
   */
  end: `\x1b[1m\x1b[96m게임을 종료합니다.\x1b[0m`,

  /**
   * 정답 메시지 생성 함수
   * @param {number} playCount - 사용자가 정답을 맞추는 데 걸린 시도 횟수
   * @returns {string} 축하 메시지
   */
  answer: (playCount) => `\x1b[1m\x1b[32m${`축하합니다! ${playCount}번 만에 숫자를 맞추셨습니다.`}\x1b[0m`,

  /**
   * 이전 추측 목록 메시지 생성 함수
   * @param {number[]} prevInputList - 사용자가 입력한 이전 숫자 목록
   * @returns {string} 이전 추측 메시지
   */
  prevGuess: (prevInputList) => `\x1b[93m${`이전 추측: ${prevInputList.join(", ")} \n`}\x1b[0m`,

  /**
   * 제한 횟수를 초과했을 때의 메시지 생성 함수
   * @param {number} answer - 정답 숫자
   * @returns {string} 실패 메시지
   */
  excced: (answer) => `\x1b[1m\x1b[31m${`5회 초과! 숫자를 맞추지 못했습니다. (정답: ${answer})`}\x1b[0m`,
})

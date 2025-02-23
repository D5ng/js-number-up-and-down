/**
 * 콘솔 로그 테마 객체 (ANSI 색상 적용)
 * @typedef {Object} LogThemes
 * @property {(text: string) => string} primary - 노란색
 * @property {(text: string) => string} prompt - 가이드 메세지(하늘색)
 * @property {(text: string) => string} error - 에러 발생(빨간색)
 * @property {(text: string) => string} hint - 힌트(보라색)
 * @property {(text: string) => string} success - 성공(초록색)
 */

/**
 * 콘솔 로그 테마 (색상)
 * @type {LogThemes}
 */
export const logThemes = Object.freeze({
  primary: (text) => `\x1b[93m${text}\x1b[0m`, // 노란색
  prompt: (text) => `\x1b[1m\x1b[96m${text}\x1b[0m`, // 하늘색
  error: (text) => `\x1b[1m\x1b[31m${text}\x1b[0m`, // 레드
  hint: (text) => `\x1b[1m\x1b[95m${text}\x1b[0m`, // 보라색
  victory: (text) => `\x1b[1m\x1b[32m${text}\x1b[0m`, // 초록색
})

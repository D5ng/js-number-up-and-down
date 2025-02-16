/**
 * @param {number} min 최소값
 * @param {number} max 최대값
 * @returns
 */
export function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

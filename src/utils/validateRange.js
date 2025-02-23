/**
 * 게임의 최소값 최대값 범위 내에 있는지 검증하는 함수
 * @param {*} inputValue 유저가 입력한 값
 * @param {*} min 게임의 최소값
 * @param {*} max 게임의 최대값
 * @returns { Boolean | Error }
 */

export function validateRange(value, min, max) {
  if (typeof value !== "number" || Number.isNaN(value)) {
    throw new Error("값을 숫자로 입력해주세요!")
  }

  if (min === undefined) {
    throw new Error("최소값을 입력해주세요.")
  }

  if (max === undefined) {
    throw new Error("최대값을 입력해주세요.")
  }

  return value >= min && value <= max
}

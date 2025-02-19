import { PRINT } from "../App.constants"
import { readLineAsync } from "../utils"
import { state } from "../model"

export async function promptUserInput() {
  const inputValue = Number(await readLineAsync(PRINT.input))

  if (Number.isNaN(inputValue)) {
    throw new Error("숫자로 입력해주세요!")
  }

  if (!validateRange(inputValue, state)) {
    throw new Error(PRINT.userInputError)
  }

  return inputValue
}

function validateRange(value, range) {
  if (typeof value !== "number") {
    throw new Error("값을 숫자로 입력해주세요!")
  }

  if (range.min === undefined || range.max === undefined) {
    throw new Error("최소값과 최대값을 입력해주세요.")
  }

  return value >= range.min && value <= range.max
}

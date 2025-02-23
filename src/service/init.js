import { PRINT } from "../constants"
import { setState } from "../model"
import { generateRandomNumber, logThemes, readLineAsync } from "../utils"

export async function init() {
  const [min, max] = await promptValueRange()
  const limitCount = await promptAvailableAttempts()
  const answer = generateRandomNumber(min, max)
  setState((state) => ({ ...state, min, max, answer, limitCount }))
}

async function promptValueRange() {
  while (true) {
    try {
      console.log(PRINT.prompt.range)
      const valueRange = await readLineAsync(PRINT.input)
      const transformedValueRange = valueRange
        .split(",")
        .map((value) => Number(value.trim()))
        .sort((a, b) => a - b)

      if (transformedValueRange.length !== 2) {
        throw new Error("잘못 입력했어요. 최소값과 최대값을 입력해주세요. 예(1, 50)")
      }

      if (Number.isNaN(transformedValueRange[0]) || Number.isNaN(transformedValueRange[1])) {
        throw new Error("최소값과 최대값은 숫자로 입력해주세요.")
      }

      return [transformedValueRange[0], transformedValueRange[1]]
    } catch (error) {
      console.log(PRINT.error(error.message))
    }
  }
}

async function promptAvailableAttempts() {
  while (true) {
    try {
      console.log(PRINT.prompt.availableAttempts)
      const availableAttempts = Number(await readLineAsync(PRINT.input))

      if (Number.isNaN(availableAttempts)) {
        throw new Error("반드시 숫자로 입력해주세요!")
      }

      return availableAttempts
    } catch (error) {
      console.log(logThemes.error(error.message))
    }
  }
}

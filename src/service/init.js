import { PRINT } from "../index.constants"
import { setState } from "../model"
import { generateRandomNumber, readLineAsync } from "../utils"

export async function init() {
  try {
    const [min, max] = await promptValueRange()
    const limitCount = await promptAvailableAttempts()
    const answer = generateRandomNumber(min, max)
    setState({ min, max, answer, limitCount })
  } catch (error) {
    console.log(error.message)
  }
}

async function promptValueRange() {
  console.log(PRINT.settings.minAndMax)
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
}

async function promptAvailableAttempts() {
  console.log(PRINT.settings.availableAttempts)
  const availableAttempts = Number(await readLineAsync(PRINT.input))

  if (Number.isNaN(availableAttempts)) {
    throw new Error("반드시 숫자로 입력해주세요!")
  }

  return availableAttempts
}

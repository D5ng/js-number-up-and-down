import { invalidNumberMessage, PRINT } from "../index.constants"
import { setState } from "../model"
import { getRandomNumber, readLineAsync, NumberTypeError } from "../utils"

export async function setting() {
  try {
    const [min, max] = await promptValueRange()
    const answer = getRandomNumber(min, max)
    setState({ min, max, answer })
  } catch (error) {
    console.log(error)
    throw new Error("최소값, 최대값을 설정하는데 에러가 발생했어요.")
  }

  try {
    const limitCount = await promptAvailableAttempts()
    setState({ limitCount })
  } catch (error) {
    throw new Error("진행 가능 횟수를 설정하는데 에러가 발생했어요.")
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
    throw new Error("최소값과 최대값을 입력해주세요. 예(1, 50)")
  }

  if (Number.isNaN(transformedValueRange[0]) || Number.isNaN(transformedValueRange[1])) {
    throw new NumberTypeError(invalidNumberMessage)
  }

  return [transformedValueRange[0], transformedValueRange[1]]
}

async function promptAvailableAttempts() {
  console.log(PRINT.settings.availableAttempts)
  const limitCount = await readLineAsync(PRINT.input)
  const parsedNumber = Number(limitCount)

  if (Number.isNaN(parsedNumber)) {
    throw new NumberTypeError(invalidNumberMessage)
  }

  return parsedNumber
}

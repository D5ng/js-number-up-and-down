import { PRINT } from "../constants"
import { readLineAsync, validateRange } from "../utils"

export async function promptUserInput(min, max) {
  while (true) {
    try {
      const inputValue = Number(await readLineAsync(PRINT.input))
      const isValid = validateRange(inputValue, min, max)

      if (!isValid) {
        throw new Error(PRINT.userInputError(min, max))
      }

      return inputValue
    } catch (error) {
      console.log(PRINT.error(error.message))
    }
  }
}

import { PRINT } from "../App.constants"
import { setState } from "../model"
import { readLineAsync } from "../utils"

export async function handleGameRestart(func) {
  const result = (await readLineAsync(PRINT.play.restart)) === "yes"

  if (!result) {
    console.log(PRINT.play.end)
    return
  }

  setState({ prevInputList: [], count: 0, answer: null })
  func()
}

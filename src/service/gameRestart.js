import { PRINT } from "../constants"
import { setState } from "../model"
import { readLineAsync } from "../utils"

/**
 * 게임 재시작
 * @param { Function } func 게임을 다시 시작할 함수
 * @returns { Promise<void> }
 */

export async function handleGameRestart(func) {
  const result = await readLineAsync(PRINT.prompt.restart)

  if (result.toLowerCase() !== "yes") {
    console.log(PRINT.prompt.end)
    return
  }

  setState({ prevInputList: [], count: 0, answer: null })
  func()
}

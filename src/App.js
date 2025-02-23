/* eslint-disable no-await-in-loop */
import { PRINT } from "./constants"
import { getState, setState } from "./model"
import { init, promptUserInput, handleGameRestart } from "./service"
import { isGameOver, validateAnswer } from "./utils"

async function App() {
  await init()
  const { min, max } = getState()
  console.log(PRINT.prompt.start(min, max))

  while (true) {
    try {
      const { count, limitCount, answer, min, max, prevInputList } = getState()

      if (isGameOver(count, limitCount)) {
        console.log(PRINT.excced(answer, limitCount))
        await handleGameRestart(App)
        return
      }

      const userInputValue = await promptUserInput(min, max)

      const answerStatus = validateAnswer(userInputValue, answer)
      console.log(PRINT.validateResult[answerStatus.type])

      if (answerStatus.result) {
        console.log(PRINT.victory(count))
        await handleGameRestart(App)
        return
      }

      const updateState = [...getState().prevInputList, userInputValue]

      setState((state) => ({
        ...state,
        count: count + 1,
        prevInputList: updateState,
      }))

      console.log(PRINT.prevGuess(updateState))
    } catch (error) {
      console.log(error)
      console.log("프로그램의 치명적인 오류가 발생했어요 🙏🙏🙏")
      return
    }
  }
}

App()

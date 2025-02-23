/* eslint-disable no-await-in-loop */
import { PRINT } from "./constants"
import { state, setState } from "./model"
import { init, promptUserInput, handleGameRestart } from "./service"
import { isGameOver, validateAnswer } from "./utils"

async function App(initialState) {
  await init()
  console.log(PRINT.prompt.start(initialState.min, initialState.max))

  while (true) {
    try {
      const { count, limitCount, answer, min, max } = initialState

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

      setState({
        count: count + 1,
        prevInputList: [...initialState.prevInputList, userInputValue],
      })

      console.log(PRINT.prevGuess(initialState.prevInputList))
    } catch (error) {
      console.log("프로그램의 치명적인 오류가 발생했어요 🙏🙏🙏")
      return
    }
  }
}

App(state)

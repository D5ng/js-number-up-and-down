/* eslint-disable no-await-in-loop */
import { PRINT } from "./App.constants"
import { state } from "./model"
import { init, gameResult, promptUserInput, handleGameRestart } from "./service"

async function App() {
  await init()
  console.log(PRINT.play.start(state.min, state.max))

  while (true) {
    if (state.count >= state.limitCount) {
      console.log(PRINT.play.excced(state.answer, state.limitCount))
      await handleGameRestart(App)
      return
    }

    const userInputValue = await promptUserInput()

    gameResult({ userInputValue, state }, async () => {
      await handleGameRestart(App)
    })
  }
}

App()

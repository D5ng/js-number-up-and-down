/* eslint-disable no-await-in-loop */
import { PRINT } from "./App.constants"
import { state } from "./model"
import { init, gameResult, promptUserInput, handleGameRestart, gameOver } from "./service"
import { isGameOver } from "./utils"

async function App() {
  await init()
  console.log(PRINT.play.start(state.min, state.max))

  while (true) {
    if (isGameOver(state.count, state.limitCount)) {
      gameOver(state.answer, state.limitCount, async () => {
        await handleGameRestart(App)
      })
      return
    }

    const userInputValue = await promptUserInput()

    gameResult({ userInputValue, state }, async () => {
      await handleGameRestart(App)
    })
  }
}

App()

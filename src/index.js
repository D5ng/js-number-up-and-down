/* eslint-disable no-await-in-loop */
import { init } from "./service/init"
import { play } from "./service/play"

async function App() {
  await init()

  while (true) {
    await play()
  }
}

App()

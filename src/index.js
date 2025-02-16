import { setting } from "./service/game-setting"
import { start } from "./service/game-start"

async function App() {
  await setting()
  await start()
}

App()

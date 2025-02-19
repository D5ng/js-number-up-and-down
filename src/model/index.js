import { useState } from "../utils"

const initialState = {
  prevInputList: [],
  count: 0,
  answer: 0,
  min: 0,
  max: 0,
  limitCount: 0,
}

const [state, setState] = useState(initialState)

export { state, setState }

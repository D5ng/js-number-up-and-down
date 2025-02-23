import { useState } from "../utils"

export const { state, setState } = (() => {
  const initialState = {
    prevInputList: [],
    count: 0,
    answer: 0,
    min: 0,
    max: 0,
    limitCount: 0,
  }

  const [state, setState] = useState(initialState)
  return { state, setState }
})()

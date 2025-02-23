import { useState } from "../utils"

export const { getState, setState } = (() => {
  const initialState = {
    prevInputList: [],
    count: 0,
    answer: 0,
    min: 0,
    max: 0,
    limitCount: 0,
  }

  const [getState, setState] = useState(initialState)
  return { getState, setState }
})()

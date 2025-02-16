/* eslint-disable no-underscore-dangle */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-continue */

const useState = (() => {
  let _state

  const useState = (initialState) => {
    if (_state === undefined) {
      _state = initialState
    }

    const state = _state

    const setState = (newState) => {
      if (typeof newState !== "object" || newState === null) {
        return
      }

      for (const key in state) {
        if (!(key in newState)) {
          continue
        }

        _state[key] = newState[key]
      }
    }

    return [state, setState]
  }

  return useState
})()

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

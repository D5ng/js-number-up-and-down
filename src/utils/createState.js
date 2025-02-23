const useState = (() => {
  const states = []
  let currentStateId = 0

  const useState = (initialState) => {
    if (typeof initialState !== "object" || initialState === null) {
      throw new Error("initialState는 객체여야만 합니다!")
    }

    const index = currentStateId

    const getState = () => states[index] ?? initialState

    const setState = (newState) => {
      if ((typeof newState !== "object" && typeof newState !== "function") || newState === null) {
        return
      }

      if (typeof newState === "function") {
        const updateState = newState(getState())
        states[index] = updateState
        return
      }

      const updateState = Array.isArray(newState)
        ? [...newState]
        : Object.keys(newState).reduce((obj, key) => {
            obj[key] = key in getState() ? newState[key] : state[key]
            return obj
          }, {})

      states[index] = updateState
    }

    currentStateId++

    return [getState, setState]
  }

  return useState
})()

export { useState }

/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-continue */

const useState = (() => {
  const states = []
  let currentStateId = 0

  const useState = (initialState) => {
    if (typeof initialState !== "object" || initialState === null) {
      throw new Error("initialState는 객체여야만 합니다!")
    }

    const state = states[currentStateId] ?? initialState

    const setState = (newState) => {
      if (typeof newState !== "object" || newState === null) {
        return
      }

      for (const key in state) {
        if (!(key in newState)) {
          continue
        }

        state[key] = newState[key]
      }
    }

    currentStateId++

    return [state, setState]
  }

  return useState
})()

export { useState }

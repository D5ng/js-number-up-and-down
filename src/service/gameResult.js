import { PRINT } from "../App.constants"
import { setState } from "../model"

export function gameResult({ userInputValue, state }, callback) {
  const answerStatus = validateAnswer(userInputValue, state.answer)
  console.log(PRINT.play.validateResult[answerStatus.type])

  // Todo: 결과가 true라면 ~
  if (answerStatus.result) {
    console.log(PRINT.play.answer(state.count))
    callback()
  } else {
    // Todo: 이전에 입력한 값들을 출력
    const updatePrevGuess = [...state.prevInputList, Number(userInputValue)]
    console.log(PRINT.play.prevGuess(updatePrevGuess))
    setState({ prevInputList: updatePrevGuess, count: state.count + 1 })
  }
}

function validateAnswer(userInputValue, correctAnswer) {
  if (userInputValue > correctAnswer) {
    return {
      result: false,
      type: "down",
    }
  }

  if (userInputValue < correctAnswer) {
    return {
      result: false,
      type: "up",
    }
  }

  if (userInputValue === correctAnswer) {
    return {
      result: true,
      type: "answer",
    }
  }

  return {
    result: false,
    type: null,
  }
}

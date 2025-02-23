/**
 * 유저가 입력한 값을 검증하는 함수
 * @param {*} userInputValue 유저가 입력한 값
 * @param {*} correctAnswer 게임 정답
 * @returns
 */
export function validateAnswer(userInputValue, correctAnswer) {
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

  return {
    result: true,
    type: "answer",
  }
}

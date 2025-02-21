import { PRINT } from "../App.constants"

/**
 * 진행 가능 횟수 초과로 인한 게임 종료
 * @param {*} answer 정답
 * @param {*} limitCount 진행 가능 횟수
 * @param {*} callback 게임 오버 메세지 출력 후 실행될 함수
 */
export function gameOver(answer, limitCount, callback) {
  console.log(PRINT.play.excced(answer, limitCount))
  callback()
}

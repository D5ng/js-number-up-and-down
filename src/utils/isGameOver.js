/**
 * 게임 종료 여부 (진행 가능 횟수가 초과되었는지 확인하는 함수)
 * @param { Object } params 객체
 * @param { number } params.count count 현재 진행 횟수
 * @param { number } params.limitCount 진행 가능 횟수
 * @return { boolean }
 */
export function isGameOver({ count, limitCount }) {
  return count >= limitCount
}

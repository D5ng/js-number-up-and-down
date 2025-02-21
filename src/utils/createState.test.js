import { useState } from "./createState"

describe("createState", () => {
  test("객체로 초기값을 설정할 때", () => {
    const [state] = useState({ a: 1, b: 2 })
    expect(typeof state).toBe("object")
  })

  test("객체가 아닌 값으로 초기값을 설정할 때", () => {
    const 객체가_아닌_값으로_초기값을_설정한_함수 = () => {
      const [state] = useState(1).toThrow(error)
    }

    expect(() => 객체가_아닌_값으로_초기값을_설정한_함수)
  })

  test("setState로 상태 변경", () => {
    const [state, setState] = useState({ a: 1, b: 2 })
    setState({ a: 10 })
    expect(state.a).toEqual(10)
  })
})

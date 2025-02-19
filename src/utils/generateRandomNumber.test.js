import { generateRandomNumber } from "./generateRandomNumber"

test("생성된 숫자가 min과 max 사이에 있어야 한다", () => {
  const min = 1
  const max = 10

  for (let i = 0; i < 100; i++) {
    const result = generateRandomNumber(min, max)
    expect(result).toBeGreaterThanOrEqual(min)
    expect(result).toBeLessThanOrEqual(max)
  }
})

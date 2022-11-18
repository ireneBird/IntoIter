import { intoIter } from '../../lib'
import { sum } from '../../lib/methods'

describe("Test function SUM", () => {
  it("should return sum of all numeric elements", () => {
    expect([...sum([1, 2, 3])]).toEqual([6])
  })

  it("intoIter func for sync", () => {
    const iter = intoIter([1, 2, 3])
    expect([...iter.sum()]).toEqual([6])
  })
})
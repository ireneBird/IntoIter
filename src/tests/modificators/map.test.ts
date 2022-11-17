import { intoIter } from '../../lib'

describe("Map method", () => {
  it("syncIter class", () => {
    const iter = intoIter([1, 2, 3]);
    expect([...iter.map((el) => el + 1)]).toEqual([2, 3, 4])
  })
})
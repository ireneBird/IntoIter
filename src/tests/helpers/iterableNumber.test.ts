import iterableNumber from '../../lib/helpers/iterableNumber'

describe("iterableNumber", () => {
  it('Should return range of numbers', () => {
    expect([...iterableNumber(5)]).toEqual([1, 2, 3, 4, 5])
    expect([...iterableNumber(10)]).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
  })
})
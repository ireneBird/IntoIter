import { intoIter } from '../../lib'

describe("filter method", () => {

  describe("intoIter func for sync iter", () => {

    it("work with numbers", () => {
      const iter = intoIter([1, 2, 3, 5, 8, 10]);
      expect([...iter.filter((el) => el > 3)]).toEqual([5, 8, 10])
    })

    it("work with string", () => {
      const iter = intoIter('hello everybody');
      expect([...iter.filter((el, i) => i > 5)]).toEqual(["e", "v", "e", "r", "y", "b", "o", "d", "y"])
    })
  })

})
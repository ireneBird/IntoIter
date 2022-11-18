import { intoIter } from '../../lib'

describe("collect method test", () => {
  // it("Should make collection from iterable", () => {
  //   const iter = intoIter(3);
  //   expect([...iter.collect(new Array())]).toEqual([1, 2, 3])
  // })

  it("Work with string", () => {
    const iter = intoIter('art');
    expect([...iter.collect(new Set())]).toEqual([[0, 'a'], [1, 'r'], [2, 't']])
  })
})
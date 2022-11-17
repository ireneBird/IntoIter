import { intoIter, IntoIter } from '../../lib'
import { isIterable } from '../../lib/utils';

describe("flat test", () => {
  it("Shoud return flat obj for intoIter func (sync)", () => {
    const iter = intoIter([1, 2, [3, 4, [5, 6]]]);
    expect([...iter.flat(2)]).toEqual([1, 2, 3, 4, 5, 6]);
  })
})


describe("flatMap test for SyncIter class", () => {
  it("Shoud work with cb", () => {

    const iter = intoIter([1, 2, 3, 4]);
    expect([...iter.flatMap((el) => [el, el])]).toEqual([1, 1, 2, 2, 3, 3, 4, 4]);
  })
})
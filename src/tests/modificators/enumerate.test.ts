import { intoIter } from '../../lib';
import { enumerate } from '../../lib/enumerate';

describe("enumerate function", () => {
  it('should add indexes', () => {
    expect([...enumerate('yah')]).toEqual([[0, 'y'], [1, 'a'], [2, 'h']])
  })

  it("intoIter for sync iter", () => {
    const iter = intoIter('react')
    expect([...iter.enumerate()]).toEqual([[0, 'r'], [1, 'e'], [2, 'a'], [3, 'c'], [4, 't']])
  })
})

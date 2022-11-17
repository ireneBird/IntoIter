
export function take<T>(iterable: Iterable<T>, quantity: number): IterableIterator<T> {
  let cur = 0;
  const iterator = iterable[Symbol.iterator]();
  return {
    [Symbol.iterator](): IterableIterator<T> {
      return this;
    },

    next(): IteratorResult<T> {
      if (quantity === cur++) {
        return { done: true, value: iterator.next() }
      }
      return iterator.next()
    }
  }
}
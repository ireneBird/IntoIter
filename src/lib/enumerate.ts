export function enumerateA<T>(iterable: Iterable<T>): IterableIterator<[number, T]> {
  const iterator = iterable[Symbol.iterator]();
  let i = 0;
  return {
    [Symbol.iterator](): IterableIterator<[number, T]> {
      return this;
    },

    next(): IteratorResult<[number, T]> {
      const el = iterator.next()
      while (!el.done) {
        return { done: false, value: [i++, el.value] }
      }

      return { done: true, value: null }
    }
  }
}

export function* enumerate<T>(iterable: Iterable<T>): Generator<[number, T]> {
  let index = 0;
  for (const el of iterable) {
    yield [index++, el]
  }
}

export async function* asyncEnumerate<T>(iterable: AsyncIterable<T>): AsyncGenerator<[number, T]> {
  let index = 0;
  for await (const el of iterable) {
    yield [index++, el]
  }
}
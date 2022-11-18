export function* filter<T, R>(iterable: Iterable<T>, cb: (el: T, index: number, data: Iterable<T>) => R): Generator<T> {
  let index = 0;
  for (const el of iterable) {
    if (cb(el, index++, iterable)) {
      yield el
    }
  }
}

export async function* asyncFilter<T>(iterable: AsyncIterable<T>, cb: Function): AsyncGenerator<T> {
  let index = 0;
  for await (const el of iterable) {
    if (cb(el, index++, iterable)) {
      yield el;
    }
  }
}

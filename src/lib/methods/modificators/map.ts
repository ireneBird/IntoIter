export function* map<T, R>(
  iterable: Iterable<T>,
  cb: (el: T, i: number, data: Iterable<T>) => R
): Generator<R> {
  let index = 0;
  for (const el of iterable) {
    yield cb(el, index++, iterable);
  }
}

export async function* asyncMap<T, R>(
  iterable: AsyncIterable<T>,
  cb: (el: T, i: number, data: AsyncIterable<T>) => R
): AsyncGenerator<R> {
  let index = 0;
  for await (const el of iterable) {
    yield cb(el, index++, iterable);
  }
}

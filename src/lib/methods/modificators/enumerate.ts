
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
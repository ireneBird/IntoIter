import { cast, isIterable } from '../../utils';


export function* flatMap<T, R>(iterable: Iterable<T>, cb: (el: T, i: number, data: Iterable<T>) => Iterable<R>): Generator<R> {
  let index = 0;
  for (const el of iterable) {
    let res = cb(el, index++, iterable);
    yield* flat(res, 0);
  }
}

export async function* asyncFlatMap<T, R>(iterable: AsyncIterable<T>, cb: Function): AsyncGenerator<R> {
  let index = 0;
  for await (const el of iterable) {
    let res = cb(el, index++, iterable);
    yield* asyncFlat(res, 0);
  }
}

export function* flat<T, R>(iterable: Iterable<T | R>, depth: number = 1): Generator<T | R> {
  for (const el of iterable) {
    if (depth && isIterable(el)) {
      yield* flat(cast(el), depth - 1)
    } else {
      yield el
    }
  }
}

export async function* asyncFlat<T>(iterable: AsyncIterable<T>, depth: number = 1): AsyncGenerator<T> {
  for await (let el of iterable) {
    if (depth > 0 && isIterable(iterable)) {
      yield* asyncFlat(cast(el), depth - 1);
      continue;
    }
    yield el
  }
}

// import { Collectable } from '../../types';

export type Collectable<T> =
  { push(value: T): void } |
  { add(value: T): void } |
  { set(key: number, value: T): void };


export function* collect<T>(iterable: Iterable<T>, collection: Collectable<T>): Generator<T | [PropertyKey, T]> {
  let index = 0;
  switch (collection?.constructor) {
    case Map:
    case Set:
      for (const v of Object.values(iterable))
        yield [index++, v]
      break
    case Array:
      for (const v of Object.values(iterable))
        yield v
      break
    default:
      return;
  }
}

// console.log(...collect('art', new Set()))
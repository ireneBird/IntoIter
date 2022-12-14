import { avg, collect, enumerate, filter, flatten, flatMap, map, max, min, sum, toArray } from './methods';
import { AggregationValue, Collectable } from './types';

interface SyncIterData<T> extends Iterable<T> {
  reverse?: () => SyncIterData<T>
}


export class SyncIter<T>   {
  #data: SyncIterData<T>;

  constructor(data: Iterable<T>) {
    this.#data = data
  }

  [Symbol.iterator]() {
    return this.values();
  }

  values() {
    const iterator = this.#data[Symbol.iterator]();

    return {
      [Symbol.iterator]() {
        return this
      },

      next(): IteratorResult<T> {
        const el = iterator.next()
        if (el.done) {
          return { done: true, value: undefined }
        }

        return { done: false, value: el.value }
      }
    }
  }

  map<R>(cb: (el: T, index: number, data: Iterable<T>) => R): Iterable<R> {
    return map(this.#data, cb);
  }

  flatten(depth: number = 1) {
    return flatten(this.#data, depth);
  }

  flatMap<R>(cb: (el: T, index: number, data: Iterable<T>) => Iterable<R>): Iterable<R> {
    return flatMap(this.#data, cb);
  }

  filter<R>(cb: (el: T, index: number, data: Iterable<T>) => R): Generator<T> {
    return filter(this.#data, cb);
  }

  enumerate(): Generator<[number, T]> {
    return enumerate(this.#data);
  }

  sum(): AggregationValue {
    return sum(this.#data)
  }

  avg(): AggregationValue {
    return avg(this.#data);
  }

  max(): number {
    return max(this.#data);
  }

  min(): number {
    return min(this.#data);
  }

  toArray(): Array<T> {
    return toArray(this.#data);
  }

  collect(collection: Collectable<T>): Generator<T | [PropertyKey, T]> {
    return collect(this.#data, collection);
  }
}

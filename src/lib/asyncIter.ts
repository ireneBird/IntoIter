import { asyncAvg, asyncEnumerate, asyncFilter, asyncFlatMap, asyncFlatten, asyncMap, asyncMax, asyncMin, asyncSum } from './methods';


interface AsyncIterData<T> extends AsyncIterable<T> {
  reverse?: () => AsyncIterData<T>
}

export class AsyncIter<T> {
  #data: AsyncIterData<T>;

  constructor(data: AsyncIterable<T>) {
    this.#data = data
  }

  [Symbol.asyncIterator]() {
    return this.values();
  }

  async values() {
    const iterator = this.#data[Symbol.asyncIterator]();

    return {
      [Symbol.asyncIterator]() {
        return this
      },

      async next() {
        const el = await iterator.next()
        if (el.done) {
          return { done: true, value: undefined }
        }

        return { done: false, value: el.value }
      }
    }
  }

  map<R>(cb: (el: T, index: number, data: AsyncIterable<T>) => R): AsyncIterable<R> {
    return asyncMap(this.#data, cb);
  }

  flat(depth: number = 1) {
    return asyncFlatten(this.#data, depth);
  }

  flatMap<R>(cb: (el: T, index: number, data: Iterable<T>) => Iterable<R>): AsyncIterable<R> {
    return asyncFlatMap(this.#data, cb);
  }

  filter<R>(cb: (el: T, index: number, data: Iterable<T>) => R): AsyncGenerator<T> {
    return asyncFilter(this.#data, cb);
  }

  enumerate(): AsyncGenerator<[number, T]> {
    return asyncEnumerate(this.#data);
  }

  sum(): Promise<number> {
    return asyncSum(this.#data)
  }

  avg(): Promise<number> {
    return asyncAvg(this.#data);
  }

  max(): Promise<number> {
    return asyncMax(this.#data);
  }

  min(): Promise<number> {
    return asyncMin(this.#data);
  }

}


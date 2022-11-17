import { sum } from './agregators/sum';
import DataIter from './data';
import { enumerate } from './enumerate';
import iterableNumber from './helpers/iterableNumber';
import { asyncFilter, filter } from './modificators/filter';
import { asyncFlat, asyncFlatMap, flat, flatMap } from './modificators/flatMap';
import { asyncMap, map } from './modificators/map';
import { InputData } from './types';
import { cast, isIterable } from './utils';


export class IntoIter<T> {
  #data: DataIter<T>;

  constructor(data: InputData<T> | number) {
    if (typeof data === 'number') {
      this.#data = new DataIter(cast(iterableNumber(data)));
    } else {
      this.#data = new DataIter(data);
    }
  }

  [Symbol.iterator]() {
    return this.#data.values();
  }

  [Symbol.asyncIterator]() {
    this.#data.asyncValues();
  }

  isIterable(): boolean {
    return isIterable(this.#data);
  }

  flat(depth: number = 1): IntoIter<T> {
    return new IntoIter(
      this.isIterable() ? flat(this.#data, depth) : asyncFlat(cast(this.#data), depth)
    )
  }



  map<R>(cb: (el: T, index: number, data: InputData<T>) => R): IntoIter<R> {
    return new IntoIter(
      map(this.#data, cb)
      // this.isIterable() ? map(this.#data, cb) : asyncMap(this.#data, cb)
    )
  }

  // filter(cb: (el: T, index: number, data: InputData<T>) => void): IntoIter<T> {
  //   return new IntoIter(
  //     filter(this.#data, cb)
  //     // this.isIterable() ?  : asyncFilter(cast(this.#data), cb)
  //   )
  // }

}





function intoIter<T>(data: Iterable<T>): SyncIter<T>;
function intoIter<T>(data: AsyncIterable<T>): AsyncIter<T>;
function intoIter<T>(data: Iterable<T> | AsyncIterable<T>): SyncIter<T> | AsyncIter<T> {

  if ((data as Iterable<T>)[Symbol.iterator] !== undefined) {
    return new SyncIter(data as Iterable<T>);
  } else if ((data as AsyncIterable<T>)[Symbol.asyncIterator] !== undefined) {
    return new AsyncIter(data as AsyncIterable<T>)
  }

  throw new Error("The argument must be iterable");
}

interface SyncIterData<T> extends Iterable<T> {
  reverse?: () => SyncIterData<T>
}

export { intoIter };


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

  flat(depth: number = 1) {
    return flat(this.#data, depth);
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

  sum(): Generator<number> {
    return sum(this.#data)
  }

}



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

}




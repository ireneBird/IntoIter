import iterableNumber from './helpers/iterableNumber';
import { ValueIter, RawData } from './types';
import { cast, isIterable } from './utils';

export default class DataIter<T>{
  #data: RawData<T>

  constructor(data: ValueIter<T>) {
    // if (typeof data === 'number') {
    //   this.#data = cast(iterableNumber(data))
    // } else {
    //   this.#data = cast(data);
    // }

    this.#data = cast(data);
  }

  [Symbol.iterator]() {
    return this.values()
  }

  [Symbol.asyncIterator]() {
    return this.asyncValues();
  }

  // isIterable(): boolean {
  //   return isIterable(this.data);
  // }

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


  async asyncValues() {
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


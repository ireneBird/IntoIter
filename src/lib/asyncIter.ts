

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


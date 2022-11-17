export interface RawData<T> extends Iterable<T>, AsyncIterable<T> {
  reverse?: () => IterableIterator<T>
}

export type InputData<T extends any> = Iterable<T> | AsyncIterable<T> | number;
export type ValueIter<T> = Iterable<T> | AsyncIterable<T> | Iterable<number>;
export interface RawData<T> extends Iterable<T>, AsyncIterable<T> {
  reverse?: () => IterableIterator<T>
}

export type AggregationValue = number | Promise<number>;

export type InputData<T extends any> = Iterable<T> | AsyncIterable<T> | number;
export type ValueIter<T> = Iterable<T> | AsyncIterable<T> | Iterable<number>;

export type Collectable<T> =
  { push(value: T): void } |
  { add(value: T): void } |
  { set(key: number, value: T): void };

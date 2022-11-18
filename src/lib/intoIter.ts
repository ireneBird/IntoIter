import { AsyncIter } from './asyncIter';
import iterableNumber from './helpers/iterableNumber';
import { SyncIter } from './syncIter';
import { cast } from './utils';


function intoIter<T>(data: number): SyncIter<T>;
function intoIter<T>(data: Iterable<T>): SyncIter<T>;
function intoIter<T>(data: AsyncIterable<T>): AsyncIter<T>;
function intoIter<T>(data: Iterable<T> | AsyncIterable<T> | number): SyncIter<T> | AsyncIter<T> {
  if (typeof data === 'number') {
    return new SyncIter(cast(iterableNumber(data)));
  }
  if ((data as Iterable<T>)[Symbol.iterator] !== undefined) {
    return new SyncIter(data as Iterable<T>);
  } else if ((data as AsyncIterable<T>)[Symbol.asyncIterator] !== undefined) {
    return new AsyncIter(data as AsyncIterable<T>)
  }

  throw new Error("The argument must be iterable");
}



export { intoIter };
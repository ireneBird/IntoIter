import { AggregationValue } from '../../types';

export function avg<T>(iterable: Iterable<T>): AggregationValue {
  let sum = 0;
  let index = 0;
  for (const el of iterable) {
    if (typeof el !== 'number') {
      throw new Error("The element must be a number");
    }

    sum += el;
    index++
  }
  return sum / index
}
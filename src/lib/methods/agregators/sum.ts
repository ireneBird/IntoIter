import { AggregationValue } from '../../types';

export function sum<T>(iterable: Iterable<T>): AggregationValue {
  let sum = 0;
  for (const el of iterable) {
    if (typeof el == 'number') {
      sum += el;
    }
  }
  return sum;
}

export async function asyncSum<T>(iterable: AsyncIterable<T>): Promise<number> {
  let sum = 0;
  for await (const el of iterable) {
    if (typeof el == 'number') {
      sum += el;
    }
  }
  return sum;
}
import { filter } from '../modificators/filter'

export function max<T>(iterable: Iterable<T>, field?: string): number {
  let max = -Infinity;
  for (const item of iterable) {
    if (typeof item !== 'number') {
      throw new Error('Values must be numbers')
    }
    max = item > max ? item : max;
  }
  return max;
}


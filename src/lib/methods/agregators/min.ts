
export function min<T>(iterable: Iterable<T>, field?: string): number {
  let min = Infinity;
  for (const item of iterable) {
    if (typeof item !== 'number') {
      throw new Error('Values must be numbers')
    }
    min = item < min ? item : min;
  }
  return min;
}


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


export async function asyncMin<T>(iterable: AsyncIterable<T>, field?: string): Promise<number> {
  let min = Infinity;
  for await (const item of iterable) {
    if (typeof item !== 'number') {
      throw new Error('Values must be numbers')
    }
    min = item < min ? item : min;
  }
  return min;
}


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

export async function asyncMax<T>(iterable: AsyncIterable<T>, field?: string): Promise<number> {
  let max = -Infinity;
  for await (const item of iterable) {
    if (typeof item !== 'number') {
      throw new Error('Values must be numbers')
    }
    max = item > max ? item : max;
  }
  return max;
}


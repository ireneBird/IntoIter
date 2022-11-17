export function* sum<T>(iterable: Iterable<T>): Generator<number> {
  let sum = 0;
  for (const el of iterable) {
    if (typeof el == 'number') {
      sum += el;
    }
  }
  yield sum;
}
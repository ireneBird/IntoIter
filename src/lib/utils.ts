export function cast<T>(value: any): T {
  return value;
}

export function isIterable<T>(value: any): value is Iterable<T> {
  return (value as Iterable<T>)[Symbol.iterator] !== undefined;
}
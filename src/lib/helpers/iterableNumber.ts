
export default function iterableNumber(number: number): Iterable<number> {
  return {
    *[Symbol.iterator]() {
      let cur = 1;
      while (cur <= number) {
        yield cur++
      }
    }
  }
}
type Collectable<T> =
  { push(value: T): void } |
  { add(value: T): void } |
  { set(key: number, value: T): void };


export function collect<T>(iterable: Iterable<T>, collection: Collectable<T>) {


}

// function* values(t) {
//   switch (t?.constructor) {
//     case Object:
//     case Array:
//       for (const v of Object.values(t))
//         yield* values(v)
//       break
//     default:
//       yield t
//   }
// }

// function* numbers<T>(iterable: Iterable<T>) {
//   for (const v of iterable) {
//     switch (v?.constructor) {
//       case Number:
//         if (!Number.isNaN(v))
//           yield v
//     }
//   }
// }
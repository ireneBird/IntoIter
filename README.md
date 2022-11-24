## Библиотека для работы с iterable объектами 


Библиотека предназначена для работы с любыми iterable объектами, в том числе асинхронными. Поддерживает следующие методы: агрегаторы, модификаторы, коллекторы

### API

#### Модификаторы
- `enumerate()`
- `filler(cb)`
- `flatten()`
- `flatMap(cb)`
- `map(cb)`
- `take(index)`

Пример:
```js
const iter = intoIter([1, 2, 3]).map( el => el * 2 );

const iter2 = intoIter([1, 2, [3, 4, [5, 6]]]).flatten(2);

const iter3 = intoIter([1, 2, 3, 4]).flatMap((el) => [el, el]);

const iter4 = intoIter('hello everybody').filter((el, i) => i > 5);

```

#### Агрегаторы

- `sum()`
- `min()`
- `max()`
- `avg()`

Пример:
```js
const sum = intoIter(10).sum();

const avg = intoIter(10).avg();

const max = intoIter(10).max();

const min = intoIter(10).min();

```

#### Коллекторы
- `collect(collection)`
- `toArray()`

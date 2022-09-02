#[Список хуков](https://reactjs.org/docs/hooks-reference.html)

## Базовые
1. useState
2. useEffect
3. useContext

## Дополнительные
4. useMemo
5. useRef
6. useReducer
7. useCallback
8. useLayoutEffect
9. useImperativeHandle
10. useDebugValue

## Новые хуки в React 18
11. useId
### Хуки предназначеные для устронения фризов интерфейса
12. useDeferredValue
13. useTransition

### Библиотечные хуки (предназначены для авторов пополярных react библиотек)
14. useSyncExternalStore (redux)
15. useInsertionEffect ([css-in-js library](https://github.com/andreipfeiffer/css-in-js) ) Данный хук не будет арссмотрен, так как в самой докомуентации написанно, что он только для создатилей библиотеки.

## Кастомные хуки
1. useLocalStorage (аналог useState для localStorage)
2. useSessionStorage (аналог useState для sessionStorage)
3. useUpdateLogger (вывод переменной консоль при её изменении)
4. useToggle (аналог useState для булевой переменной)
5. useTimeout (управление setTimeout)
6. useInterval (управление setInterval)
7. useDebounce (аналог useDeferredValue, только с ручной настройкой delay и выбором зависимостей)
8. useUpdateEffect (аналог useEffect, но срабатывает только при обновлении (не рабоатет при монтировании))
9. useArray (аналог useState для массива)

useQuery
useSWR

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
10. usePrevious (сохраняет предыдущие значение useState)
11. useStateWithHistory (сохраняет историю изменений useState)
12. useStorage (рефакторинг useLocalStorage и useSessionStorage)
13. useAsync (индикатор выполнения, ошибка и значение, асинхронного колбека)
14. useFetch (useAsync для fetch)
15. useScript (используется для загрузки скритов например jquery)
16. useDeepCompareEffect (аналог useEffect только глубокое сравнение зависимостей)
17. useOutsideClickHandler (обратчик нажатия вне заданного элемента)
18. useEventListener (добавить обработчик события на выбранный элемент)
19. useOnScreen (определяет видим ли элемент на стрице (IntersectionObserver))
20. useWindowSize (отслеживает размеры window)
21. useMediaQuery (добавление media-запросов к элементам (window.matchMedia))
22. useGeolocation (определить геолокацию пользователя (navigator.geolocation))
23. useStateWithValidation (аналог useState но с валидацией ввода)
24. useSize (определить размер и позициию на экране элемента (ResizeObserver))
25. useEffectOnce (аналог useEffect, выполняющийся только один раз при монтировании)
26. useClickOutside (рефакторинг useOutsideClickHandler, приоритет этому хуку)
27. useDarkMode (управление цветовой темой сайта)
28. useCopyToClipboard (используется для копирования текста в буфер обмена)
29. useCookie (используется для работы с Cookie)
30. useTranslation (используется для перевода фраз на разные языки)

useQuery
useSWR

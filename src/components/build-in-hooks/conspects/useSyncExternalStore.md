хук useSyncExternalStore предназначен для оповещения приложения об измененении значений стора. Обычно стор это сложный
объект. useSyncExternalStore принимает три параметра: subscribe - функция подписки на изменение сотсояние стора,
getSnapshot - функция которая отделяет требуемую нам часть стора (например: нам интересно только свойство key1 стора, а
другие нет, чтобы реагировать только на изменение key1, а изменения других свойств пропускатьть, мы создаём селектор:
selector: (store)=>store[key1], таким образом мы следим только за key1); третье свойство getServerSnapshot используется
при SSR и в данном репозитории не будет расссмотренно

Следующие два куска эквивалентны, если не считать оптимизации заложенных в useSyncExternalStore

```typescript jsx
useStore: <SelectorOutput, >(selector: (state: ValueType) => SelectorOutput) => {

    const [state, setState] = useState(selector(currentState))

    useEffect(() => subscribe((state) => setState(selector(state))), [])

    return state;
}

```

```typescript jsx
useStore: <SelectorOutput, >(selector: (state: ValueType) => SelectorOutput) => {
    return useSyncExternalStore(subscribe, () => selector(currentState));
}
```
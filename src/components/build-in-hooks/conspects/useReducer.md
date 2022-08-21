useReducer - это аналог useState, однако он определяет не только значение, н все допустимые способы его изменения

useReducer - возвращает, state, и dispatch (dispatch это аналог setState в useState)
state - может быть любым значением, но обычно это объект
В setState, мы передаём новое состояние
В dispatch, мы вызываем способ изменения состояния который заранее определён

```typescript jsx
const [state, setState] = useState(0)
setState(prev => prev + 1);
```

```typescript jsx
function reducer(state, action){
    switch(action.type){
        case 'INCREMENT': state+1;
        case 'ADD': state + action.payload;
        default: throw new Error('WRONG ACTION')
    }
}

const [state, dispatch] = useReducer(reducer, 0);
dispatch({type: 'INCREMENT'})
dispatch({type: 'ADD', payload: 5})
```

У UseReducer есть два способа инициализации:
```typescript jsx
const [state1, dispatch1] = useReducer(reducer, initValue)
//state1 = initValue
const [state2, dispatch2] = useReducer(reducer, initValue, initFunction)
//state2 = initFunction(initValue)
```

reducer должен возвращать  новое состояние
Если вы меняете только одно поле используйте spread
```typescript jsx
return {...state, count: action.payload}
```

Если reducer вернёт прежнее сотсояние useEffect не вызывется
```typescript jsx
return state
```

Так вызовется
```typescript jsx
return {...state}
```
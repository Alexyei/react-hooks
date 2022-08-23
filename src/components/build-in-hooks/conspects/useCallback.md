useCallback - является аналогом useMemo, однако возвращет не вычисленное значение, а саму функцию которое должна вычислить это значение
```typescript jsx
const funcMemorized = useCallback(()=>[number,number+1],[number])
//funcMemorized = ()=>[number,number+1]
const valueMemorized = useMemo(()=>[number,number+1],[number])
//valueMemorized = [number,number+1]
```

Каждый раз при ре-рендеренге компонента функцию объявленные в нём создаются заново, это может вызывать нежелательные побочные эфекты в дочерних компонентах или ухудшать производительность.
Запустим данные пример:
```
return (
        <div style={theme}>
            <input type={"number"} value = {number} onChange={e=>setNumber(parseInt(e.target.value))}/>
            <button onClick={()=>setDark(prevDark=>!prevDark)}>Toggle theme</button>
            {/*<List getItems={memorizedGetItems}/>*/}
            <h1>Синхронный вызов функции</h1>
            <h3>Обычный</h3>
            <List getItems={getItems}/>
         </div>
    )
```
Очистим консоль, нажмём кнопку Toggle theme.
В результате увидим, что была сгенерирована новая функция getItems.
Был вызыван побочный эффект updated values, хотя значение не обновлялись.
Используя useCallback можно избежать личшнего вызова функции.

Расзница мало-заметна в синхронном коде, но заметна в асинхронном.
При смене цветовой темы появляется сообщение загрузка данных. Хотя повторная загрузка не требовалась.
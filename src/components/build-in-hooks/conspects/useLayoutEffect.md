useLayoutEffect является практически полным аналогом useEffect

Но отличиается от useEffect тем, что выполняется до  useEffect, и может сохранить цикл рендеринга
В этом смысле useLayoutEffect является аналогом, метода жизненного цикла getDerivedStateFromProps

В примере ниже только 2 вариант даёт отличия от useEffect
В первом примере "скачка изображения" не будет ни в useEffect, useLayoutEffect так как мы изменяем DOM в обход React 
Во втором случае скачок будет только в useEffect, так как состояние меняется два раза (сначало show, затем top в useEffect)
useLayoutEffect объединяет два изменения состояния в одно, поэтому скачка не будет
В 3 и 4 случаях скачок в обоих варинтах, нет способа отследить выполнение асинхронного кода
```typescript jsx
useLayoutEffect(()=>{
        if (!show){
            setTop('')
        }
        if (show && button.current)
        {
            const {bottom} =button.current.getBoundingClientRect();

            //1 . случай
            // popup.current!.style.top = `${bottom+125}px`;
            
            //2 . случай
            setTop(`${bottom+125}px`)
            
            // setTimeout(()=>{
            //     //  3. случай
            //     // setTop(`${bottom+125}px`)
            //     //  4. случай
            //     popup.current!.style.top = `${bottom+125}px`;
            // })
        }
    },[show])
```

useEffect и useLayout выполняют код синхронно и блокируют интерфейс, поэтому разницы между:
'Запустить useEffect (асинхронный)' и 'Запустить useLayoutEffect (синхронный)' НЕТ
import {FC, useEffect, useState} from "react";


//useEffect заменяет три метода жизненного цикла componentDidMount, componentDidUpdate и componentWillUnmount
const UseEffectExample:FC = ()=>{
    const [count, setCount] = useState(0)
    const [count2, setCount2] = useState(0)

    useEffect(()=>{
        console.log("Компонент смонтирвоан или измененён")
        document.title = `Вы кликнули: ${count+count2} раз`
        return ()=>{
            console.log("Компонент размонтирован")
        }
    })

    useEffect(()=>{
        console.log("Реагирую только когда изменился count")
        setCount2(count=>count+2)
        return ()=>{
            console.log("Реагирую только когда изменился count unmount")
        }
    },[count])

    useEffect(()=>{
        console.log("Не реагирую на изменения состояния")
        return ()=>{
            console.log("Не реагирую unmount")
        }
    },[])
    // useEffect(()=>{
    //     console.log("Компонент смонтирвоан или измененён")
    //     document.title = `Вы кликнули: ${count+count2} раз`
    //     setCount(count=>count+1)
    //     return ()=>{
    //         console.log("Компонент размонтирован")
    //     }
    // })

    return (
        <div>
            <h1>Count: {count}</h1>
            <h1>Count2: {count2}</h1>
            <button onClick={()=>setCount(count=>count+1)}>+1</button>
            <button onClick={()=>setCount2(count=>count+1)}>+1 (2)</button>
            <h2>При нажатии кнопки ниже useEffect не будет вызвван (console), так как count не изменится</h2>
            <button onClick={()=>setCount(count=>count)}>+0</button>
            <p>Если React.StrictMode НЕ актирован мы получим одно сообщение в консоли:
                1. Компонент смонтирвоан или измененён
                Иначе если он активирован три сообщения)
                1. Компонент смонтирвоан или измененён
                2. Компонент размонтирован
                3. Компонент смонтирвоан или измененён
                React.StrictMode проверяет устойчивость компонента к размонтировки на этапе разработки, обычного его отключают в продакшене
            </p>
           <p>При изменении любого состояния компонента вызывается useEffect и мы получаем два сообщения в консоли:
                1. Компонент размонтирован ("очистка" предыдущего useEffect)
                2. Компонент смонтирвоан или измененён
            </p>
            <p>useEffect выполняется ассинхронно (не блокирует браузер), для синхронного выполнения кода ипользуйте useLayoutEffect</p>
            <p>Сначало изменяется состояние, за тем вызывается useEffect</p>
            <h1 style={{color:'red'}}>Изменения состояния внутри useEffect может привести к зацикливанию. Изменяйте только то состояние которое не вызывает данный useEffect (отсутствует в переданном массиве) (Пример changed)</h1>
            <p>Если массив зависимостей пустой useEffect не вызывается при изменении состояния компонента</p>

        </div>
    )
}

export default UseEffectExample;

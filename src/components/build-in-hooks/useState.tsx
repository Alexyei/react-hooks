import {FC, useState} from "react";

//hook useState создаёт реактивную переменную
const UseStateExample: FC = () => {
    const [count, setCount] = useState(0)

    //сохраняем колбек
    const [callback, setCallback] = useState(()=>()=>setCount(0))
    // меняем колбек
    // setCallback(()=>()=>setCount(1000))


    //Указание точного типа для typescript
    const [array, setArray] = useState<number[]>([])

    const [objForCount, setObjForCount] = useState({count:0})

    const [arrayObjects, setArrayObjects] = useState<{id: number}[]>([])

    function test(){
        console.log("RUN TEST")
        return 0;
    }

    const [testValue, setTestValue] = useState(()=>{
        console.log('Данные колбек будет выполняться только при монтировании (при re-render не будет)')
        console.log('Используйте функцию инитиализатор, если хотите чтобы начальное значение не пересчитывалось при re-render')
        test();
    })

    function handleAddElementToArray(){
        setArray([...array,array.length+1])
    }

    function rightHandleAddElementToArray(){
        setArray(current=>[...current,current.length+1])
    }
    function handleAddTwoElementToArray(){
       handleAddElementToArray()
       handleAddElementToArray()
    }

    function rightHandleAddTwoElementToArray(){
        rightHandleAddElementToArray()
        rightHandleAddElementToArray()
    }

    function handleRemoveElementFromArray(){
        // setArray(array.slice(0,-1))
        setArray(array=>array.slice(0,-1))
    }


    function handleAddElementToArrayOfObjects(){
        setArrayObjects(array=>[...array,{id:array.length}])
    }

    function handleRemoveElementFromArrayOfObjects(){
        setArrayObjects(array=>array.slice(0,-1))
    }

    return (
        <div style={{paddingBottom: '50px'}}>
            <h2>Вы кликнули {count} раз</h2>
            <button onClick={(e)=>setCount(count+1)}>Кликни на меня</button>
            <button onClick={(e)=>{setCount(count+1);setCount(count+1);}}>Кликни на меня +2</button>
            <h1>предыдущий вариант даёт ошибку для второй кнопки вот правильный вариант</h1>
            <button onClick={(e)=>setCount(current=>current+1)}>Кликни на меня</button>
            <button onClick={(e)=>{setCount(current=>current+1);setCount(current=>current+1);}}>Кликни на меня +2</button>
            <button onClick={(e)=>{setCount(current=>current+2)}}>Кликни на меня +2</button>
            <h2>В массиве {array.length} элементов</h2>
            <ul>
                {array.map((el, index)=><li key={index}>{el}</li>)}
            </ul>
            <button onClick={handleAddElementToArray}>Добавить элемент</button>
            <button onClick={handleRemoveElementFromArray}>Удалить элемент</button>
            <button onClick={handleAddTwoElementToArray}>Добавить два элемента</button>
            <button onClick={rightHandleAddTwoElementToArray}>Добавить два элемента правильно</button>
            <h1 style={{color:"red"}}>Всегда когда вы изменяете сосотояние на сонове предыдущего используйте стрелочную-функцию в качестве аргумента setState</h1>
            <h2>Работа с объектами</h2>
            <h2>Свойство count объекта: {objForCount.count}</h2>
            {/*Для изменения свойств объекта НУЖНО вызывать setState*/}
            <button onClick={(e)=>{objForCount.count++;console.log(objForCount.count)}}>Увеличить count</button>
            <h1 style={{color:"red"}}>В консоли отобржается новое значение, но на экране всё по-прежнему. Дело в том, что react незнает, что произошло изменения (не было вызова setState) и соотвественно не обновляет DOM</h1>
            <button onClick={(e)=>{setObjForCount(prev=>({...prev,count:prev.count+1}));console.log(objForCount.count)}}>Увеличить count правильно</button>
            <h2>Массив объектов</h2>
            <ul>
                {arrayObjects.map((el,index)=><li key={index}>{el.id}</li>)}
            </ul>
            <button onClick={handleAddElementToArrayOfObjects}>Добавить</button>
            <button onClick={handleRemoveElementFromArrayOfObjects}>Удалить</button>
        </div>
    )
}

export default UseStateExample;

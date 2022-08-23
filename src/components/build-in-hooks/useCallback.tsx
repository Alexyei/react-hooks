import {FC, useCallback, useEffect, useState} from "react";

const UseCallbackExample: FC = () => {
    const [number, setNumber] = useState(1)
    const [dark, setDark] = useState(false);

    function getItems (seed=0){
        return [number+seed, number + 1+seed, number + 2+seed]
    }

    function getItemsAsync(seed=0) {
        // `delay` returns a promise
        return new Promise<number[]>(function(resolve, reject) {
            // Only `delay` is able to resolve or reject the promise
            setTimeout(function() {
                resolve(getItems(seed)); // After 3 seconds, resolve the promise with value 42
            }, 2000);
        });
    }


    const memorizedGetItems = useCallback(getItems,[number])
    const memorizedGetItemsAsync = useCallback(getItemsAsync,[number])

    const getItems2 = (number: number) => {
        return [number, number + 1, number + 2]
    }

    const theme = {
        backgroundColor: dark ? '#333' : '#FFF',
        color: dark ? '#FFF' : '#333'
    }

    useEffect(()=>{
        console.log("getItems updated!")
    },[getItems])

    useEffect(()=>{
        console.log("memorized getItems updated!")
    },[memorizedGetItems])

    useEffect(()=>{
        console.log("rendered!")
    })

    return (
        <div style={theme}>
            <input type={"number"} value = {number} onChange={e=>setNumber(parseInt(e.target.value))}/>
            <button onClick={()=>setDark(prevDark=>!prevDark)}>Toggle theme</button>
            {/*<List getItems={memorizedGetItems}/>*/}
            <h1>Синхронный вызов функции</h1>
            <h3>Обычный</h3>
            <List getItems={getItems}/>
            {/*<h3>useCallback</h3>*/}
            {/*<List getItems={memorizedGetItems}/>*/}
            {/*<h1>Асинхронный вызов функции</h1>*/}
            {/*<h3>Обычный</h3>*/}
            {/*<ListAsync getItems={getItemsAsync}/>*/}
            {/*<h3>useCallback</h3>*/}
            {/*<ListAsync getItems={memorizedGetItemsAsync}/>*/}
        </div>
    )
}

const List:FC<{getItems: (seed?:number)=>number[]}> = ({getItems})=>{
    const [items, setItems] = useState<number[]>([])
    const [seed, setSeed] = useState(Math.random()*10)
    const [isLoading, setIsLoading] = useState(false);

    useEffect(()=>{
        setIsLoading(true)
        setItems(getItems(seed))
        setIsLoading(false)
        console.log("LIST ITEMS UPDATED!")
    },[getItems,seed])

    useEffect(()=>{
        console.log("LIST RENDERED")
    })

    return (<>{isLoading? <p>Загрузка данных...</p>:items.map(item=><div key={item}>{item}</div>)}</>)
}

const ListAsync:FC<{getItems: (seed?:number)=>Promise<number[]>}> = ({getItems})=>{
    const [items, setItems] = useState<number[]>([])
    const [seed, setSeed] = useState(Math.random()*10)
    const [isLoading, setIsLoading] = useState(false);
    useEffect(()=>{
        setIsLoading(true)
        getItems(seed).then(items=>{setItems(items);setIsLoading(false)})

        console.log("LIST ITEMS UPDATED!")
    },[getItems,seed])

    useEffect(()=>{
        console.log("LIST RENDERED")
    })

    return (<>{isLoading? <p>Загрузка данных...</p>:items.map(item=><div key={item}>{item}</div>)}</>)
}


export default UseCallbackExample;
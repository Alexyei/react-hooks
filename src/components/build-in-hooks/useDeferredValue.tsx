import {FC, useDeferredValue, useEffect, useMemo, useState} from "react";

const UseDeferredValueExample:FC = ()=>{
    const [value, setValue] = useState('')
    return (
        <>
            <input value={value} onChange={(e)=>setValue(e.target.value)}/>
            <List input={value}/>
        </>
    )
}

export default UseDeferredValueExample;

const List:FC<{input:string}>=({input})=>{
    const LIST_SIZE = 20000;
    const deferredInput = useDeferredValue(input);
    const list = useMemo(()=>{
        const l = []
        for(let i=0;i<LIST_SIZE;i++){
            l.push(<div key={i}>{input}</div>)
        }
        return (<>{l}</>);
    },[deferredInput])

    useEffect(()=>{
        console.log(`Input: ${input}\nDeferredValue: ${deferredInput}`)
    },[input, deferredInput])

    return list;
}

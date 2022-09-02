import {FC, useEffect, useState} from "react";
import {useTimeout} from "./useTimeout";
//хук похож на useDeferredValue, только мы сами выбиарем задержку и ещё есть зависимости
export function useDebounce(callback: ()=>any, delay:number, dependencies:any[]){
    const {reset, clear} = useTimeout(callback, delay);
    useEffect(reset, [...dependencies, reset])
    useEffect(clear,[])
}

const UseDebounceExample:FC = ()=>{
    const [input, setInput] = useState('')
    useDebounce(()=>alert(`search request: ${input}`),1000,[input])
    return (<input value={input} onChange={(e)=>setInput(e.target.value)}/>)
}

export  default UseDebounceExample;

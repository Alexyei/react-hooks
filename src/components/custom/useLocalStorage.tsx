import {FC, useEffect, useState} from "react";
import useUpdateLogger from "./useUpdateLogger";

function getSavedValue<T,>(key:string, initialValue:T){
    console.log('GET')
    const savedValue = localStorage.getItem(key);
    if (savedValue) return JSON.parse(savedValue) as T;

    if (initialValue instanceof Function) return initialValue;
    return initialValue;
}

export function useLocalStorage<T,>(key:string, initialValue:T){
    const [value, setValue] = useState(()=>{
        console.log('CB')
        return getSavedValue(key,initialValue)
    })

    useEffect(()=>{
        localStorage.setItem(key, JSON.stringify(value))
    },[value])

    return [value, setValue] as const;
}



const UseLocalStorageExample:FC = ()=>{
    const [name, setName] = useLocalStorage('name','');
    useUpdateLogger(name)
    return (
        <input type={'text'} value={name} onChange={e=>setName(e.target.value)}/>
    )
}

export default UseLocalStorageExample;

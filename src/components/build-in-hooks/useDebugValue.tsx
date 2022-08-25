import {FC, useDebugValue, useEffect, useState} from "react";

//useDebugValue служит для отображения дополнительной информации напротив кастомных хуков в React DevTools
const UseDebugValueExample:FC = ()=>{
    const [value, setValue] = useState('')
    const [upValue, setUpValue] = useUppercaseValue('')

    useDebugValue("не рабоатет вне хуков")

    return (
        <>
            <label htmlFor="usually">Обычное значение:</label>
            <input id='usually' value={value} onChange={(e)=>setValue(e.target.value)}/>
            <label htmlFor="up">Uppercase значение:</label>
            <input id='up' value={upValue} onChange={(e)=>setUpValue(e.target.value)}/>
        </>
    )
}

export default UseDebugValueExample;

const useUppercaseValue = (initial: string | (() => string))=>{
    const [value, setValue] = useState(initial)

    function handleSetValue(value:string):void;
    function handleSetValue(value:(prev:string)=>string):void;
    function handleSetValue(value:((prev:string)=>string) | string){
        if (value instanceof Function){
            setValue((prev:string)=>{
                const calculated = value(prev)
                return calculated.toUpperCase()
            })
        }
        else{
            setValue(value.toUpperCase())
        }
    }

    function longFormatting(value:string){
        for(let i =0;i<1000000000;++i){}
        return value
    }

    useDebugValue(value)
    // // useDebugValue(longFormatting(value))
    // useDebugValue(value,v=>longFormatting(v))
    // useDebugValue("HI")
    useEffect(()=>{
        console.log(value)
    },[value])

    return [value,handleSetValue] as const
}

import {FC, useCallback, useState} from "react";

export function useToggle(defaultValue:boolean){
    const [value, setValue] = useState(defaultValue);

    function toggleValue(value:boolean | any){
        setValue(prev=>typeof value === 'boolean' ? value :!prev);
    }

    const toggle = useCallback(toggleValue,[])


    return [value, toggle] as const
}

const UseToggleExample:FC = ()=>{
    const [value, toggleValue] = useToggle(false);

    return (<div>
        <div>{value.toString()}</div>
        <button onClick={toggleValue}>Toggle</button>
        <button onClick={()=>toggleValue(true)}>Make True</button>
        <button onClick={()=>toggleValue(false)}>Make False</button>
    </div>)
}

export default UseToggleExample;

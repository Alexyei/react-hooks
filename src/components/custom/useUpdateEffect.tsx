import {FC, useEffect, useRef, useState} from "react";

export function useUpdateEffect(callback:()=>any, dependencies:any[]){
    const firstRenderRef = useRef(true);

    useEffect(()=>{
        if (firstRenderRef.current){
            firstRenderRef.current = false;
        }else{
            callback();
        }
    }, dependencies)
}

const UseUpdateEffectExample:FC = ()=>{
    const [count, setCount] =useState(10);
    //alert вызовется при монтировании и обновлении
    // useEffect(()=>alert(count),[count])
    //alert не вызывется при монтировании, только при обновлении
    useUpdateEffect(()=>alert(count),[count])
    return (<div>
        <div>{count}</div>
        <button onClick={()=>setCount(prev=>prev+1)}>Increment</button>
    </div>)
}

export default UseUpdateEffectExample;

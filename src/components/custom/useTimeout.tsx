import {FC, useCallback, useEffect, useRef, useState} from "react";

export function useTimeout(callback:()=>any, delay:number, startAfterCreate = true){
    //Использование callbackRef важно, так как такой поход позволяет не сбрасывать таймер при обновлении колбека.
    //Использование memorizedCB или просто callback здесь не срабоатет!
    //
    const callbackRef = useRef(callback);
    const timeoutRef = useRef<NodeJS.Timeout>();
    // const memorizedCB = useCallback(callback,[callback])
    useEffect(()=>{
        callbackRef.current = callback;
    },[callback])

    const set = useCallback(()=>{
        console.log("SET")
        // timeoutRef.current = setTimeout(()=>callback(), delay)
        // timeoutRef.current = setTimeout(()=>memorizedCB(), delay)
        timeoutRef.current = setTimeout(()=>callbackRef.current(), delay)
    },[delay])

    const clear = useCallback(()=>{
        console.log("CLEAR")
        timeoutRef.current && clearTimeout(timeoutRef.current)
    },[])

    const reset = useCallback(()=>{
        console.log("RESET")
        clear();
        set();
    },[clear, set])

    useEffect(()=>{
        set()
        return ()=>{console.log("UNMOUNT");clear()};
    },[delay, set, clear])

    return {reset, clear}
}

const UseTimeoutExample:FC = ()=>{
    const [count, setCount] = useState(10);
    const [delay, setDelay] = useState(2000)
    const [callback, setCallback] = useState(()=>()=>setCount(0))

    const {clear, reset} = useTimeout(callback,delay)
    return (<div>
        <div>{count}</div>
        <button onClick={()=>setCount(prev=>prev+1)}>Increment</button>
        <button onClick={()=>setDelay(prev=>prev*2)}>Update Delay</button>
        <button onClick={()=>setCallback(()=>()=>setCount(1000))}>Update Callback</button>
        <button onClick={clear}>Clear Timeout</button>
        <button onClick={reset}>Reset Timeout</button>
        <button onClick={callback}>RUN</button>
    </div>)
}

export default UseTimeoutExample;



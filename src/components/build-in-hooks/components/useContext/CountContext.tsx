import {createContext, FC, ReactNode, useContext, useState} from "react";

export const CounterContext = createContext<[number,()=>void, ()=>void]>([0,()=>{},()=>{}])

const CounterProvider:FC<{children:ReactNode}> = ({children})=>{
    const [number, setNumber] = useState(0);

    function increment(){
        setNumber(prev=>prev + 1)
    }

    function decrement(){
        setNumber(prev=>prev - 1)
    }

    return (
        <CounterContext.Provider value={[number, increment, decrement]}>
            {children}
        </CounterContext.Provider>
    )
}

export function useCounterContext(){
    return useContext(CounterContext)
}

export default CounterProvider;

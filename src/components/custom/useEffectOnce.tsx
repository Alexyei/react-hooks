import {FC, useEffect, useState} from "react";

export function useEffectOnce(cb:()=>any) {
    useEffect(cb, [])
}

const UseEffectOnce:FC = ()=>{
    const [count, setCount] = useState(0)

    useEffectOnce(() => alert("Hi"))

    return (
        <>
            <div>{count}</div>
            <button onClick={() => setCount(c => c + 1)}>Increment</button>
        </>
    )
}

export default UseEffectOnce;
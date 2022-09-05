import {FC, useEffect, useRef, useState} from "react";

//НЕ РАБОАТЕТ КОГДА МЕНЯЕТСЯ ИМЯ
// export function usePrevious<T,>(value:T){
//     const prevValue = useRef<T>()
//
//     useEffect(()=>{
//         console.log("EFFECT")
//         prevValue.current = value
//     },[value])
//
//     console.log("return")
//     return prevValue.current;
// }

export function usePrevious<T,>(value:T) {
    const currentRef = useRef<T>(value)
    const previousRef = useRef<T>()

    if (currentRef.current !== value) {
        previousRef.current = currentRef.current
        currentRef.current = value
    }

    return previousRef.current
}

const UsePreviousExample: FC = ()=>{
    const [count, setCount] = useState({count:0})
    const [name, setName] = useState("Kyle")
    const previousCount = usePrevious(count)

    return (
        <div>
            <div>
                {count.count} - {previousCount?.count}
            </div>
            <div>{name}</div>
            <button onClick={() => setCount(currentCount => ({count:currentCount.count+1}))}>
                Increment
            </button>
            <button onClick={() => setName("John")}>Change Name</button>
        </div>
    )
}

export default UsePreviousExample;
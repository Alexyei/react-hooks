import {FC, useCallback, useEffect, useRef, useState} from "react";

export function useStateWithHistory<T, >(value: T, {capacity = 10} = {}) {
    //history ref а не array потому что мы меняем только содержимое массива а не все объект массива. с setState это невозможно, мы должны вернуть новый массив.
    const historyRef = useRef([value])
    const [pointer, setPointer] = useState(0)

    const back = useCallback(function back() {
        setPointer(prev => prev > 0 ? prev - 1 : prev)
    }, [])

    const forward = useCallback(function forward() {
        setPointer(prev => prev === historyRef.current.length - 1 ? prev : prev + 1)
    }, [])

    const go = useCallback(function go(index: number) {
        if (index < 0 || index > historyRef.current.length - 1) return;
        setPointer(index)
    }, [])

    const set = useCallback(function set(value: ((prev: T) => T) | T) {
        const resolvedValue = typeof value === 'function' ? (value as ((prev: T) => T))(historyRef.current[pointer]) : value;
        if (historyRef.current[pointer] !== resolvedValue) {
            if (pointer < historyRef.current.length - 1) {
                historyRef.current.splice(pointer + 1)
            }
            historyRef.current.push(resolvedValue)

            while (historyRef.current.length > capacity) {
                historyRef.current.shift()
            }
        }

        // setHistory(prev => {
        //     return [...prev.slice(0, pointer + 1), resolvedValue].slice(-capacity)
        // })
        setPointer(prev => Math.min(prev + 1, capacity - 1))
    }, [capacity, pointer])

    return [historyRef.current[pointer], set, {history: historyRef.current, pointer, back, forward, go}] as const
}

export function useStateWithHistory2<T, >(defaultValue: T, {capacity = 10} = {}) {
    const [value, setValue] = useState(defaultValue)
    const historyRef = useRef([value])
    const pointerRef = useRef(0)

    const set = useCallback(
        (v: ((prev: T) => T) | T) => {
            const resolvedValue = typeof v === "function" ? (v as (prev: T) => T)(value) : v
            if (historyRef.current[pointerRef.current] !== resolvedValue) {
                if (pointerRef.current < historyRef.current.length - 1) {
                    historyRef.current.splice(pointerRef.current + 1)
                }
                historyRef.current.push(resolvedValue)

                while (historyRef.current.length > capacity) {
                    historyRef.current.shift()
                }
                pointerRef.current = historyRef.current.length - 1
            }
            setValue(resolvedValue)
        },
        [capacity, value]
    )

    const back = useCallback(() => {
        if (pointerRef.current <= 0) return
        pointerRef.current--
        setValue(historyRef.current[pointerRef.current])
    }, [])

    const forward = useCallback(() => {
        if (pointerRef.current >= historyRef.current.length - 1) return
        pointerRef.current++
        setValue(historyRef.current[pointerRef.current])
    }, [])

    const go = useCallback((index: number) => {
        if (index < 0 || index > historyRef.current.length - 1) return
        pointerRef.current = index
        setValue(historyRef.current[pointerRef.current])
    }, [])

    return [
        value,
        set,
        {
            history: historyRef.current,
            pointer: pointerRef.current,
            back,
            forward,
            go,
        },
    ] as const
}

const UseStateWithHistoryExample: FC = () => {
    const [count, setCount, {history, pointer, back, forward, go}] = useStateWithHistory(1)
    const [name, setName] = useState("Kyle")

    useEffect(() => {
        console.log("NEVER EFFECT")
    }, [back, forward, go, setName])

    useEffect(() => {
        console.log("HISTORY EFFECT")
    }, [history])

    useEffect(() => {
        console.log("POINTER EFFECT")
    }, [pointer])

    useEffect(() => {
        console.log("SET EFFECT")
    }, [setCount])

    useEffect(() => {
        console.log("COUNT EFFECT")
    }, [count])

    useEffect(() => {
        console.log("NAME EFFECT")
    }, [name])

    useEffect(() => {
        console.log("-----------")
    })

    return (
        <div>
            <div>{count}</div>
            <div>{history.join(", ")}</div>
            <div>Pointer - {pointer}</div>
            <div>{name}</div>
            <button onClick={() => setCount(currentCount => currentCount * 2)}>
                Double
            </button>
            <button onClick={() => setCount(currentCount => currentCount + 1)}>
                Increment
            </button>
            <button onClick={back}>Back</button>
            <button onClick={forward}>Forward</button>
            <button onClick={() => go(2)}>Go To Index 2</button>
            <button onClick={() => setName("John")}>Change Name</button>
        </div>
    )
}

export default UseStateWithHistoryExample;
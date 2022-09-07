import {createRef, FC, RefObject, useCallback, useEffect, useRef, useState} from "react";


export function useEventListener(event: string, callback: (e: any) => void, element: EventTarget = document) {
    const callbackRef = useRef(callback)

    useEffect(() => {
        callbackRef.current = callback
    }, [callback])

    useEffect(() => {
        console.log("effect")
        const handler = (e:any) => callbackRef.current(e)
        element.addEventListener(event, handler)
        return () => {
            console.log("unmount");
            element.removeEventListener(event, handler)
        };
    }, [event, element])
}

// DONT WORK
function useEventListener2(event: string, callback: (e: any) => void, element: EventTarget = document) {
    // const callbackRef = useRef(callback)
    //
    // useEffect(() => {
    //     callbackRef.current = callback
    // }, [callback])

    useEffect(() => {
        console.log("effect")
        const handler = (e:any) => callback(e)
        element.addEventListener(event, handler)
        return () => {
            console.log("unmount");
            element.removeEventListener(event, handler)
        };
    }, [event, element])
}

// DONT WORK
export function useEventListener3(event: string, callback: (e: any) => void, element: EventTarget = document) {
    // const callbackRef = useRef(callback)
    //
    // useEffect(() => {
    //     callbackRef.current = callback
    // }, [callback])
    const memorizedCB = useCallback(callback,[callback])

    useEffect(() => {
        console.log("effect")
        const handler = (e:any) => memorizedCB(e)
        element.addEventListener(event, handler)
        return () => {
            console.log("unmount");
            element.removeEventListener(event, handler)
        };
    }, [event, element])
}

const UseEventListenerExample: FC = () => {
    const [key, setKey] = useState("")
    const [count, setCount] = useState(0);
    const [type, setType] = useState("keydown");
    const [cb, setCb] = useState(()=>(e:any) => {
        setKey(e.key)
    })

    useEventListener(type, cb);

    return (<>
        <div>Last Key: {key}</div>
        <button onClick={() => setCount(prev => prev + 1)}>{count}</button>
        <button onClick={()=>setType("click")}>{type}</button>
        <button onClick={()=>setCb(()=>(e:any)=>alert(e.key))}>CHANGE CB</button>
    </>)
}

export default UseEventListenerExample;
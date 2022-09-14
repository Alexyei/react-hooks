import {FC, useEffect, useRef, useState} from "react";
import {useToggle} from "./useToggle";
import {useRenderCount} from "./useRenderCount";

export function useDebugInformation(componentName:string, props: {[x:string]:any}) {
    //количество reRender
    const count = useRenderCount()
    const changedProps = useRef({})
    const previousProps = useRef(props)
    const lastRenderTimestamp = useRef(Date.now())

    const propKeys = Object.keys({ ...props, ...previousProps })

    changedProps.current = propKeys.reduce((obj, key) => {
        if (props[key] === previousProps.current[key]) return obj
        return {
            ...obj,
            [key]: { previous: previousProps.current[key], current: props[key] },
        }
    }, {})

    const info = {
        count,
        changedProps: changedProps.current,
        timeSinceLastRender: Date.now() - lastRenderTimestamp.current,
        lastRenderTimestamp: lastRenderTimestamp.current,
    }

    //сначало return затем useEffect
    useEffect(() => {
        previousProps.current = props
        lastRenderTimestamp.current = Date.now()
        console.log("[debug-info]", componentName, info)
    })

    return info
}

const UseDebugInformation:FC = ()=>{
    const [boolean, toggle] = useToggle(false)
    const [count, setCount] = useState(0)
    const [count2, setCount2] = useState(0)

    return (
        <>
            <ChildComponent boolean={boolean} count={count} />
            <button onClick={toggle}>Toggle</button>
            <button onClick={() => setCount(prevCount => prevCount + 1)}>
                Increment
            </button>
            <button onClick={() => setCount2(prevCount => prevCount + 1)}>
                {count2}
            </button>
        </>
    )
}

const ChildComponent:FC<{boolean:boolean, count:number}> = (props)=>{
    const info = useDebugInformation("ChildComponent", props)

    return (
        <>
            <div>{props.boolean.toString()}</div>
            <div>{props.count}</div>
            <div>{JSON.stringify(info, null, 2)}</div>
        </>
    )
}

export default UseDebugInformation;
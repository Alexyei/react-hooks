import {FC, useEffect, useRef} from "react";
import {useToggle} from "./useToggle";

export function useRenderCount(){
    const count = useRef(1)

    useEffect(() => {count.current++})
    return count.current
}

const UseRenderCount:FC = ()=>{
    const [boolean, toggle] = useToggle(false)

    const renderCount = useRenderCount()

    return (
        <>
            <div>{boolean.toString()}</div>
            <div>{renderCount}</div>
            <button onClick={toggle}>Toggle</button>
        </>
    )
}

export default UseRenderCount;
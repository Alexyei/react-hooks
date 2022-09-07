import {FC, useEffect, useRef, useState} from "react";
import {useEventListener} from "./useEventListener";

export function useWindowSize(){
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    })

    useEventListener("resize", () => {
        setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    },window as EventTarget)

    return windowSize
}

const UseWindowSizeExample:FC = ()=>{
    const { width, height } = useWindowSize()

    return (
        <div>
            {width} x {height}
        </div>
    )
}

export default UseWindowSizeExample;
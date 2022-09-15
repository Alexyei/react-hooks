import {createRef, FC, MutableRefObject, RefObject, useEffect, useRef, useState} from "react";
import {useEventListener} from "./useEventListener";

//useEventListener не срабатывает здесь, так как он получает ref.current === null, ref.current получает html-элемент в useEffect, но хуки нельзя вызывать в useEffect
function useHover(ref:MutableRefObject<any>) {
    const [hovered, setHovered] = useState(false)

    console.log(ref.current)
    useEffect(()=>{
        console.log("RERENDER");console.log(ref.current)
        if (ref.current == null) return
        const handlerOver = () => setHovered(true)
        const handlerOut = () => setHovered(false)
        ref.current.addEventListener("pointerover", handlerOver)
        ref.current.addEventListener("pointerout", handlerOut)
        return () => {
            // console.log("unmount");
            ref.current.removeEventListener("pointerover", handlerOver)
            ref.current.removeEventListener("pointerout", handlerOut)
        };

    },[ref.current])

    // useEventListener("mouseover", () => setHovered(true), ref.current)
    // useEventListener("mouseout", () => setHovered(false), ref.current)

    return hovered
}

const UseHover:FC = ()=>{
    const elementRef = useRef<HTMLDivElement>(null)
    const hovered = useHover(elementRef)
    const [count, setCount] = useState(0)

    useEffect(()=>console.log(elementRef.current))
    return (
        <>
        <div
            ref={elementRef}
            style={{
                backgroundColor: hovered ? "blue" : "red",
                width: "100px",
                height: "100px",
                position: "absolute",
                top: "calc(50% - 50px)",
                left: "calc(50% - 50px)",
            }}
        />
        <button onClick={()=>setCount(prev=>prev+1)}>{count}</button></>
    )
}

export default UseHover;
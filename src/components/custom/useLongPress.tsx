import {FC, MutableRefObject, useEffect, useRef} from "react";
import {useEffectOnce} from "./useEffectOnce";
import {useEventListener} from "./useEventListener";
import {useTimeout} from "./useTimeout";

//useEventListener не срабатывает здесь, так как он получает ref.current === null, ref.current получает html-элемент в useEffect, но хуки нельзя вызывать в useEffect
function useLongPress(ref:MutableRefObject<any>, cb:()=>any, delay = 250 ) {
    const { reset, clear } = useTimeout(cb, delay)
    useEffectOnce(clear)

    useEffect(()=>{
        if (ref.current == null) return;
        ref.current.addEventListener("pointerdown",reset)
        ref.current.addEventListener("pointerup",clear)
        ref.current.addEventListener("pointerleave",clear)
        return ()=>{
            ref.current.removeEventListener("pointerdown",reset)
            ref.current.removeEventListener("pointerup",clear)
            ref.current.removeEventListener("pointerleave",clear)
        }
    },[ref.current])

    // useEventListener("mousedown", reset, ref.current)
    // useEventListener("touchstart", reset, ref.current)
    //
    // useEventListener("mouseup", clear, ref.current)
    // useEventListener("mouseleave", clear, ref.current)
    // useEventListener("touchend", clear, ref.current)
}
const UseLongPress:FC = ()=>{
    const elementRef = useRef(null)
    useLongPress(elementRef, () => alert("Long Press"),2000)

    return (
        <div
            ref={elementRef}
            style={{
                backgroundColor: "red",
                width: "100px",
                height: "100px",
                position: "absolute",
                top: "calc(50% - 50px)",
                left: "calc(50% - 50px)",
            }}
        />
    )
}

export default UseLongPress;
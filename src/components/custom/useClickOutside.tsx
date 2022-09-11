import {FC, RefObject, useEffect, useRef, useState} from "react";
 import {useEventListener} from "./useEventListener";


//последний параметр это useCapture, это нужно чтобы колбек выполнился до события клик кнопки

export function useClickOutside(ref:RefObject<HTMLDivElement>,cb:(param:any)=>any){
    useEventListener(
        "click",
        e => {
            if (ref.current == null || ref.current.contains(e.target)) return

            cb(e)
        },
        document,true
    )
}

const UseClickOutsideExample:FC = ()=>{
    const [open, setOpen] = useState(false)
    const modalRef = useRef<HTMLDivElement>(null)

    useClickOutside(modalRef, () => {
        console.log('outside')
        if (open) setOpen(prev=>prev?false:prev)
    })

    return (
        <>
            <button onClick={() => {console.log('click');setOpen(true)}}>Open</button>
            <div
                ref={modalRef}
                style={{
                    display: open ? "block" : "none",
                    backgroundColor: "blue",
                    color: "white",
                    width: "100px",
                    height: "100px",
                    position: "absolute",
                    top: "calc(50% - 50px)",
                    left: "calc(50% - 50px)",
                }}
            >
                <span>Modal</span>
            </div>
        </>
    )
}

export default UseClickOutsideExample;
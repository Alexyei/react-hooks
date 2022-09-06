import {createRef, FC, RefObject, useEffect, useState} from "react";

export function useOutsideClickHandler(ref:RefObject<HTMLElement>, handler:()=>void) {
    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */

        function handleClickOutside(event:any) {
            if (ref.current && !ref.current.contains(event.target)) {
                handler();
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}

const UseOutsideClickHandlerExample:FC = ()=>{
    const [visible, setVisible] = useState(true)
    const divRef = createRef<HTMLDivElement>()

    useOutsideClickHandler(divRef, ()=>setVisible(prev=>!prev))
    return (
        <>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus cum molestiae officia similique voluptas voluptates! Culpa fugiat impedit minima molestias nobis placeat quod sunt. Commodi fugiat in inventore quia totam?</p>
            <h1>{visible.toString()}</h1>
            <div style={{display:'flex',alignItems:'center',justifyContent:'center', backgroundColor:'rgba(100,100,100,0.5)',height:'100px'}} ref={divRef}>НАЖМИ НЕ НА МЕНЯ</div>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus cum molestiae officia similique voluptas voluptates! Culpa fugiat impedit minima molestias nobis placeat quod sunt. Commodi fugiat in inventore quia totam?</p>
        </>
    )
}

export default UseOutsideClickHandlerExample
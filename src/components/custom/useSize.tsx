import {createRef, FC, RefObject, useEffect,  useState} from "react";
export function useSize<T extends Element,>(ref: RefObject<T>){
    const [size, setSize] = useState({})

    useEffect(() => {
        if (ref.current == null) return
        const observer = new ResizeObserver(([entry]) => setSize(entry.contentRect))
        observer.observe(ref.current)
        return () => observer.disconnect()
    }, [ref])

    return size
}
const UseSize:FC = ()=>{
    const ref = createRef<HTMLTextAreaElement>()
    const size = useSize(ref)

    //x,y === left,top === paddingLeft, paddingTop
    return (
        <>
            <div>{JSON.stringify(size)}</div>
            <textarea style={{margin:'30px',paddingLeft:'10px', paddingRight:'15px',paddingTop:'17px', paddingBottom:'18px'}} ref={ref}></textarea>
        </>
    )
}

export default UseSize;
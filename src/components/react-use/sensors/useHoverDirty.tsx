import {FC, useRef} from "react";
import {useHover, useHoverDirty} from "react-use";

const UseHoverDirtyExampleReactUse:FC = ()=>{

    const divRef = useRef<HTMLDivElement>(null)
    const hovered = useHoverDirty(divRef);

    const hoverable = (
        <div ref={divRef} style={{width:'100px',height:'100px',backgroundColor:hovered ? "red":"blue",display:'flex',justifyContent:'center',alignItems:'center'}}>
            Hover me! {hovered && 'Thanks!'}
        </div>)


    return (
        <div>
            {hoverable}
            <div>{hovered ? 'HOVERED' : ''}</div>
        </div>
    );
}

export default UseHoverDirtyExampleReactUse;
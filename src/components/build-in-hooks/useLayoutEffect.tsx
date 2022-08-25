import {createRef, FC, useEffect, useLayoutEffect, useRef, useState} from "react";
import Clock from "./components/useLayoutEffect/Clock";

//UseLayoutEffect является аналогом useEffect
const UseLayoutEffectExample: FC = () => {
    const [calculating, setCalculating] = useState(false)
    const [calculatingSinc, setCalculatingSinc] = useState(false)

    useEffect(()=>{
        console.log("useEffect")
    },[])

    useLayoutEffect(()=>{
        console.log("useLayoutEffect")
    },[])

    useEffect(() => {
        //вычисление
        //calc false
        if (calculating){
            doHardWork()
            setCalculating(false)
        }
    },[calculating])

    function doHardWork(){
        for(let i = 0; i<100000000000;++i)
            Math.random()
    }

    useLayoutEffect(() => {
        //вычисление
        //calc false
        if (calculatingSinc){
            doHardWork()
            setCalculatingSinc(false)
        }
    },[calculatingSinc])

    console.log('render')
    return (
        <>
            <Clock/>
            {!calculating ? <>
                    <button onClick={()=>setCalculating(true)}>Запустить useEffect (синхронный)</button>
                    <button onClick={()=>setCalculatingSinc(true)}>Запустить useLayoutEffect (синхронный)</button>
                </>
                : <p>Вычисление эффекта...</p>}
            <UseEffectPopup />
            <UseLayoutEffectPopup/>
        </>
    )
}

export default UseLayoutEffectExample;


const UseEffectPopup:FC = ()=>{
    const popup = createRef<HTMLDivElement>()
    const button = createRef<HTMLButtonElement>()
    const [show, setShow] = useState(false)
    const [top, setTop] = useState('')

    useEffect(()=>{
        if (!show){
            setTop('')
        }
        if (show && button.current)
        {
            const {bottom} =button.current.getBoundingClientRect();

            // popup.current!.style.top = `${bottom+125}px`;
            setTop(`${bottom+125}px`)
        }
    },[show])

    return (
        <>
            <button onClick={()=>setShow((prev)=>!prev)} ref={button}>Show Effect popup</button>
            {show && <div style={{position: "absolute", padding: '10px', backgroundColor: 'yellow', transition: 'all 2s', top: top}} ref={popup}>
                This is a popup
            </div>}
        </>
    )
}

const UseLayoutEffectPopup:FC = ()=>{
    const popup = createRef<HTMLDivElement>()
    const button = createRef<HTMLButtonElement>()
    const [show, setShow] = useState(false)
    const [top, setTop] = useState('')

    useLayoutEffect(()=>{
        if (!show){
            setTop('')
        }
        if (show && button.current)
        {
            const {bottom} =button.current.getBoundingClientRect();

            // popup.current!.style.top = `${bottom+125}px`;
            setTop(`${bottom+125}px`)
            // setTimeout(()=>{
            //     // setTop(`${bottom+125}px`)
            //     popup.current!.style.top = `${bottom+125}px`;
            // })
        }
    },[show])

    return (
        <>
            <button onClick={()=>setShow((prev)=>!prev)} ref={button}>Show Layout Effect popup</button>
            {show && <div style={{position: "absolute", padding: '10px', left:'100px', backgroundColor: 'yellow', transition: 'all 2s', top: top}} ref={popup}>
                This is a popup
            </div>}
        </>
    )
}

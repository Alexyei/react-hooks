import {ChangeEvent, createRef, FC, ForwardedRef, forwardRef, useEffect, useRef, useState} from "react";

//useRef используется для создание неуправлямых состояний и компонентов
const UseRefExample: FC = () => {
    const [name, setName] = useState('')
    // const [renderCount, setRenderCount] = useState(0)
    const renderCount = useRef(1)
    const prevName = useRef(name)

    const inputRef = createRef<HTMLInputElement>()

    const [customRef1, customRef2, customRef3] = [createRef<HTMLInputElement>(), createRef<HTMLInputElement>(), createRef<HTMLInputElement>()]

    useEffect(()=>{
        //ОШИБКА: изменение состония -> вызов useEffect -> изменение состояние -> вызов useEffect ... => зацикливание
        // setRenderCount((prevCount=>prevCount+1))

        //ПРАВИЛЬНО: изменение состояние useRef не вызвает useEffect, и не вызывает перерисовку (перерисовка выполянется из-за изменения name)
        renderCount.current = renderCount.current +1;

        //ПРЕДУПРЕЖДЕНИЕ: В React.StrictMode счётчик показывает лишнюю перерисовку
        console.log("render!"+renderCount.current)
    })

    useEffect(()=>{
        prevName.current = name
        console.log(prevName)
        console.log('EFFECT')
    },[name])

    function handleClick(){
        console.log(inputRef.current)
        console.log(inputRef.current?.value)
        inputRef.current?.focus()
    }

    function handleChange(e:ChangeEvent<HTMLInputElement>){
        setName(e.target.value)
    }

    console.log('RENDER')
    return (
        <>
            <input ref={inputRef} value={name} onChange={handleChange}/>
            <p>Name is: {name}</p>
            <p>PrevName is: {prevName.current}</p>
            <p>Component rendered {renderCount.current} times</p>
            <button onClick={handleClick}>Focus input!</button>
            <CustomInput ref={customRef1} value={name} onChange={handleChange}/>
            <button onClick={()=>customRef1.current?.focus()}>Focus custom input 1!</button>
            <CustomInputCustomRefProps outerRef={customRef2} value={name} onChange={handleChange}/>
            <button onClick={()=>customRef2.current?.focus()}>Focus custom input 2!</button>
            <CustomInputRefProps ref={customRef3} value={name} onChange={handleChange}/>
            <button onClick={()=>customRef3.current?.focus()}>Focus custom input 3!</button>
        </>
    )
}

const CustomInput = forwardRef<HTMLInputElement,{value:string, onChange:(e:ChangeEvent<HTMLInputElement>)=>void}>((props, ref)=>{
    return (<input ref={ref} {...props} />)
})

const CustomInputCustomRefProps:FC<{outerRef: ForwardedRef<HTMLInputElement>,value:string, onChange:(e:ChangeEvent<HTMLInputElement>)=>void}> = ({outerRef,...props})=>{
    return (<input ref={outerRef} {...props} />)
}

//ПРОВЕРЯЕМ что ref атрибут не передаётся через props
const CustomInputRefProps:FC<{ref: ForwardedRef<HTMLInputElement>,value:string, onChange:(e:ChangeEvent<HTMLInputElement>)=>void}> = ({ref,...props})=>{
    console.log("ref: ",ref)
    return (<input ref={ref} {...props} />)
}



export default UseRefExample;
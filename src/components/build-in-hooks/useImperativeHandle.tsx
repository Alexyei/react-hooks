import {ChangeEvent, createRef, FC, forwardRef, useImperativeHandle, useRef, useState} from "react";

//useImperativeHandle нужен чтобы изменить ref на свобственный объект, чтобы управлять логикой ref во внутреннем компннете, а во внешний передовать только удобный интерфейс
//синтаксисис очень похож на useMemo: первый аргумент колбек возвращющий значение, второй - массив зависимостей
const UseImperativeHandleExample: FC = () => {
    const [value, setValue] = useState('')
    const [open, setOpen] = useState(false)
    const inputRef = createRef<HTMLInputElement>()
    const imperativeHandleRef = createRef<{ alertValue: () => void }>()
    const modalRef = createRef<CustomModalRef>()

    // const imperativeHandleRef = useRef<{alertValue: ()=>void}>()
    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setValue(e.target.value)
    }



    return (
        <>
            <CustomInput value={value} onChange={handleChange} ref={inputRef}/>
            <button onClick={() => inputRef.current?.focus()}>Focus</button>
            <CustomInputImperativeHandle value={value} onChange={handleChange} ref={imperativeHandleRef}/>
            <button onClick={() => imperativeHandleRef.current?.alertValue()}>Alert value</button>
            <div>
                <button onClick={() => setOpen(true)}>Open Modal</button>
                <div>
                    <button onClick={() => modalRef.current?.closeFocus()}>Focus Close</button>
                    <button onClick={() =>{console.log(modalRef.current); modalRef.current?.confirmFocus()}}>Focus Confirm</button>
                    <button onClick={() => modalRef.current?.denyFocus()}>Focus deny</button>
                </div>
                <CustomModal isOpen={open} title={'Модальное окно'} onClose={() => setOpen(false)} ref={modalRef}/>
            </div>
        </>
    )
}


const CustomInput = forwardRef<HTMLInputElement, { value: string, onChange: (e: ChangeEvent<HTMLInputElement>) => void }>((props, ref) => {
    return (
        <input ref={ref} {...props}/>
    )
})

const CustomInputImperativeHandle = forwardRef<{ alertValue: () => void }, { value: string, onChange: (e: ChangeEvent<HTMLInputElement>) => void }>((props, ref) => {
    useImperativeHandle(ref, () => {
        return {alertValue: () => alert(props.value)}
    }, [props.value])

    return (
        <input {...props}/>
    )
})

type CustomModalRef = {
    denyFocus: () => void,
    confirmFocus: () => void,
    closeFocus: () => void
}

const CustomModal = forwardRef<CustomModalRef, { isOpen: boolean, title: string, onClose: () => void }>(({
                                                                                                             isOpen,
                                                                                                             onClose,
                                                                                                             title
                                                                                                         }, ref) => {


    const denyBtn = createRef<HTMLButtonElement>()
    const confirmBtn = createRef<HTMLButtonElement>()
    const closeBtn = createRef<HTMLButtonElement>()

    useImperativeHandle(ref, () => {
        return {
            denyFocus: () => denyBtn.current?.focus(),
            confirmFocus: () => confirmBtn.current?.focus(),
            closeFocus: () => closeBtn.current?.focus()
        }
    }, [])

    if (!isOpen) return null;

    return (
        <div>
            <button onClick={onClose} ref={closeBtn}>&times;</button>
            <h1>{title}</h1>
            <div>
                <button ref={confirmBtn}>Confirm</button>
                <button ref={denyBtn}>Deny</button>
            </div>
        </div>
    )
})

export default UseImperativeHandleExample;


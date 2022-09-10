import {FC, useCallback, useState} from "react";

export function useStateWithValidation<T,>(validate:(value:T)=>boolean,defaultValue: T | (()=>T)){
    const [value, setValue] = useState(defaultValue)
    const [isValid, setIsValid] = useState(()=>validate(value))

    const setWithValidation = useCallback((newValue:T | ((prev:T)=>T))=>{
        const currentValue = typeof newValue === 'function' ? (newValue as (prev:T)=>T)(value) : newValue;
        // const validationResult =  validate(currentValue)
        setValue(currentValue)
        setIsValid(validate(currentValue))
        // if (validationResult){
        //     setValue(value)
        //     setIsValid(true)
        // }
        // else{
        //     setIsValid(false)
        // }
    },[validate])

    return [value, setWithValidation, isValid] as const
}

const UseStateWithValidation:FC = ()=>{
    const [username, setUsername, isValid] = useStateWithValidation(
        name => name.length > 5,
        ""
    )

    const validateEmail = (email:string) => {
        return !!email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    const [email, setEmail, isValidEmail] = useStateWithValidation(
        validateEmail,
        ()=>""
    )

    const [count, setCount, isValidCount] = useStateWithValidation(
        count => count > 5,
        0
    )


    return (
        <>
            <div>Valid: {isValid.toString()}</div>
            <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
            />
            <div>Valid: {isValidEmail.toString()}</div>
            <input
                type="text"
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
            <div>Valid: {isValidCount.toString()}</div>
            <input
                type="number"
                value={count}
                onChange={e => setCount(prev=>prev+1)}
            />
        </>
    )
}

export default UseStateWithValidation;
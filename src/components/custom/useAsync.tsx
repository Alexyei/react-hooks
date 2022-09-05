import {FC, useCallback, useEffect, useState} from "react";

export function useAsync<ValueType, ErrorType>(callback:()=>Promise<ValueType>, dependencies:any[] = []){
    const [loading, setLoading] = useState(true);
    const [value,setValue] = useState<ValueType | null>(null)
    const [error,setError] = useState<ErrorType | null>(null)


    const memorizedCallback = useCallback(()=>{
        setLoading(true);
        setValue(null);
        setError(null)

        callback()
            .then(value=>setValue(value))
            .catch(error=>setError(error))
            .finally(()=>setLoading(false))
            .finally(()=>{
                console.log(loading)
                console.log(value)
                console.log(error)
                console.log('-----------')
            })
    },dependencies)

    useEffect(()=>{
        memorizedCallback()
    },[memorizedCallback])

    return {loading,error,value};
}

const UseAsyncExample:FC = ()=>{
    const [toggle ,setToggle] = useState(true)
    const [number, setNumber] = useState(0)
    const { loading, error, value } = useAsync<string,string>(() => {
        return new Promise((resolve, reject) => {
            console.log("start promise")
            const success = toggle
            setTimeout(() => {
                success ? resolve("Hi") : reject("Error message")
            }, 1000)
        })
    },[toggle])

    return (
        <div>
            <div>Loading: {loading.toString()}</div>
            <div>{error}</div>
            <div>{value}</div>
            <button onClick={()=>setToggle(prev=>!prev)}>SEND</button>
            <button onClick={()=>setNumber(prev=>prev+1)}>{number}</button>
        </div>
    )
}

export default UseAsyncExample;
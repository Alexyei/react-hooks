import {FC, useState} from "react";
import {useAsync} from "./useAsync";


export function useFetch<ValueType,ErrorType>(url:string,options:{[x:string]:any},dependencies:any[]=[]){
    // const DEFAULT_HEADERS = {['Content-Type']:'application/json;charset=utf-8'}

    const DEFAULT_OPTIONS = {
        headers: { "Content-Type": "application/json;charset=utf-8" },
    }

    //{headers: {...DEFAULT_HEADERS,...headers}}
    return useAsync<ValueType,ErrorType>(()=>{
        return fetch(url,{...DEFAULT_OPTIONS,...options} ).catch(error=>Promise.reject(error?.message))
            .then(response=>{

                if (response.ok) return response.json()
                return Promise.reject("ERROR MESSAGE")
            })

    },dependencies)
}

const UseFetchExample:FC = ()=>{
    const [id, setId] = useState(1)
    const [number, setNumber] = useState(0)
    const [sendTHis, setSendThis] = useState(true)


    const { loading, error, value } = useFetch<{title:string},string>(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
        {},
        [id,sendTHis]
    )

    return (
        <div>
            <div>{id}</div>
            <button onClick={() => setId(prevId => prevId + 1)}>
                Increment ID
            </button>
            <button onClick={() => setId(-1)}>
                Error ID
            </button>
            <button onClick={()=>setSendThis(prev=>!prev)}>Send THis</button>
            <div>Loading: {loading.toString()}</div>
            <div>{JSON.stringify(error, null, 2)}</div>
            <div>{JSON.stringify(value?.title, null, 2)}</div>
            <button onClick={()=>setNumber(prev=>prev+1)}>{number}</button>
        </div>
    )
}

export default UseFetchExample;
import {FC, useCallback, useEffect, useState} from "react";

export function useLocalStorage<T,>(key:string, defaultValue:T) {
    return useStorage(key, defaultValue, window.localStorage)
}

export function useSessionStorage<T,>(key:string, defaultValue:T) {
    return useStorage(key, defaultValue, window.sessionStorage)
}



function useStorage<T,>(key:string, defaultValue:(()=>T)|T, storageObject:Storage) {

    const getSavedValue = useCallback(function getSavedValue<T,>(key:string, defaultValue:(()=>T)|T, storageObject:Storage){
        const jsonValue = storageObject.getItem(key)
        if (jsonValue != null) return JSON.parse(jsonValue) as T

        if (typeof defaultValue === "function") {
            return (defaultValue as ()=>T)()
        } else {
            return defaultValue
        }
    },[key, defaultValue,storageObject])

    const [value, setValue] = useState<T | undefined>(() => {
        return getSavedValue(key, defaultValue, storageObject)
    })

    useEffect(() => {
        if (value === undefined) return storageObject.removeItem(key)
        storageObject.setItem(key, JSON.stringify(value))
    }, [key, value, storageObject])

    const remove = useCallback(() => {
        setValue(undefined)
    }, [])

    return [value, setValue, remove] as const
}

const UseStorageExample:FC = ()=>{
    const [name, setName, removeName] = useSessionStorage("name", "Kyle")
    const [age, setAge, removeAge] = useLocalStorage("age", 26)

    return (
        <div>
            <div>
                {name} - {age}
            </div>
            <button onClick={() => setName("John")}>Set Name</button>
            <button onClick={() => setAge(40)}>Set Age</button>
            <button onClick={removeName}>Remove Name</button>
            <button onClick={removeAge}>Remove Age</button>
        </div>
    )
}

export default UseStorageExample;
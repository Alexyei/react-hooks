import {FC, useState} from "react";

export function useArray<T,>(defaultValue:T[] = []){
    const [array, setArray] = useState(defaultValue)

    function set(value:T[]){
        setArray(value)
    }

    function push(element:T){
        setArray(prev=>[...prev, element])
    }

    function filter(callback:(value:T,index:number,array:T[])=>boolean){
        setArray(prev=>prev.filter(callback))
    }

    function update(index:number, newElement:T){
        setArray(prev=>[...prev.slice(0,index),newElement,...prev.slice(index+1)])
    }

    function remove(index:number){
        setArray(prev=>[...prev.slice(0,index),...prev.slice(index+1)])
    }

    function clear(){
        setArray([])
    }

    return {array,set, push, clear, remove, update, filter}
}

const UseArrayExample:FC = ()=>{
    const {array,set, push, clear, remove, update, filter} = useArray([1,2,3,4,5,6])
    return(<div>
        <div>{array.join(", ")}</div>
        <button onClick={()=>push(7)}>Add 7</button>
        <button onClick={()=>update(1,9)}>Change Second Element To 9</button>
        <button onClick={()=>remove(1)}>Remove Second Element</button>
        <button onClick={()=>filter(n=>n<3)}>Keep Numbers Less Than 4</button>
        <button onClick={()=>set([1,2])}>Set to 1, 2</button>
        <button onClick={clear}>Clear</button>
    </div>)
}

export default UseArrayExample;

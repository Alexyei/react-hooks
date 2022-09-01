import {useEffect} from "react";

export default function useUpdateLogger<T,>(value:T){
    useEffect(()=>{
        console.log(value)
    },[value])
}

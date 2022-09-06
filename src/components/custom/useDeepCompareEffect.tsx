import {createRef, FC, useEffect, useRef, useState} from "react";
import {isEqual} from "lodash"

function useDeepCompareEffect(callback:()=>any,dependencies:any[]){
    const currentDependenciesRef = useRef<any[]>()

    if (!isEqual(currentDependenciesRef.current, dependencies)) {
        currentDependenciesRef.current = dependencies
    }

    useEffect(callback, [currentDependenciesRef.current])
}

const UseDeepCompareEffect: FC = () => {
    const [age, setAge] = useState(0)
    const [otherCount, setOtherCount] = useState(0)
    const useEffectCountRef = createRef<HTMLSpanElement>()
    const useDeepCompareEffectCountRef = createRef<HTMLSpanElement>()

    const person = {age: age, name: "Kyle"}

    useEffect(() => {
        if (useEffectCountRef.current) {
            useEffectCountRef.current.textContent = (1 + parseInt(useEffectCountRef.current.textContent as string)).toString()
        }
    }, [person])

    useDeepCompareEffect(() => {
        if (useDeepCompareEffectCountRef.current) {
            useDeepCompareEffectCountRef.current.textContent = (parseInt(useDeepCompareEffectCountRef.current.textContent as string) + 1).toString()
        }
    }, [person])

    return (
        <div>
            <div>
                useEffect: <span ref={useEffectCountRef}>0</span>
            </div>
            <div>
                useDeepCompareEffect: <span ref={useDeepCompareEffectCountRef}>0</span>
            </div>
            <div>Other Count: {otherCount}</div>
            <div>{JSON.stringify(person)}</div>
            <button onClick={() => setAge(currentAge => currentAge + 1)}>
                Increment Age
            </button>
            <button onClick={() => setOtherCount(count => count + 1)}>
                Increment Other Count
            </button>
        </div>
    )
}

export default UseDeepCompareEffect;
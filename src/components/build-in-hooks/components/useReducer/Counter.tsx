import {FC, useEffect} from "react";
import useCount, {CountActionType, initUseCountArg} from "./countReducer";

const Counter:FC<{initValue: initUseCountArg}> = ({initValue})=>{
    const [countState, countDispatch] = useCount(initValue)

    useEffect(()=>{
        console.log("COUNT__STATE CHANGED!")
    },[countState])

    return (
        <>
            <button onClick={() => countDispatch({type: CountActionType.INCREMENT})}>+</button>
            <span> Count: {countState.count} </span>
            <button onClick={()=>countDispatch({type: CountActionType.DECREMENT})}>-</button>
            <br/>
            <label>Step: {countState.step}</label>
            <input type='range' value={countState.step} min={1} max={10} onChange={(e)=>countDispatch({type: CountActionType.UPDATE_STEP, payload: parseInt(e.target.value)})}/>
            <button onClick={()=>countDispatch({type:CountActionType.RESET})}>Reset</button>
            <button onClick={()=>countDispatch({type:CountActionType.NO_USE_EFFECT})}>NO USE EFFECT</button>
        </>
    )
}

export default Counter;
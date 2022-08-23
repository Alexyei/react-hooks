import {FC, useEffect, useState} from "react";

const Clock:FC = ()=>{
    const [timerID, setTimerID] = useState(0)
    const [currentTime, setCurrentTime] = useState(new Date())

    function tick(){
        setCurrentTime(new Date())
    }

    useEffect(()=>{
        setTimerID(window.setInterval(tick,1000))
        return window.clearInterval(timerID)
    },[])



    return (
        <>
            <h2>Сейчас {currentTime.toLocaleTimeString()}</h2>
        </>
    )
}

export default Clock;
import {FC, useState} from "react";
import {useEventListener} from "./useEventListener";

export function useOnlineStatus(){
    const [online, setOnline] = useState(navigator.onLine)

    useEventListener("online", () => setOnline(navigator.onLine),window)
    useEventListener("offline", () => setOnline(navigator.onLine),window)

    return online
}

const UseOnlineStatus:FC = ()=>{
    const online = useOnlineStatus()

    return <div>{online.toString()}</div>
}

export default UseOnlineStatus;
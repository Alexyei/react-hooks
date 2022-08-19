import {createContext, FC, ReactNode, useContext, useState} from "react";

export const UserContext = createContext<[{login:string}|undefined,()=>void]>([undefined,()=>{}])

const UserProvider:FC<{children:ReactNode}> = ({children})=>{
    const [userData, setUserData] = useState<{login:string}>();

    function ToggleUser(){
        setUserData(prev=>prev !== undefined ? undefined : {login:'user123'})
    }

    return (
        <UserContext.Provider value={[userData, ToggleUser]}>
            {children}
        </UserContext.Provider>
    )
}

export function useUser(){
    return useContext(UserContext)
}

export default UserProvider;
import {FC, useCallback, useState} from "react";

import Cookies from "js-cookie"

export function useCookie(name:string, defaultValue:string) {
    const [value, setValue] = useState<string | null>(() => {
        const cookie = Cookies.get(name)
        if (cookie !== undefined) return cookie
        Cookies.set(name, defaultValue)
        return defaultValue
    })

    const updateCookie = useCallback(
        (newValue:string, options?:Parameters<typeof Cookies.set>[2]) => {
            Cookies.set(name, newValue, options)
            setValue(newValue)
        },
        [name]
    )

    const deleteCookie = useCallback(() => {
        Cookies.remove(name)
        setValue(null)
    }, [name])

    return [value, updateCookie, deleteCookie] as const
}

const UseCookie:FC = () => {
    const [value, update, remove] = useCookie("name", "John")

    return (
        <>
            <div>{value}</div>
            <button onClick={() => update("Sally")}>Change Name To Sally</button>
            <button onClick={remove}>Delete Name</button>
        </>
    )
}

export default UseCookie;
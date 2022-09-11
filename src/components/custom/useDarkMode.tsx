import {FC, useEffect} from "react";
import {useLocalStorage} from "./useStorage";
import {useMediaQuery} from "./useMediaQuery";

export function useDarkMode() {
    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)")
    const [darkMode, setDarkMode] = useLocalStorage("useDarkMode",prefersDarkMode)
    // const enabled = darkMode ?? prefersDarkMode

    useEffect(() => {
        document.body.classList.toggle("dark-mode", darkMode)
    }, [darkMode])

    return [darkMode, setDarkMode] as const
}

const UseDarkModeExample:FC = ()=>{
    const [darkMode, setDarkMode] = useDarkMode()

    return (
    <button
        onClick={() => setDarkMode(prevDarkMode => !prevDarkMode)}
        style={{
            border: `1px solid ${darkMode ? "white" : "black"}`,
            background: "none",
            color: darkMode ? "white" : "black",
        }}
    >
        Toggle Dark Mode
    </button>
)}

export default UseDarkModeExample;
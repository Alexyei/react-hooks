import {createContext, FC, ReactNode,  useContext, useState} from "react";

export const ThemeContext =  createContext< [boolean, ()=>void]>([true, ()=> {console.log("default")}])

const ThemeProvider:FC<{children: ReactNode}> = ({children})=>{
    const [darkTheme, setDarkTheme] = useState(true)

    function toggleTheme(){
        console.log("toggle")
        setDarkTheme(prev =>!prev)
    }
    // const ThemeContext =  createContext([darkTheme, setDarkTheme])
 return (
     <ThemeContext.Provider value={[darkTheme, toggleTheme]}>
         {children}
     </ThemeContext.Provider>
 )
}


export const useTheme = () =>{
    return useContext(ThemeContext)
}

export default ThemeProvider;
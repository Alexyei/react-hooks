import {createContext, FC, useState} from "react";
import FunctionContextComponent from "./components/useContext/FunctionContextComponent";
import ClassContextComponent from "./components/useContext/ClassContextComponent";
import FunctionContextComponentUseContext from "./components/useContext/FunctionContextComponentUseContext";

export const ThemeContext = createContext(false);

//Context это глобальное сотсояние, которое может быть полученно всеми вложенными элементами
const UseContextExample:FC = ()=>{
    const [darkTheme, setDarkTheme] = useState(true)

    function toggleTheme(){
        setDarkTheme(prevTheme => !prevTheme)
    }

    return (
        <>
            <ThemeContext.Provider value={darkTheme}>
                <button onClick={toggleTheme}>Toggle Theme</button>
                <FunctionContextComponent/>
                <FunctionContextComponentUseContext/>
                <ClassContextComponent/>
            </ThemeContext.Provider>
        </>
    );
}

export default UseContextExample;
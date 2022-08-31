import { FC, useEffect} from "react";
import ThemeProvider, {useTheme} from "./components/useContext/ThemeContext";
import UserProvider, {useUser} from "./components/useContext/UserContext";
import CounterProvider, {useCounterContext} from "./components/useContext/CountContext";

// export const ThemeContext = createContext(false);

//Context это глобальное сотсояние, которое может быть полученно всеми вложенными элементами
const UseContextRefactoringExample: FC = () => {
    const [darkTheme, toggleTheme] = useTheme()

    useEffect(() => {
        console.log("Theme Updated!")
    }, [darkTheme])
    return (
        <>
            <ThemeProvider>
                <button onClick={toggleTheme}>Toggle Theme</button>
                <div style={{
                    'backgroundColor': darkTheme ? "black" : "white",
                    'color': darkTheme ? 'white' : 'black'
                }}>Text
                </div>
                <InnerComponent/>
                <UserProvider>
                <InnerComponent/>
                    <InnerComponent2/>
                </UserProvider>
                <CounterProvider>
                    <Counter/>
                    <Counter/>
                    <Counter/>
                </CounterProvider>
                {/*<FunctionContextComponent/>*/}
                {/*<FunctionContextComponentUseContext/>*/}
                {/*<ClassContextComponent/>*/}
            </ThemeProvider>
        </>
    );
}

const Counter: FC = () => {
    const [count, increment, decrement] = useCounterContext()

    return (<div>
        <button onClick={decrement}>DECREMENT</button>
        <button onClick={increment}>INCREMENT</button>
        <span>{count}</span>
    </div>)
}

const InnerComponent: FC = () => {
    const [darkTheme, toggleTheme] = useTheme()
    return (
        <>
            <button onClick={toggleTheme}>Toggle Theme</button>
            <div
                style={{'backgroundColor': darkTheme ? "black" : "white", 'color': darkTheme ? 'white' : 'black'}}>Inner
            </div>
        </>
    )
}

const InnerComponent2: FC = () => {
    const [darkTheme, toggleTheme] = useTheme()
    const [userData, toggleUser] = useUser()
    return (
        <>
            <button onClick={toggleTheme}>Toggle Theme</button>
            <button onClick={toggleUser}>{userData ? `welcome, ${userData.login}`:'Log in'}</button>
            <div
                style={{'backgroundColor': darkTheme ? "black" : "white", 'color': darkTheme ? 'white' : 'black'}}>Inner 2
            </div>
        </>
    )
}

export default UseContextRefactoringExample;

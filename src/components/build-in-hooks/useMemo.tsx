import {CSSProperties, FC, useEffect, useMemo, useState} from "react";

const UseMemoExample: FC = () => {
    const [number, setNumber] = useState(0);
    const [darkTheme, setDarkTheme] = useState(true)
    const themeStyles:  CSSProperties = {
        backgroundColor: darkTheme ? 'black' : 'white',
        color: darkTheme ? 'white' : 'black'
    }

    useEffect(()=>{
        console.log("Theme changed")
    }, [themeStyles])

    //1. случай использования useMemo (хэширование значения)
    // Сейчас slowValue вычисляется при любом изменении состояния компонента (например darkTheme)
    // Нажмём кнопку Change Theme
    // Это приводит к фризам интерфейса
    // используем вместо функции useMemo
    function slowValue(){
        console.log("start calculating 1")
        for(let i=0;i<1000000000;++i){
            //с рандомом ещё медленее
            // Math.random()
        }
        return number*2;
    }
    const slowValueMemorized = useMemo(()=>slowValue(),[number])
    //теперь при нажатии кнопки фризов нет

    //2. Случай использования useMemo (сохранение исходного объекта)
    //Сейчас при каждом обновлении интерфейса константе themeStyles, присваивается новый объект
    // Вследствии этого срабатывает useEffect, хотя цветовая тема осталось прежней
    // так как предыдущий themeStyles не равен текущему (разные ссылки на объект)
    // Мы можем возвращать объект из useMemo тогда useEffect не будет срабатывать лишний раз
    const themeStylesMemorized:  CSSProperties = useMemo(()=>({
        backgroundColor: darkTheme ? 'black' : 'white',
        color: darkTheme ? 'white' : 'black'
    }),[darkTheme]);

    useEffect(()=>{
        console.log("MEMORIZED Theme changed")
    }, [themeStylesMemorized])

    // Когда мы изменяем значение в инпут
    // В консоли: Theme changed
    // Но в консоли нет: MEMORIZED Theme changed

    return (
        <div>
            <input type="number" value={number} onChange={(e) => setNumber(parseInt(e.target.value))}/>
            <button onClick={()=>setDarkTheme(prevTheme=>!prevTheme)}>Change theme</button>
            <div style={themeStylesMemorized}>{slowValueMemorized}</div>
        </div>
    )


}

export default UseMemoExample;

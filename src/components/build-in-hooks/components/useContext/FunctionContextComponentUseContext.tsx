import {CSSProperties, FC, useContext, useMemo} from "react";
import {ThemeContext} from "../../useContext";

const FunctionContextComponent: FC = () => {
    const darkTheme = useContext(ThemeContext)
    const themeStyles:CSSProperties = useMemo(()=>{
        return {
            backgroundColor: darkTheme ? '#333' : '#CCC',
            color: darkTheme ? '#CCC': '#333',
            padding: '2rem',
            margin: '2rem'
        }
    },[darkTheme])


    return (
        <div style={themeStyles}>Function Theme Use Context</div>
    )
}

export default FunctionContextComponent;
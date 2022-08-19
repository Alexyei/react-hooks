import {CSSProperties, FC} from "react";
import {ThemeContext} from "../../useContext";

const FunctionContextComponent: FC = () => {
    const themeStyles = (dark:boolean):CSSProperties=>{
        return {
            backgroundColor: dark ? '#333' : '#CCC',
            color: dark ? '#CCC': '#333',
            padding: '2rem',
            margin: '2rem'
        }
    }


    return (
        <ThemeContext.Consumer>
            {
                theme=><div style={themeStyles(theme)}>Function Theme</div>
            }
        </ThemeContext.Consumer>
    )
}

export default FunctionContextComponent;
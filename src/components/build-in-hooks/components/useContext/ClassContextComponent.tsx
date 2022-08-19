import {Component, ContextType, CSSProperties} from "react";
import {ThemeContext} from "../../useContext";

export default class ClassContextComponent extends Component{
    // declare context: ContextType<typeof ThemeContext>

    themeStyles(dark:boolean):CSSProperties{
        return {
            backgroundColor: dark ? '#333' : '#CCC',
            color: dark ? '#CCC': '#333',
            padding: '2rem',
            margin: '2rem'
        }
    }

    render(){
        return (
            <>
            <ThemeContext.Consumer>
                {darkTheme =>
                    <div style={this.themeStyles(darkTheme)}>Class Theme</div>
                }
            </ThemeContext.Consumer>

                {/*<div style={this.themeStyles(this.context)}>Class Theme this</div>*/}
            </>
        )
    }
}
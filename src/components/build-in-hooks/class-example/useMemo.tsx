import {Component, CSSProperties} from "react";

interface IProps{

}

interface IState{
    number: number;
    darkTheme: boolean;
}

export default class UseMemoClassExample extends Component<IProps, IState>{
    themeStylesMemorized:  CSSProperties = {};
    slowValueMemorized: number = 0;

    themeStylesMemorizedInit(darkTheme: boolean){
        this.themeStylesMemorized = {
            backgroundColor: darkTheme ? 'black' : 'white',
            color: darkTheme ? 'white' : 'black'
        }

    }

    slowValue(number:number){
        console.log("start calculating 1")
        for(let i=0;i<1000000000;++i){
            //с рандомом ещё медленее
            // Math.random()
        }
        return number*2;
    }

    constructor(props:IProps) {
        super(props);
        this.state = {
            number: 0,
            darkTheme: true
        }
        this.themeStylesMemorizedInit(this.state.darkTheme)
        this.slowValueMemorized = this.slowValue(this.state.number);
    }

    shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {
        if (this.state.number !== nextState.number){
            this.slowValueMemorized = this.slowValue(nextState.number);
        }
        if (this.state.darkTheme !== nextState.darkTheme){
            this.themeStylesMemorizedInit(nextState.darkTheme);
        }
        return true;
    }

    render(){
        const {number} = this.state

        return (<div>
            <input type="number" value={number} onChange={(e) => this.setState(()=>({number:parseInt(e.target.value)}))}/>
            <button onClick={()=>this.setState((prevTheme,props)=>({darkTheme: !prevTheme.darkTheme}))}>Change theme</button>
            <div style={this.themeStylesMemorized}>{this.slowValueMemorized}</div>
        </div>)
    }

}

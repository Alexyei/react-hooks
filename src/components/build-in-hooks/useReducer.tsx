import {FC} from "react";
import Counter from "./components/useReducer/Counter";
import TodoList from "./components/useReducer/TodoList";

//useReducer - это аналог useState, однако он определяет не только значение, н все допустимые способы его изменения
const UseReducerExample: FC = () => {


    return (
        <>
            <Counter initValue={{}}/>
            <br/>
            <Counter initValue={{step:3, count: 7}}/>
            <TodoList/>
        </>
    )
}

export default UseReducerExample;
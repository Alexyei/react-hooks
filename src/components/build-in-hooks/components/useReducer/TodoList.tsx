import {FC, FormEvent, useState} from "react";
import useTodo, {TodoActionType} from "./todoReducer";
import Todo from "./Todo";

const TodoList: FC = () => {
    const [name, setName] = useState('');
    const [todos, todoDispatch] = useTodo()

    function submitHandler(e:FormEvent<HTMLFormElement>){
        e.preventDefault();
        todoDispatch({type:TodoActionType.ADD_TODO, payload: {name}})
        setName('')
    }

    function toggleHandler(id:number){
        todoDispatch({type:TodoActionType.TOGGLE_TODO, payload: {id}})
    }

    function removeHandler(id:number){
        todoDispatch({type:TodoActionType.REMOVE_TODO, payload: {id}})
    }

    return (
        <>
            <form onSubmit={submitHandler}>
                <input type={'text'} value={name} onChange={(e)=>setName(e.target.value)}/>
            </form>
            {
                todos.map((todo)=><Todo key={todo.id} todo={todo} onDelete={removeHandler} onToggle={toggleHandler}/>)
            }
        </>
    )
}

export default TodoList;
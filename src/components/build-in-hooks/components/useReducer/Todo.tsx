import {FC} from "react";
import {TodoType} from "./todoReducer";

const Todo:FC<{todo: TodoType, onDelete: (id:number)=>void, onToggle: (id:number)=>void} > = ({todo, onDelete, onToggle})=>{
    return (
        <div>
            <span style={{color: todo.completed ? '#AAA': '#000'}}>{todo.name}</span>
            <button onClick={()=>onToggle(todo.id)}>TOGGLE</button>
            <button onClick={()=>onDelete(todo.id)}>REMOVE</button>
        </div>
    )
}

export default Todo;
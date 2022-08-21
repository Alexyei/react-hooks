import {useReducer} from "react";
export type TodoType = { id: number, name: string, completed: boolean }
type TodoState = TodoType[]

export enum TodoActionType {
    ADD_TODO,
    REMOVE_TODO,
    TOGGLE_TODO
}

export type TodoAction =
    | { type: TodoActionType.ADD_TODO, payload: {name: string} }
    | { type: TodoActionType.REMOVE_TODO, payload: {id: number} }
    | { type: TodoActionType.TOGGLE_TODO, payload: {id: number} }

function newTodo(name: string): TodoType {
    return {
        name,
        completed: false,
        id: Date.now()
    }
}

function TodoReducer(state: TodoState, action: TodoAction) {
    switch (action.type) {
        case TodoActionType.ADD_TODO:
            return [...state, newTodo(action.payload.name)]
        case TodoActionType.REMOVE_TODO:
            return state.filter(todo => todo.id !== action.payload.id)
        case TodoActionType.TOGGLE_TODO:
            return state.map(todo => (todo.id === action.payload.id) ? {...todo, completed: !todo.completed} : todo)
        default:
            throw new Error('WRONG ACTION')
    }
}

export default function useTodo(){
    return useReducer(TodoReducer,[])
}
import {useReducer} from "react";

type CountState = { count: number, step: number }

export enum CountActionType {
    INCREMENT,
    DECREMENT,
    RESET,
    UPDATE_STEP,
    NO_USE_EFFECT
}


type CountAction =
    | { type: Exclude<CountActionType, CountActionType.UPDATE_STEP> }
    | { type: CountActionType.UPDATE_STEP, payload: number }

export type initUseCountArg = Partial<CountState>
function initCountReducer({count=0, step =1}:Partial<CountState> = {count:0}){
    return {count, step}
}

function countReducer(state: CountState, action: CountAction): CountState {
    switch (action.type) {
        case CountActionType.INCREMENT:
            return {
                ...state, count: state.count + state.step
            }
        case CountActionType.DECREMENT:
            return {
                ...state, count: state.count - state.step
            }
        case CountActionType.RESET:
            // return {
            //     count: 0,
            //     step: 1
            // }
            return initCountReducer()
        case CountActionType.UPDATE_STEP:
            return {
                ...state, step: action.payload
            }
        case CountActionType.NO_USE_EFFECT:
            return state
        default:
            throw new Error('Недопустимый CountActionType')
    }
}

export default function useCount(initValues:initUseCountArg = {count:0}){
    //инициализация одним значением без init-метода
   // return useReducer(countReducer, {count:0, step: 3});

    return useReducer(countReducer, initValues,initCountReducer);
}
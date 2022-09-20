import {FC, useEffect, useState, useSyncExternalStore} from "react";
import useSyncExternalStore2 from "./useSyncExternalStore2";

function createStore<ValueType>(initialState:ValueType) {
    type listenerType = (state:ValueType)=>void

    let currentState = initialState;
    const listeners = new Set<listenerType>();

    const subscribe= (listener:listenerType):()=>any => {
        listeners.add(listener);
        return () => listeners.delete(listener);
    }

    return {
        getState: () => currentState,
        setState: (newState:ValueType) => {
            currentState = newState;
            listeners.forEach((listener) => listener(currentState));
        },
        subscribe,
        useStore: <SelectorOutput,>(selector:(state:ValueType)=>SelectorOutput) => {
            // return useSyncExternalStore(subscribe, () => selector(currentState));

            const [state, setState] = useState(selector(currentState))

            useEffect(()=>subscribe((state)=>setState(selector(state))),[])

            return state;
        }
    };
}

const store = createStore({
    value1: 0,
    value2: 0,
});

type ValueType = ReturnType<typeof store.getState>

const DisplayValue:FC<{item: keyof ValueType}> = ({ item }) => (
    <div>
        {item}: {store.useStore((state) => state[item])}
    </div>
);

const IncrementValue:FC<{item:keyof ValueType}> = ({ item }) => (
    <button
        onClick={() => {
            const state = store.getState();
            store.setState({
                ...state,
                [item]: state[item] + 1,
            });
        }}
    >
        Increment {item}
    </button>
);

const UseSyncExternalStore3:FC = ()=>{
    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                maxWidth: 600,
                gap: "1rem",
            }}
        >
            <IncrementValue item="value1" />
            <DisplayValue item="value1" />
            <IncrementValue item="value2" />
            <DisplayValue item="value2" />
        </div>
    )
}

export default UseSyncExternalStore3;
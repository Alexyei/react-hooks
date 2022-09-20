import {FC, useEffect, useState, useSyncExternalStore} from "react";

type ValueType = {value1:number,value2:number}


function createStore(initialState:ValueType) {
    type listenerType = (state:ValueType)=>void

    let currentState = initialState;
    const listeners = new Set<listenerType>();
    return {
        getState: () => currentState,
        setState: (newState:ValueType) => {
            currentState = newState;
            listeners.forEach((listener) => listener(currentState));
        },
        subscribe: (listener:listenerType):()=>any => {
            listeners.add(listener);
            return () => listeners.delete(listener);
        },
    };
}

const store = createStore({
    value1: 0,
    value2: 0,
});


//селектор позволяет сохранять не весть сторе в юзстате, а только отдельное свойтсво. Это позволяет реагировать только на изменение конкретного свойства, а не всего объекта store.
const useStore = <SelectorOutput,>(selector:(state:ValueType)=>SelectorOutput) => {
     // return useSyncExternalStore(store.subscribe, () => selector(store.getState()));

    const [state, setState] = useState(selector(store.getState()))

    useEffect(()=>store.subscribe((state)=>setState(selector(state))),[])

    return state;
}
const DisplayValue:FC<{item: keyof ValueType}> = ({ item }) => (
    <div>
        {item}: {useStore((state) => state[item])}
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


const UseSyncExternalStoreExample2:FC = ()=>{
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

export default UseSyncExternalStoreExample2;
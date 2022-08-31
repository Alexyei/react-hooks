import {FC, useEffect, useState, useSyncExternalStore} from "react";

const createStore = <T,>({initialState}: {initialState: T}) => {
    const store = {
        state: initialState,
        listeners: new Set<() => any>(),
        setState: (newValue: any) => {
            store.state = newValue;
            store.listeners.forEach((listener) => listener())
        },
        getState: () => {
            return store.state;
        },
        subscribe: (callback: () => any) => {
            store.listeners.add(callback);
            return () => store.listeners.delete(callback);
        }
    }

    return store;
}

const counterStore = createStore({initialState: 0});

const useCounter = () => {
    const count = useSyncExternalStore(counterStore.subscribe, counterStore.getState);

    return {
        count,
        increment: () => counterStore.setState(count + 1),
        decrement: () => counterStore.setState(count - 1)
    }
}

const useSyncExternalStoreCustom = <T,>(subscribe:(onStoreChange: () => void) => () => void, getState:()=>T)=>{
    const [value, setValue] = useState(counterStore.getState())

    useEffect(()=>{
        const callback = ()=>{
            // const newValue = counterStore.getState();
            // setValue((prevValue)=>(prevValue!==newValue?newValue:prevValue))
            // setValue(newValue)
            setValue( counterStore.getState())
        }
        const unsubscribe = counterStore.subscribe(callback);
        return ()=>{unsubscribe()};
    },[])

    return value;
}

const useCustomCounter = () => {
    const count = useSyncExternalStoreCustom(counterStore.subscribe, counterStore.getState);

    return {
        count,
        increment: () => counterStore.setState(count + 1),
        decrement: () => counterStore.setState(count - 1)
    }
}

const Counter: FC = () => {
    const {count, increment, decrement} = useCounter()

    return (<div>
        <button onClick={decrement}>DECREMENT</button>
        <button onClick={increment}>INCREMENT</button>
        <span>{count}</span>
    </div>)
}

const CustomCounter: FC = () => {
    const {count, increment, decrement} = useCustomCounter()

    return (<div>
        <button onClick={decrement}>DECREMENT</button>
        <button onClick={increment}>INCREMENT</button>
        <span>{count}</span>
    </div>)
}

//store - это значение синхронизированное между всеми компонентами, такое как context (в UseContextRefactoringExample тоже есть прмиер с Counter)
const UseSyncExternalStoreExample: FC = () => {
    return (<>
        <Counter/>
        <Counter/>
        <Counter/>
        <p>Custom Counter</p>
        <CustomCounter/>
        <CustomCounter/>
        <CustomCounter/>
    </>)
}

export default UseSyncExternalStoreExample

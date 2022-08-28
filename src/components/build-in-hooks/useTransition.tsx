import {
    ChangeEvent,
    FC,
    ReactNode,
    useDeferredValue,
    useEffect,
    useMemo,
    useState,
    useTransition,
    Profiler
} from "react";
import Clock from "./components/useLayoutEffect/Clock";

const UseTransitionExample: FC = () => {

    return (
        <>
            <Example2Transition/>
        </>
    )
}

export default UseTransitionExample;

const ListSource: FC<{ input: string }> = ({input}) => {
    const [list, setList] = useState<ReactNode[]>([])

    useEffect(() => {
        setList(hardWork(input))
    }, [input])


    return <>{list}</>;
}
const ListTransition: FC<{ input: string }> = ({input}) => {
    const [isPending, startTransition] = useTransition()
    const [list, setList] = useState<ReactNode[]>([])

    useEffect(() => {
        startTransition(() => {
            setList(hardWork(input))
        })
    }, [input])

    return isPending ? <p>Is loading...</p> : <>{list}</>;
}
const ListCustomTransition: FC<{ input: string }> = ({input}) => {
    const [isPending, startTransition] = useCustomTransition()
    const [list, setList] = useState<ReactNode[]>([])

    useEffect(() => {
        startTransition(() => {
            setList(hardWork(input))
        })
    }, [input])

    return isPending ? <p>Is loading...</p> : <>{list}</>;
}

const ListSourceUseDeferredValue: FC<{ input: string }> = ({input}) => {
    const [list, setList] = useState<ReactNode[]>([])
    const deferredInput = useDeferredValue(input)
    useEffect(() => {
        setList(hardWork(input))
    }, [deferredInput])


    return <>{list}</>;
}
const ListTransitionUseDeferredValue: FC<{ input: string }> = ({input}) => {
    const [isPending, startTransition] = useTransition()
    const [list, setList] = useState<ReactNode[]>([])
    const deferredInput = useDeferredValue(input)

    useEffect(() => {
        startTransition(() => {
            setList(hardWork(input))
        })
    }, [deferredInput])

    return isPending ? <p>Is loading...</p> : <>{list}</>;
}
const ListCustomTransitionUseDeferredValue: FC<{ input: string }> = ({input}) => {
    const [isPending, startTransition] = useCustomTransition()
    const [list, setList] = useState<ReactNode[]>([])
    const deferredInput = useDeferredValue(input)

    useEffect(() => {
        startTransition(() => {
            setList(hardWork(input))
        })
    }, [deferredInput])

    return isPending ? <p>Is loading...</p> : <>{list}</>;
}

const ListSourceUseDeferredValueMemo: FC<{ input: string }> = ({input}) => {
    const deferredInput = useDeferredValue(input)
    const memorizedList = useMemo(() => {
        return hardWork(input)
    }, [deferredInput])


    return <>{memorizedList}</>;
}

function hardWork(value: string, LIST_SIZE = 20000) {
    const l = []
    for (let i = 0; i < LIST_SIZE; ++i) {
        l.push(value)
    }

    return l.map((item, index) => {
        return (<div key={index}>{item} {Math.random()}</div>)
    })

}
function useCustomTransition() {
    const [isPending, setIsPending] = useState(false)
    const [timerID, setTimerID] = useState(0)

    function startTransition(cb: () => void) {
        setIsPending(true)
        const timerID = window.setTimeout(() => {
            cb();
            setIsPending(false);
        })
        setTimerID(timerID)
    }

    useEffect(() => {
        if (!isPending) window.clearTimeout(timerID)
    }, [isPending])

    return [isPending, startTransition] as const
}

//Example1 списка нет на странице при монтировании

//Рендер 16 -19 сек
//Таймер остановился
//Поле ввода: полностью неотзывчивое, пустое -> затем 123456789
const Example1Source: FC = () => {
    const [input, setInput] = useState('')
    const [list, setList] = useState<ReactNode[]>([])

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setInput(e.target.value)
        setList(hardWork(e.target.value))
    }

    return (
        <>
            <Clock/>
            <input type='text' value={input} onChange={handleChange}/>
            {list}
        </>
    )
}
//Рендер 6 - 7 сек
//Таймер работает (возможно небольшая задержка)
//Поле ввода: практически полностью отзывчивое (возможно небольшая задержка), пустое -> затем печатается каждый символ
const Example1Transition: FC = () => {
    const [input, setInput] = useState('')
    const [list, setList] = useState<ReactNode[]>([])
    const [isPending, startTransition] = useTransition()


    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setInput(e.target.value)
        startTransition(() => {
            setList(hardWork(e.target.value))
        })
    }

    return (
        <>
            <Clock/>
            <input type='text' value={input} onChange={handleChange}/>
            {isPending ? <p>Is loading...</p> : list}
        </>
    )
}
//Рендер 6 - 7.8 сек
//Таймер останавливается, затем несколько раз быстро обновляется
//Поле ввода: сильно не отзывчивое (возможно небольшая задержка), пустое -> 12 -> 123456 -> 123456789
const Example1CustomTransition: FC = () => {
    const [input, setInput] = useState('')
    const [list, setList] = useState<ReactNode[]>([])
    const [isPending, startTransition] = useCustomTransition()


    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setInput(e.target.value)
        startTransition(() => {
            setList(hardWork(e.target.value))
        })
    }

    return (
        <>
            <Clock/>
            <input type='text' value={input} onChange={handleChange}/>
            {isPending ? <p>Is loading...</p> : list}
        </>
    )
}

//Example 2 список был уже добавлен в DOM при монтировании

//Рендер 5.1 - 7 сек
//Таймер остановился
//Поле ввода: сильно неотзывчивое
const Example2Source: FC = () => {
    const [input, setInput] = useState('')

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setInput(e.target.value)
    }

    return (
        <>
            <Clock/>
            <input type='text' value={input} onChange={handleChange}/>
            <ListSource input={input}/>
        </>
    )
}
//Рендер 8.8 сек
//Таймер практически полностью отзывчив (небольшие фризы)
//Поле ввода: практически полностью отзывчивое (возможно небольшая задержка), пустое -> затем печатается каждый символ
const Example2Transition: FC = () => {
    const [input, setInput] = useState('')

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setInput(e.target.value)
    }

    return (
        <>
            <Clock/>
            <input type='text' value={input} onChange={handleChange}/>
            <ListTransition input={input}/>
        </>
    )
}
//Рендер 9.4 - 11.3 сек
//Таймер полностью неотзывчив (фризы)
//Поле ввода: практически полностью неотзывчивое , пустое -> 1234 -> 123456 -> 123456789
const Example2CustomTransition: FC = () => {
    const [input, setInput] = useState('')

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setInput(e.target.value)
    }

    return (
        <>
            <Clock/>
            <input type='text' value={input} onChange={handleChange}/>
            <ListCustomTransition input={input}/>
        </>
    )
}


//Example 3 список был уже добавлен в DOM при монтировании + useDeferredValue


//Рендер 6.1 - 7 сек
//Таймер остановился
//Поле ввода: сильно неотзывчивое
const Example3Source: FC = () => {
    const [input, setInput] = useState('')

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setInput(e.target.value)
    }

    return (
        <>
            <Clock/>
            <input type='text' value={input} onChange={handleChange}/>
            <ListSourceUseDeferredValue input={input}/>
        </>
    )
}
//Рендер 12.5-13.5 сек
//Таймер сильно неотзывчив (большие фризы)
//Поле ввода: практически полностью отзывчивое (возможно небольшая задержка), пустое -> затем печатается каждый символ
const Example3Transition: FC = () => {
    const [input, setInput] = useState('')

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setInput(e.target.value)
    }

    return (
        <>
            <Clock/>
            <input type='text' value={input} onChange={handleChange}/>
            <ListTransitionUseDeferredValue input={input}/>
        </>
    )
}
//Рендер 11.7 - 11.8 сек
//Таймер полностью неотзывчив (фризы)
//Поле ввода: практически полностью неотзывчивое , пустое -> 1234 -> 123456 -> 123456789
const Example3CustomTransition: FC = () => {
    const [input, setInput] = useState('')

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setInput(e.target.value)
    }

    return (
        <>
            <Clock/>
            <input type='text' value={input} onChange={handleChange}/>
            <ListCustomTransitionUseDeferredValue input={input}/>
        </>
    )
}


//Example 4 список был уже добавлен в DOM при монтировании + useDeferredValue + memo


//Рендер 5.4 - 8.6 сек
//Таймер рабоатет
//Поле ввода: полностью отзывчивое
const Example4Source: FC = () => {
    const [input, setInput] = useState('')

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setInput(e.target.value)
    }

    return (
        <>
            <Clock/>
            <input type='text' value={input} onChange={handleChange}/>
            <ListSourceUseDeferredValueMemo input={input}/>
        </>
    )
}

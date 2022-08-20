В компонентах реакт есть состояния, поэтому они являются управляемыми. 
То есть каждый раз при изменении состоянии, компонент заново перерисовывается.
Иногда есть необходимость создать переменную (состояние), которое не будет вызывать ререндеринг при измении.
Например подсчётов количества ререндернгов компонента не так просто реализовать используя useState и useEffect (нужно ограничить массив зависимостей useEffect всеми state кроме count), так как изменение состояние в useEffect приведёт к зацикливанию.
Поэтому следует использовать "неуправляемое состояние" createRef.

Создание неуправляемого значения
``` typescript tsx
const renderCount = useRef(1)
```

Второй случай применения ref доступ к DOM.
Однако иногда необходимо работать со свойствами DOM-элемента напрямую. Для этого нужно использовать ref (сыылку на данный DOM-элемент)

Создание ссылки
``` typescript tsx
const ref = React.createRef();
```

Установка ссылки на элемент
``` typescript tsx
<input ref={inputRef} value={name} onChange={(e)=>setName(e.target.value)}/>
```

Работа с DOM через ссылку
``` typescript tsx
function handleClick(){
        console.log(inputRef.current)
        console.log(inputRef.current?.value)
        inputRef.current?.focus()
    }
```

Атрибут ref как и атрибут key являются особенными их нельзя передать компоненту через props.
Допустим мы создали компонент <CustomInput/>
И хотим передать ему ref: <CustomInput ref={inputRef}/>
Но наш компонент его не получит, так как свойство не передаётся.

Сушествует два способа передачи ref из внешнего компонента во внутренний.
1. forwardRef
``` typescript tsx
const CustomInput = forwardRef<HTMLInputElement,{value:string, onChange:(e:ChangeEvent<HTMLInputElement>)=>void}>((props, ref)=>{
    return (<input ref={ref} {...props} />)
})

class ElemComponent extends React.Component<{innerRef:React.ForwardedRef<HTMLDivElement>}> {
render() {
return (
<div ref={this.props.innerRef}>
Div has a ref
</div>
)
}
}

export default React.forwardRef<HTMLDivElement>((props, ref) => <ElemComponent
innerRef={ref} {...props}
/>);
```

2. свой props (например ref1)
``` typescript tsx
const CustomInputCustomRefProps:FC<{outerRef: ForwardedRef<HTMLInputElement>,value:string, onChange:(e:ChangeEvent<HTMLInputElement>)=>void}> = ({outerRef,...props})=>{
    return (<input ref={outerRef} {...props} />)
}
```


Ещё одним интересным примером использования ref является сохранение предыдущего состояния. (Только визуализация, чтобы реально получить предыдущие значение, нужно переопределить метод setState чтобы н сохранял prev)
``` typescript tsx
function setStateNumber(newNumber){
    setNumber(prev => {
        prevRef.current = prev
        return newNumber
    } 
}
```
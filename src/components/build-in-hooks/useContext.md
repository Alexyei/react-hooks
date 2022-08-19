Context - это глобальное значение которое может изменяться, Для создания контекста:

```typescript tsx
export const ThemeContext = React.createContext(
true // default value
);
```

default value используется только когда мы не используему Provider (полезно для тестирования)
Пример:https://stackoverflow.com/a/49953857/10000274
В остальных случаях используется initialValue Provider

Чтобы передать контекст:

1. ThemeContext.ThemeProvider

```typescript tsx
<ThemeContext.Provider value={darkTheme}>
<Child>
</ThemeContext.Provider>
//initialValue это darkTheme
```

Чтобы получить контекст:
Компоненты-классы:

1. Consumer

```typescript tsx
<ThemeContext.Consumer>
{darkTheme =>
<div style={this.themeStyles(darkTheme)}>Class Theme</div>
}
</ThemeContext.Consumer>
```

2. this.context

```typescript tsx
declare context: ContextType<typeof ThemeContext>
<div style={this.themeStyles(this.context)}>Class Theme this</div>
```

Возникают ошибки типов c typescript Возможно исправят, пока лучше не использовать

Компоненты-функции:

1. Consumer

```typescript tsx
<ThemeContext.Consumer>
{
theme=><div style={themeStyles(theme)}>Function Theme</div>
}
</ThemeContext.Consumer>
```

2. useContext

```typescript tsx
const darkTheme = useContext(ThemeContext)
const themeStyles:CSSProperties = useMemo(()=>{
        return {
            backgroundColor: darkTheme ? '#333' : '#CCC',
            color: darkTheme ? '#CCC': '#333',
            padding: '2rem',
            margin: '2rem'
        }
    },[darkTheme])


    return (
        <div style={themeStyles}>Function Theme Use Context</div>
    )
```

Чтобы использовать несколько контекстов можно вложить друг в друга провайдеры:

```typescript tsx
<ThemeProvider> 
   <InnerComponent/>
   <UserProvider>
       <InnerComponent/>
       <InnerComponent2/>
   </UserProvider>
</ThemeProvider>
```

А дальше использовать нужный useContext или вложенные консумеры
```typescript tsx
function Content() {
return (
<ThemeContext.Consumer>
{theme => (
<UserContext.Consumer>
{user => (
<ProfilePage user={user} theme={theme} />
)}
</UserContext.Consumer>
)}
</ThemeContext.Consumer>
);
}
```

UseContextRefactoringExample показывает использование defaultValue
Первая кнопка не меняет тему, так как useTheme находится на одном уровне с ThemeProvider а не внутри него
Поэтому initialState не срабатывает.
Остальные кнопки находятся внутри Provider, поэтому они работают как и ожидалось
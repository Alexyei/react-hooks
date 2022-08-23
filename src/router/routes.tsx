import UseStateExample from "../components/build-in-hooks/useState";
import UseEffectExample from "../components/build-in-hooks/useEffect";
import UseMemoExample from "../components/build-in-hooks/useMemo";
import UseContextExample from "../components/build-in-hooks/useContext";
import UseContextRefactoringExample from "../components/build-in-hooks/useContextRefactoring";
import UseRefExample from "../components/build-in-hooks/useRef";
import UseReducerExample from "../components/build-in-hooks/useReducer";
import UseCallbackExample from "../components/build-in-hooks/useCallback";
import UseLayoutEffectExample from "../components/useLayoutEffect";

export const publicRoutes= [
    {path: '/',element:(<UseStateExample/>),linkName:'useState'},
    {path: '/effect', element: (<UseEffectExample/>), linkName: 'useEffect'},
    {path: '/memo',element:(<UseMemoExample/>), linkName: 'useMemo'},
    {path: '/context', element: (<UseContextExample/>), linkName: 'useContext'},
    {path: '/context-refactoring', element: (<UseContextRefactoringExample />), linkName: 'useContextRefactoring'},
    {path: '/ref', element: (<UseRefExample/>), linkName: 'useRef'},
    {path: '/reducer', element: (<UseReducerExample/>), linkName: 'useReducer'},
    {path: '/callback', element: (<UseCallbackExample/>), linkName: 'useCallback'},
    {path: '/layout-effect', element: (<UseLayoutEffectExample/>), linkName: 'useLayoutEffect'},
    {path: '*',element:(<div>404 NOT FOUND</div>)}
]

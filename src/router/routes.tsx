import UseStateExample from "../components/build-in-hooks/useState";
import UseEffectExample from "../components/build-in-hooks/useEffect";
import UseMemoExample from "../components/build-in-hooks/useMemo";
import UseContextExample from "../components/build-in-hooks/useContext";
import UseContextRefactoringExample from "../components/build-in-hooks/useContextRefactoring";
import UseRefExample from "../components/build-in-hooks/useRef";
import UseReducerExample from "../components/build-in-hooks/useReducer";
import UseCallbackExample from "../components/build-in-hooks/useCallback";
import UseLayoutEffectExample from "../components/build-in-hooks/useLayoutEffect";
import UseImperativeHandleExample from "../components/build-in-hooks/useImperativeHandle";
import UseDebugValueExample from "../components/build-in-hooks/useDebugValue";
import UseDeferredValueExample from "../components/build-in-hooks/useDeferredValue";
import UseTransitionExample from "../components/build-in-hooks/useTransition";
import UseIdExample from "../components/build-in-hooks/useId";
import UseMemoClassExample from "../components/build-in-hooks/class-example/useMemo";
import UseSyncExternalStoreExample from "../components/build-in-hooks/useSyncExternalStore";
import UseLocalStorageExample from "../components/custom/useLocalStorage";
import UseSessionStorageExample from "../components/custom/useSessionStorage";
import UseToggleExample from "../components/custom/useToggle";
import UseTimeoutExample from "../components/custom/useTimeout";
import UseIntervalExample from "../components/custom/useInterval";
import UseDebounceExample from "../components/custom/useDebounce";
import UseUpdateEffectExample from "../components/custom/useUpdateEffect";
import UseArrayExample from "../components/custom/useArray";

export const publicRoutes= [
    {path: '/',element:(<UseStateExample/>),linkName:'useState'},
    {path: '/effect', element: (<UseEffectExample/>), linkName: 'useEffect'},
    {path: '/memo',element:(<UseMemoExample/>), linkName: 'useMemo'},
    {path:'/memo-class', element: (<UseMemoClassExample/>), linkName: 'useMemo'},
    {path: '/context', element: (<UseContextExample/>), linkName: 'useContext'},
    {path: '/context-refactoring', element: (<UseContextRefactoringExample />), linkName: 'useContextRefactoring'},
    {path: '/ref', element: (<UseRefExample/>), linkName: 'useRef'},
    {path: '/reducer', element: (<UseReducerExample/>), linkName: 'useReducer'},
    {path: '/callback', element: (<UseCallbackExample/>), linkName: 'useCallback'},
    {path: '/layout-effect', element: (<UseLayoutEffectExample/>), linkName: 'useLayoutEffect'},
    {path: '/imperative-handle', element: (<UseImperativeHandleExample/>), linkName: 'useImperativeHandle'},
    {path: '/debug-value', element:(<UseDebugValueExample/>), linkName: 'useDebugValue'},
    {path: '/deferred-value', element: (<UseDeferredValueExample/>), linkName: 'useDeferredValue'},
    {path: '/transition', element: (<UseTransitionExample/>), linkName: 'useTransition'},
    {path: '/id',element: (<UseIdExample/>), linkName: 'useId'},

    //CUSTOM
    {path: '/store', element: (<UseSyncExternalStoreExample/>), linkName: 'useSyncExternalStore'},
    {path: '/local-storage', element: (<UseLocalStorageExample/>),linkName: 'useLocalStorage'},
    {path: '/session-storage', element: (<UseSessionStorageExample/>),linkName: 'useSessionStorage'},
    {path: '/toggle', element: (<UseToggleExample/>),linkName: 'useToggle'},
    {path: '/timeout',element: (<UseTimeoutExample/>), linkName: 'useTimeout'},
    {path: '/interval',element: (<UseIntervalExample/>), linkName: 'useInterval'},
    {path: '/debounce', element: (<UseDebounceExample/>),linkName: 'useDebounce'},
    {path: '/update', element: (<UseUpdateEffectExample/>),linkName: 'useUpdateEffect'},
    {path: '/array', element: (<UseArrayExample/>), linkName: 'useArray'},
    {path: '*',element:(<div>404 NOT FOUND</div>)}
]

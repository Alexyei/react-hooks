import UseStateExample from "../components/build-in-hooks/useState";
import UseEffectExample from "../components/build-in-hooks/useEffect";
import UseMemoExample from "../components/build-in-hooks/useMemo";

export const publicRoutes= [
    {path: '/',element:(<UseStateExample/>),linkName:'useState'},
    {path: '/effect', element: (<UseEffectExample/>), linkName: 'useEffect'},
    {path: '/memo',element:(<UseMemoExample/>), linkName: 'useMemo'},
    {path: '*',element:(<div>404 NOT FOUND</div>)}
]

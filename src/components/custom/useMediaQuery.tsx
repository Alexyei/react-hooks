import {FC, useState, useEffect} from "react";
import {useEventListener} from "./useEventListener";

export function useMediaQuery(mediaQuery:string){
    const [isMatch, setIsMatch] = useState(false)
    const [mediaQueryList, setMediaQueryList] = useState<MediaQueryList>()

    useEffect(() => {
        const list = window.matchMedia(mediaQuery)
        setMediaQueryList(list)
        setIsMatch(list.matches)
    }, [mediaQuery])

    useEventListener("change", e => {console.log('changed');setIsMatch(e.matches)}, mediaQueryList)

    return isMatch
}

const UseMediaQueryExample:FC = ()=>{
    const isLarge = useMediaQuery("(min-width:400px)")
    const isLarge2 = useMediaQuery("(min-width:500px)")

    return <>
        <div>Large: {isLarge.toString()}</div>
        <div>Large: {isLarge2.toString()}</div>
    </>
}

export default UseMediaQueryExample;
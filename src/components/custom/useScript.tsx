import {FC} from "react";
import {useAsync} from "./useAsync";

declare global {
    interface Window {
        $?: any
    }
}


export function useScript(url: string, scriptType: 'async' | 'defer' = 'async') {
    return useAsync(() => {
        const script = document.createElement("script")
        script.src = url

        if (scriptType === 'async')
            script.async = true
        else
            script.defer = true;

        return new Promise((resolve, reject) => {
            const removeListeners = () => {
                script.removeEventListener('load', onLoad);
                script.removeEventListener('error', onError);
            }
                const onLoad = (e:any) => {
                    removeListeners();
                    resolve(e);
                };
                const onError= (e:any) => {
                    removeListeners();
                    script.remove();
                    reject(e);
                    // removeListeners();
                }
                script.addEventListener('load', onLoad);
                script.addEventListener('error', onError);
            // script.addEventListener("load", resolve)
            // script.addEventListener("error", reject)
                document.body.append(script);
        })
    }, [url])
}

const UseScriptExample: FC = () => {
    const {loading, error} = useScript(
        "https://code.jquery.com/jquery-3.6.0.min.js"
    )

    if (loading) return <div>Loading</div>
    if (error) return <div>Error</div>
    return <div>{window.$(window).width()}</div>
}

export default UseScriptExample;
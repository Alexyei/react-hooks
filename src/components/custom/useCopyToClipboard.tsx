import {FC, useState} from "react";
import copy from "copy-to-clipboard"

export function useCopyToClipboard(){
    const [value, setValue] = useState("")
    const [success, setSuccess] = useState(false)

    const copyToClipboard = (text:string, options?:Parameters<typeof copy>[1]) => {
        const result = copy(text, options)
        if (result) setValue(text)
        setSuccess(result)
    }

    return [copyToClipboard, { value, success }] as const
}

const UseCopyToClipboard:FC = () => {
    const [copyToClipboard, { success }] = useCopyToClipboard()
    const [value,setValue] = useState('')
    return (
        <>
            <button onClick={() => copyToClipboard(value)}>
                {success ? "Copied" : "Copy Text"}
            </button>
            <input value={value} onChange={(e)=>setValue(e.target.value)} type="text" />
        </>
    )
}

export default UseCopyToClipboard;
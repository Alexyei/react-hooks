import {FC, useEffect, useState} from "react";

export function useGeolocation(options?:PositionOptions){
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<GeolocationPositionError | null>()
    const [data, setData] = useState<GeolocationCoordinates>()

    useEffect(() => {
        const successHandler: PositionCallback = e => {
            setLoading(false)
            setError(null)
            setData(e.coords)
        }
        const errorHandler:PositionErrorCallback = e => {
            setError(e)
            setData(undefined);
            setLoading(false)
        }
        navigator.geolocation.getCurrentPosition(
            successHandler,
            errorHandler,
            options
        )
        const id = navigator.geolocation.watchPosition(
            successHandler,
            errorHandler,
            options
        )
        return () => navigator.geolocation.clearWatch(id)
    }, [options])

    return { loading, error, data }
}

const UseGeolocationExample:FC = ()=>{
    const {
        loading,
        error,
        data,
    } = useGeolocation()

    return (
        <>
            <div>Loading: {loading.toString()}</div>
            <div>Error: {error?.message}</div>

            {data && <div>
                {data.latitude} x {data.longitude}
            </div>}
        </>
    )
}

export default UseGeolocationExample;
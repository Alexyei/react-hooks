import {useGeolocation} from 'react-use';
import {YMaps, Map, Placemark} from "react-yandex-maps";
import {FC} from "react";
const UseGeolocationExampleReactUse:FC = () => {
    const state = useGeolocation();

    return (
        <>
        <pre>
      {JSON.stringify(state, null, 2)}
    </pre>
            { state.longitude && state.latitude &&
            <YMaps>
                <Map width={'100%'} height={'500px'} defaultState={{ center: [state.latitude, state.longitude], zoom: 15 }} >
                    <Placemark geometry={[state.latitude, state.longitude]} />
                </Map>

            </YMaps>}
        </>
    );
};

export default UseGeolocationExampleReactUse;
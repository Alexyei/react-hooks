import {useHover} from 'react-use';
import {FC} from "react";

export interface BatteryState {
    charging: boolean;
    chargingTime: number;
    dischargingTime: number;
    level: number;
}



const UseHoverExampleReactUse:FC = () => {
    const element = (hovered:boolean) =>
        <div style={{width:'100px',height:'100px',backgroundColor:hovered ? "red":"blue",display:'flex',justifyContent:'center',alignItems:'center'}}>
            Hover me! {hovered && 'Thanks!'}
        </div>;
    const [hoverable, hovered] = useHover(element);

    return (
        <div>
            {hoverable}
            <div>{hovered ? 'HOVERED' : ''}</div>
        </div>
    );
};

export default UseHoverExampleReactUse;
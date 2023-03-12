
import { FC } from "react";
import { useLocation } from "react-router-dom";

export const KakeiboDetails: FC = () => {
    let { state } = useLocation();
    console.log(state)
    return (
        <div></div>
    )
}

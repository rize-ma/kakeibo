import { FC, useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"

import useUserStore from "../../store"
import authUtils from "../../utils/authUtils"
import { AppHeader } from "../AppHeader"

export const AppLayout : FC = () => {
    const navigate = useNavigate();
    const setUser = useUserStore((state) => state.setUser);

    useEffect(() => {
        const checkAuth = async () => {
            const user = await authUtils.isAuthenticated();
            if(!user) {
                navigate("/auth/login");
            } else {
                setUser(user);
            }
        };
        checkAuth();
    }, []);
    return (
        <div>
            <AppHeader/>
            <div className="flex flex-col items-center mt-16">
                <Outlet/>
            </div>
        </div>
    )
}


import { Box } from "@mui/material"
import { Container } from "@mui/system"
import { FC, useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"

import useUserStore from "../../store"
import authUtils from "../../utils/authUtils"

export const AppLayout : FC = () => {
    const navigate = useNavigate();
    const setUser = useUserStore((state) => state.setUser);

    useEffect(() => {
        const checkAuth = async () => {
            const user = await authUtils.isAuthenticated();
            if(!user) {
                navigate("/login");
            } else {
                setUser(user);
            }
        };
        checkAuth();
    }, [navigate]);
    return (
        <div className="flex flex-col items-center mt-16">
            <Outlet/>
        </div>
    )
}


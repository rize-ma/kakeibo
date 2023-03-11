import { FC, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import useUserStore from "../store";
import authUtils from "../utils/authUtils";

export const AppRouter: FC = () => {
    const navigate = useNavigate();
    const setUser = useUserStore((state) => state.setUser);

    useEffect(() => {
        const checkAuth = async () => {
            const user = await authUtils.isAuthenticated();
            if(!user) {
                navigate("/auth/login");
            } else {
                setUser(user);
                navigate("/kakeibo/create");
            }
        };
        checkAuth();
    }, []);
    return (
        <div>
            <Outlet/>
        </div>
    )
}


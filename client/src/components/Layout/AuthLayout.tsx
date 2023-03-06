import { FC, useEffect } from "react"
import { Typography } from "@material-tailwind/react"
import { Outlet, useNavigate } from "react-router"
import useUserStore from "../../store";
import authUtils from "../../utils/authUtils";


export const AuthLayout: FC = () => {
    const navigate = useNavigate();
    const setUser = useUserStore((state) => state.setUser);

    // useEffect(() => {
    //     const checkAuth = async () => {
    //         const user = await authUtils.isAuthenticated();
    //         if(!user) {
    //             //navigate("login");
    //         } else {
    //             setUser(user);
    //             navigate("/kakeibo/create");
    //         }
    //     };
    //     checkAuth();
    // }, [navigate]);
    return (
        <div className="flex flex-col items-center mt-16">
                    <Typography variant="h2" className="mb-6">
                        家計簿アプリ
                    </Typography>
                    <Outlet/>
    </div>
    )
}

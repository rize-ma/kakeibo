import { FC } from "react"
import { Typography } from "@material-tailwind/react"
import { Outlet } from "react-router"


export const AuthLayout: FC = () => {
    return (
        <div className="flex flex-col items-center mt-16">
                    <Typography variant="h2" className="mb-6">
                        家計簿アプリ
                    </Typography>
                    <Outlet/>
    </div>
    )
}

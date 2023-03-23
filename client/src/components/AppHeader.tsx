import { FC } from "react";
import { Header, Group, Container } from '@mantine/core';
import { Link } from "react-router-dom";

export const AppHeader: FC = () => {
    return (
        <Header height={56} className="bg-orange-600">
            <div className="flex justify-center items-end h-full">
                <div className="mx-7">
                    <Link to="/kakeibo/create" className="text-lg font-semibold text-white">作成</Link>
                </div>
                <div className="mx-7">
                    <Link to="/kakeibo/calender" className="text-lg font-semibold text-white">カレンダー</Link>
                </div>
            </div>
        </Header>
    )
}


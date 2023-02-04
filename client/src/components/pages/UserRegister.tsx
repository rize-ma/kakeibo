import { FC } from "react";
import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Button,
    } from "@material-tailwind/react";

export const UserRegister : FC = () => {
    return (
        <Card className="w-96">
            <CardBody className="flex flex-col gap-4">
                <Typography variant="h3" className="flex justify-center">
                    ユーザー登録
                </Typography>
                <Input label="ユーザー名" size="lg" className="block mb-2"/>
                <Input label="メールアドレス" size="lg" className="block mb-5"/>
                <Input label="パスワード" size="lg" />
            </CardBody>
            <CardFooter className="pt-0">
                <Button variant="gradient" fullWidth>
                    ユーザー登録
                </Button>
            <Typography variant="small" className="mt-6 flex justify-center">
                すでにアカウントをお持ちですか？
            <Typography
                as="a"
                href="#signup"
                variant="small"
                color="blue"
                className="ml-1 font-bold"
            >
                ログイン
            </Typography>
            </Typography>
            </CardFooter>
        </Card>
    )
}


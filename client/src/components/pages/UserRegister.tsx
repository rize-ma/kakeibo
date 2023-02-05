import { FC, useState, } from "react";
import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Button,
    Alert,
    } from "@material-tailwind/react";
import { changeFormInput, userRegister } from "../../types";

export const UserRegister : FC = () => {
    const [userName, setUserName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [userNameErrText, setUserNameErrText] = useState<string>("");
    const [emailErrText, setEmailErrText] = useState<string>("");
    const [passwordErrText, setPasswordErrText] = useState<string>("");
    const [confirmPasswordErrText, setConfirmPasswordErrText] = useState<string>("");

    const changeUserName : changeFormInput = (e) => {
        if(userName.length > 10) {
            setUserNameErrText("ユーザーネームは10文字以内で入力してください")
        } else {
            setUserName(e.target.value);
            setUserNameErrText("")
        }
    }
    const changeEmail : changeFormInput = (e) => {
        setEmail(e.target.value);
    }
    const changePassword : changeFormInput = (e) => {
        setPassword(e.target.value);
    }
    const changeConfirmPassword : changeFormInput = (e) => {
        setConfirmPassword(e.target.value);
    }
    const userRegister : userRegister = (e) => {
        if(userName === "" ) {
            setUserNameErrText("ユーザー名を入力してください")
        } else if(userName.length > 10) {
            setUserNameErrText("ユーザー名は10文字以内で入力してください")
        }
    }

    return (
        <Card className="w-96">
            <CardBody className="flex flex-col gap-4">
                <Typography variant="h3" className="flex justify-center">
                    ユーザー登録
                </Typography>
                {userNameErrText ? <Alert color="red">{userNameErrText}</Alert> : ""}
                <Input label="ユーザー名 (10文字以内)" size="lg" type="text" value={userName} onChange={changeUserName}/>
                <Input label="メールアドレス" size="lg" type="email" value={email} onChange={changeEmail}/>
                <Input label="パスワード" size="lg" type="password" value={password} onChange={changePassword}/>
                <Input label="確認用パスワード" size="lg" type="password" value={confirmPassword} onChange={changeConfirmPassword}/>
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


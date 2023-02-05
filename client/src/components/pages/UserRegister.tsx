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
import { confirmPasswordValidation, emailValidation, passwordValidation, userNameValidation } from "../../utils/validation";

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
            setUserName(e.target.value);
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
        e.preventDefault();

        setUserNameErrText(userNameValidation(userName));
        setEmailErrText(emailValidation(email));
        setPasswordErrText(passwordValidation(password));
        setConfirmPasswordErrText(confirmPasswordValidation(password, confirmPassword));
        if (userNameErrText || emailErrText || passwordErrText || confirmPasswordErrText) {
                return
            }
        
    }

    return (
        <Card className="w-96 mb-8">
            <CardBody className="flex flex-col gap-4">
                <Typography variant="h3" className="flex justify-center">
                    ユーザー登録
                </Typography>
                <Alert className="p-2" color="red" show={userNameErrText ? true : false}>{userNameErrText}</Alert>
                <Input label="ユーザー名 (10文字以内)" size="lg" type="text" value={userName} onChange={changeUserName}/>
                <Alert className="p-2" color="red" show={emailErrText ? true : false}>{emailErrText}</Alert>
                <Input label="メールアドレス" size="lg" type="email" value={email} onChange={changeEmail}/>
                <Alert className="p-2" color="red" show={passwordErrText ? true : false}>{passwordErrText}</Alert>
                <Input label="パスワード (4文字以上)" size="lg" type="password" value={password} onChange={changePassword}/>
                <Alert className="p-2" color="red" show={confirmPasswordErrText ? true : false}>{confirmPasswordErrText}</Alert>
                <Input label="確認用パスワード" size="lg" type="password" value={confirmPassword} onChange={changeConfirmPassword}/>
            </CardBody>
            <CardFooter className="pt-0">
                <Button variant="gradient" fullWidth onClick={userRegister}>
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


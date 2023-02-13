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
import { changeFormInput, userRegister, userRegisterErr, userRegisterResponse } from "../../types";
import { confirmPasswordValidation, emailValidation, passwordValidation, usernameValidation } from "../../utils/validation";
import authApi from "../../api/authApi";
import { AxiosResponse } from "axios";
import { AuthLayout } from "../Layout/AuthLayout";

export const UserLogin : FC = () => {
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [usernameErrText, setUsernameErrText] = useState<string>("");
    const [emailErrText, setEmailErrText] = useState<string>("");
    const [passwordErrText, setPasswordErrText] = useState<string>("");
    const [confirmPasswordErrText, setConfirmPasswordErrText] = useState<string>("");

    const changeUserName : changeFormInput = (e) => {
            setUsername(e.target.value);
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
    const userRegister : userRegister = async (e) => {
        e.preventDefault();

        setUsernameErrText(usernameValidation(username));
        setEmailErrText(emailValidation(email));
        setPasswordErrText(passwordValidation(password));
        setConfirmPasswordErrText(confirmPasswordValidation(password, confirmPassword));
        if (usernameErrText || emailErrText || passwordErrText || confirmPasswordErrText) {
                return
            }
        
            try {
                const res : AxiosResponse<userRegisterResponse>  = await authApi.register({
                    username,
                    email,
                    password, 
                    confirmPassword
                });
                localStorage.setItem("token", res.data.token);
                // navigate("/")
            } catch(err : any) {
                console.log(err)
                //errにはバックエンドで設定したエラーメッセージなどが格納されている
                const errors = err.data.errors;
                errors.forEach((err : userRegisterErr) => {
                    if(err.param === "email"){
                        setEmailErrText(err.msg)
                    }
                    if(err.param === "password"){
                        setPasswordErrText(err.msg)
                    }
                });
            }
        }

    return (
        <AuthLayout>
            <Card className="w-96 mb-8 ">
                <CardBody className="flex flex-col items-center gap-4">
                    <Typography variant="h3">
                        ログイン
                    </Typography>
                    <Alert className="p-2" color="red" show={emailErrText ? true : false}>{emailErrText}</Alert>
                    <Input label="メールアドレス" size="lg" type="email" value={email} onChange={changeEmail}/>
                    <Alert className="p-2" color="red" show={passwordErrText ? true : false}>{passwordErrText}</Alert>
                    <Input label="パスワード (8文字以上)" size="lg" type="password" value={password} onChange={changePassword}/>
                </CardBody>
                <CardFooter className="pt-0 flex flex-col items-center">
                    <Button variant="gradient" fullWidth onClick={userRegister}>
                        ログイン
                    </Button>
                <Typography variant="small" className="mt-6">
                    まだアカウントを作成していませんか？
                </Typography>
                <Typography
                    as="a"
                    href="#signup"
                    variant="small"
                    color="blue"
                    className="mt-3 font-bold"
                >
                    ユーザー登録
                </Typography>
                </CardFooter>
            </Card>
        </AuthLayout>
    )
}


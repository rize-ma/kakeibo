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
import { Link, useNavigate } from "react-router-dom";

export const UserRegister : FC = () => {
    const navigate = useNavigate();
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
    };
    const changeEmail : changeFormInput = (e) => {
        setEmail(e.target.value);
    };
    const changePassword : changeFormInput = (e) => {
        setPassword(e.target.value);
    };
    const changeConfirmPassword : changeFormInput = (e) => {
        setConfirmPassword(e.target.value);
    };
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
                navigate("/");
            } catch(err : any) {
                const errors = err.data.errors;
                errors.forEach((err : userRegisterErr) => {
                    if(err.param === "email"){
                        setEmailErrText(err.msg);
                    }
                    if(err.param === "password"){
                        setPasswordErrText(err.msg);
                    }
                });
            }
        }

    return (
        <AuthLayout>
            <Card className="w-96 mb-8">
                <CardBody className="flex flex-col items-center gap-4">
                    <Typography variant="h3">
                        ユーザー登録
                    </Typography>
                    <Alert className="p-2" color="red" show={usernameErrText ? true : false}>{usernameErrText}</Alert>
                    <Input label="ユーザー名 (10文字以内)" size="lg" type="text" value={username} onChange={changeUserName}/>
                    <Alert className="p-2" color="red" show={emailErrText ? true : false}>{emailErrText}</Alert>
                    <Input label="メールアドレス" size="lg" type="email" value={email} onChange={changeEmail}/>
                    <Alert className="p-2" color="red" show={passwordErrText ? true : false}>{passwordErrText}</Alert>
                    <Input label="パスワード (8文字以上)" size="lg" type="password" value={password} onChange={changePassword}/>
                    <Alert className="p-2" color="red" show={confirmPasswordErrText ? true : false}>{confirmPasswordErrText}</Alert>
                    <Input label="確認用パスワード" size="lg" type="password" value={confirmPassword} onChange={changeConfirmPassword}/>
                </CardBody>
                <CardFooter className="pt-0 flex flex-col items-center">
                    <Button variant="gradient" fullWidth onClick={userRegister}>
                        ユーザー登録
                    </Button>
                    <Typography variant="small" className="mt-6">
                    すでにアカウントを作成済ですか？
                </Typography>
                <Typography
                    variant="small"
                    color="blue"
                    className="mt-3 font-bold"
                >
                    <Link to="/login">ログイン</Link>
                </Typography>
                </CardFooter>
            </Card>
        </AuthLayout>
    )
}


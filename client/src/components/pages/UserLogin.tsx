import { FC, MouseEvent, useState, } from "react";
import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Button,
    Alert,
    } from "@material-tailwind/react";
import { changeFormInput, userLoginReaponse, userRegister, userRegisterErr, userRegisterResponse } from "../../types";
import { emailValidation, passwordValidation } from "../../utils/validation";
import authApi from "../../api/authApi";
import { AxiosResponse } from "axios";
import { AuthLayout } from "../Layout/AuthLayout";
import { Link, useNavigate } from "react-router-dom";

export const UserLogin : FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [emailErrText, setEmailErrText] = useState<string>("");
    const [passwordErrText, setPasswordErrText] = useState<string>("");

    const changeEmail : changeFormInput = (e : React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };
    const changePassword : changeFormInput = (e : React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };
    const userRegister : userRegister = async (e : MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        setEmailErrText(emailValidation(email));
        setPasswordErrText(passwordValidation(password));
        if (emailErrText || passwordErrText ) {
                return
            }
        
            try {
                const res : AxiosResponse<userLoginReaponse>  = await authApi.login({
                    email,
                    password,
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
                    variant="small"
                    color="blue"
                    className="mt-3 font-bold"
                >
                    <Link to="/register">ユーザー登録</Link>
                </Typography>
                </CardFooter>
            </Card>
    )
}


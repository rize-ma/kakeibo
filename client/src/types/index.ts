export type changeFormInput = ( e: React.ChangeEvent<HTMLInputElement>) => void;
export type userRegister = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
export type authValidation = (character: string, confirmPassword?: string) => string;
export type moneyValidationType = (money : string) => string;

export type userRegisterParams = {
    username: string,
    email: string,
    password: string,
    confirmPassword: string
};

export type userLoginParams = {
    email: string,
    password: string
};

export type kakeiboCreateParams = {
    category: string | null,
    description: string | null,
    //date:
    money: number,
    expenses?: boolean,
    income?: boolean,
}

export type userRegisterResponse = {
    token: string,
    user: {
        username: string,
        email: string,
        password: string,
        __v: number,
        _id: string
    }
};

export type userLoginReaponse = userRegisterResponse;

export type userRegisterErr = {
    value: string,
    msg: string,
    param: string,
    location: string
};

export type userData = {
    email: string,
    password: string,
    username: string,
    __v: number,
    _id: string
}

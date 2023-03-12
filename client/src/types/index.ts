export type changeFormInput = ( e: React.ChangeEvent<HTMLInputElement>) => void;
export type userRegister = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
export type authValidation = (character: string, confirmPassword?: string) => string;
export type moneyValidationType = (money: string) => string;
export type toggleCategoryData = () => string[];
export type changeInputType = (value: string) => void;
export type changeDate = (date: Date) => void;
export type formatDateType = (date: string) => string
export type voidFunction = () => void;
export type isExpenses = () => boolean;

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
    date: string,
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
};

export type inputType = [
    {
        label: "支出",
        value: "expenses"
    },
    {
        label: "収入",
        value: "income"
    }
];

export type kakeibo = {
    category: string,
    date: string,
    description: string,
    expenses: boolean,
    income: boolean,
    money: number,
    user: string,
    __v: number,
    _id: string
};

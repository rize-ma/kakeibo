export type changeFormInput = ( e : React.ChangeEvent<HTMLInputElement>) => void;
export type userRegister = (e : React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
export type authValidation = (character : string, confirmPassword?:string) => string;
export type userRegisterParams = {
    username : string,
    email : string,
    password : string,
    confirmPassword : string
}
export type userRegisterResponse = {
    token : string,
    user : {
        username : string,
        email : string,
        password : string,
        __v : number,
        _id : string
    }
}
export type userRegisterErr = {
    value : string,
    msg : string,
    param : string,
    location : string
}
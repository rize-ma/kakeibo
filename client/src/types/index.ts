export type changeFormInput = ( e : React.ChangeEvent<HTMLInputElement>) => void;
export type userRegister = (e : React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
export type authValidation = (character : string, confirmPassword?:string) => string;
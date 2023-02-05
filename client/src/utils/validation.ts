import { authValidation } from "../types"


export const userNameValidation: authValidation = (userName) => {
    let errText = "";

    if(userName === "" ) {
        errText = "ユーザー名を入力してください";
        return errText;
    } else if(userName.length > 10) {
        errText = "ユーザー名は10文字以内で入力してください";
        return errText;
    }

    return errText;
}
export const emailValidation: authValidation = (email) => {
    let errText = "";
    const regex = /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;

    if(email === "" ) {
        errText = "メールアドレスを入力してください";
        return errText;
    } else if(!regex.test(email)) {
        errText = "正しいメールアドレスを入力してください"
        return errText
    }

    return errText;
}

export const passwordValidation: authValidation = (password) => {
    let errText = "";

    if(password === "") {
        errText = "パスワードを入力してください";
        return errText;
    } else if(password.length <= 4) {
        errText = "パスワードは4文字以上で入力してください";
        return errText
    }
    return errText;
}

export const confirmPasswordValidation : authValidation = (password, confirmPassword) => {
    console.log(password)
    console.log(confirmPassword)
    let errText = "";

    if(confirmPassword === "") {
        errText = "確認用パスワードを入力してください";
        return errText;
    } else if (password !== confirmPassword) {
        errText = "パスワードと確認用パスワードが異なります";
        return errText;
    }

    return errText
}
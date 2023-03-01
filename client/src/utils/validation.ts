import { authValidation, moneyValidationType } from "../types"


export const usernameValidation: authValidation = (username) => {
    let errText = "";

    if(username === "" ) {
        errText = "ユーザー名を入力してください";
        return errText;
    } else if(username.length > 10) {
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
    } else if(password.length < 8) {
        errText = "パスワードは8文字以上で入力してください";
        return errText
    }
    return errText;
}

export const confirmPasswordValidation : authValidation = (password, confirmPassword) => {
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

export const moneyValidation : moneyValidationType = (money) => {
    let errText = "";
    
    if(!money) {
        errText = "金額を入力してください";
        return errText;
    };
    const reg = new RegExp(/^[0-9]*$/);
    if(!reg.test(money)) {
        errText = "数値を入力してくだいさい";
        return errText;
    }
    return errText;
}
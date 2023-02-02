const User = require("../models/user");
const JWT = require("jsonwebtoken");
const CryptoJS = require("crypto-js");


exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                errors: [
                    {
                        param: "email",
                        msg: "ユーザー名が存在しません"
                    }
                ]
            })
        }

        const descryptedPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.SECRET_KEY
        ).toString(CryptoJS.enc.Utf8);
        if (descryptedPassword !== password) {
            return res.status(401).json({
                errors: [
                    {
                        param: "password",
                        msg: "パスワードが無効です"
                    }
                ]
            })
        }

        const token = JWT.sign({ id: user._id }, process.env.TOKEN_SECRET_KEY, {
            expiresIn: "24h",
        });

        return res.status(201).json({ user, token })
    } catch (error) {
        return res.status(500).json(error)
    }
}
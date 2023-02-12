const JWT = require("jsonwebtoken");
const CryptoJS = require("crypto-js");
const User = require("../models/user");
const { validationResult } = require("express-validator");

exports.registerUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const password = req.body.password;
    try {
        req.body.password = CryptoJS.AES.encrypt(password, process.env.SECRET_KEY);

        const user = await User.create(req.body);

        const token = JWT.sign({ id: user._id }, process.env.TOKEN_SECRET_KEY, {
            expiresIn: "24h",
        });

        return res.status(200).json({ data: { user, token } });
    } catch (err) {
        return res.status(500).json(err);
    }
};
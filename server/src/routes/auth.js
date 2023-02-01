const router = require("express").Router();
const { body } = require("express-validator");
require("dotenv").config();

const User = require("../models/user");
const { registerUser } = require("../controllers/register");

router.post(
    "/register",
    body("password")
        .isLength({ min: 8 })
        .withMessage("パスワードは8文字以上である必要があります"),
    body("confirmPassword")
        .isLength({ min: 8 })
        .withMessage("確認用パスワードは8文字以上である必要があります"),
    body("email").custom((value) => {
        User.findOne({ email: value }).then((email) => {
            if (email) {
                return Promise.reject("このメールアドレスはすでに使用されています");
            }
        });
    }),
    registerUser
);



module.exports = router;
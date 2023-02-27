const router = require("express").Router();
const { body } = require("express-validator");
require("dotenv").config();

const User = require("../models/user");
const { registerUser } = require("../controllers/register");
const { login } = require("../controllers/login");
const tokenHandler = require("../handlers/tokenHandlers");

router.post(
    "/register",
    body("password")
        .isLength({ min: 8 })
        .withMessage("パスワードは8文字以上である必要があります"),
    body("email").custom((value) => {
        User.findOne({ email: value }).then((email) => {
            if (email) {
                return Promise.reject("");
            }
        });
    }).withMessage("このメールアドレスはすでに使用されています"),
    registerUser
);

router.post(
    "/login",
    body("password")
        .isLength({ min: 8 })
        .withMessage("パスワードは8文字以上である必要があります"),
    login
);

router.post("/verify-token", tokenHandler.verifyToken, (req, res) => {
    return res.status(200).json({ data: { user: req.user } })
});

module.exports = router;
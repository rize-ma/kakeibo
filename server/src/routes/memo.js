const router = require("express").Router();
const kakeiboController = require("../controllers/kakeibo");
const tokenHandler = require("../handlers/tokenHandlers");

router.post("/create", tokenHandler.verifyToken, kakeiboController.create);


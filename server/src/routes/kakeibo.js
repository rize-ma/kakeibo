const router = require("express").Router();
const kakeiboController = require("../controllers/kakeibo");
const tokenHandler = require("../handlers/tokenHandlers");

router.post("/create", tokenHandler.verifyToken, kakeiboController.create);
router.get("/calender/:kakeiboDate", tokenHandler.verifyToken, kakeiboController.dateSearch);
router.get("/details/:kakeiboId", tokenHandler.verifyToken, kakeiboController.getOne);
router.put("/details/:kakeiboId", tokenHandler.verifyToken, kakeiboController.update);
router.get("/graph/:yearMonth", tokenHandler.verifyToken, kakeiboController.getMonth);

module.exports = router;
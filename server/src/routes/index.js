const router = require("express").Router();

router.use("/auth", require("./auth"));
router.use("/kakeibo", require("./kakeibo"));

module.exports = router;
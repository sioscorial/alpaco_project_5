const express = require("express");
const router = express.Router();
const { styleController } = require("../controllers");
const { loginRequired } = require("../utils/auth");

router.post("", loginRequired,styleController.uploadImage);
router.delete("/delete", loginRequired, styleController.deleteStyle);

module.exports = router;

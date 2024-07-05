const express = require("express");
const router = express.Router();
const { backController } = require("../controllers");


router.get("", backController.background);

module.exports = router;

const express = require("express");
const router = express.Router();
const { resultController } = require("../controllers");


router.get("/:itemId", resultController.results);

module.exports = router;

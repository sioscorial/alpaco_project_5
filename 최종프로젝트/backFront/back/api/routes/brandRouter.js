const express = require("express");
const router = express.Router();
const { brandController } = require("../controllers");

router.get("/search", brandController.getBrandsByNameRange);
router.get("/info/:brandId", brandController.getBrandInfo);
router.get("/items/:brandId", brandController.getBrandItems);


module.exports = router;

const express = require("express");
const router = express.Router();
const { likesController } = require("../controllers");
const { loginRequired } = require("../utils/auth");

router.post('/brand', loginRequired, likesController.toggleBrandLike);
router.post('/item', loginRequired, likesController.toggleItemLike);
router.get('/brandAll', loginRequired, likesController.getBrandLikes);
router.get('/itemAll', loginRequired, likesController.getItemLikes);
router.get('/brand/:brandId', loginRequired, likesController.getLikeStatus);

module.exports = router;

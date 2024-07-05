const express = require("express");
const router = express.Router();
const { userController } = require("../controllers");
const { loginRequired } = require("../utils/auth");

router.get("/signin", userController.signIn);
router.post("/signup", userController.signUp);
router.post('/login', userController.login);
router.get('/info', loginRequired,userController.getInfo);
router.get('/style', loginRequired,userController.getStyleImg);



module.exports = router;

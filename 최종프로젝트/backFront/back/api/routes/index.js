const express = require("express");
const router = express.Router();

const userRouter = require("./userRouter");
const backRouter = require('./backRouter');
const styleRouter = require('./styleRouter');
const likesRouter = require('./likesRouter');
const brandRouter = require('./brandRouter');
const searchRouter = require('./searchRouter');
const resultRouter = require('./resultRouter');


router.use('/style', styleRouter);
router.use("/users", userRouter);
router.use('/back', backRouter);
router.use('/likes', likesRouter);
router.use('/brand', brandRouter);
router.use('/search', searchRouter);
router.use('/result', resultRouter);

module.exports = router;

const { userService } = require("../services");
const { catchAsync } = require("../utils/error");
const jwt = require("jsonwebtoken");

const signIn = catchAsync(async (req, res) => {
  const kakaoCode = req.query.code;

  const accessToken = await userService.signIn(kakaoCode);

  return res.status(200).json({ accessToken: accessToken });
});

const signUp = catchAsync(async (req, res) => {
  const { name, password } = req.body;

  if (!name || !password) {
    throw new Error('Key_Error: Required fields: name, password');
  }

  await userService.signUp(name, password);
  return res.status(200).json({
    message: 'SIGNUP_SUCCESS'
  });
});

const login = catchAsync(async (req, res) => {
  const { name, password } = req.body;

  if (!name || !password) {
    throw new Error('Key_ERROR: Required fields: name, password');
  }
  const accessToken = await userService.login(name, password);
  
  return res.status(200).json({
    message: 'SIGNIN_SUCCESS',
    accessToken: accessToken
  });
});

const getInfo = catchAsync(async (req, res) => {
  const user = req.user; 
  
  return res.status(200).json({
    message: 'INFO_SUCCESS',
    data: user
    
  });
});

const getStyleImg = catchAsync(async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await userService.getStyleImg(userId);
    return res.status(200).json({
      message: "SUCCESS_StyleImg",
      data: result
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message
    });
  }
});

module.exports = {
  signIn,
  signUp,
  login,
  getInfo,
  getStyleImg

};

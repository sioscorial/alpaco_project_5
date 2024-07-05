const jwt = require("jsonwebtoken");
const { userDao } = require("../models");

const loginRequired = async (req, res, next) => {
  if (!req.headers.authorization) {
    const error = new Error("Authorization header is missing");
    error.statusCode = 401;
    return next(error);
  }

  const parts = req.headers.authorization.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    const error = new Error("Authorization header is not Bearer token");
    error.statusCode = 401;
    return next(error);
  }

  const accessToken = parts[1];
  if (!accessToken) {
    const error = new Error("NEED_ACCESS_TOKEN");
    error.statusCode = 401;
    
    return next(error);
  }

  try {
    const decodedToken = jwt.verify(accessToken, process.env.JWT_SECRET);
    const user = await userDao.getUserById(decodedToken.userId);

    if (!user) {
      const error = new Error("INVALID_ACCESS_TOKEN");
      error.statusCode = 401;
      return next(error);
    }
  
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

const tokenRequiredOrNot = async (req, res, next) => {
  const accessToken = req.headers.authorization;
  if (!accessToken) {
    return next();
  }
  try {
    const decodedToken = jwt.verify(accessToken, process.env.JWT_SECRET);
    const user = await userDao.getUserById(decodedToken.userId);
    if (!user) {
      const error = new Error("INVALID_ACCESS_TOKEN");
      error.statusCode = 401;
      next(error);  
      return;
    }
    req.user = user;
    next();
  } catch (err) {
    next(err);  
  }
};



module.exports = { loginRequired, tokenRequiredOrNot };

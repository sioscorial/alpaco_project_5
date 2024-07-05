const userDao = require("../models/userDao");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');

const hashPassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

const signIn = async (kakaoCode) => {
  const clientId = process.env.CLIENT_ID;
  const redirectUri = process.env.REDIRECT_URI;

  const kakaoToken = await axios({
    method: "POST",
    url: "https://kauth.kakao.com/oauth/token",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    },
    data: {
      grant_type: "authorization_code",
      client_id: clientId,
      redirect_uri: redirectUri,
      code: kakaoCode,
    },
  });

  const response = await axios.get("https://kapi.kakao.com/v2/user/me", {
    headers: {
      Authorization: `Bearer ${kakaoToken.data.access_token}`,
    },
  });

  const {
    id: socialId,
    properties: { nickname: name },
    kakao_account: {
      profile: { profile_image_url: profileImage },
    },
  } = response.data;

  let user = await userDao.getUserBySocialId(socialId);

  const jwtOptions = {
    algorithm: process.env.ALGORITHM,
    expiresIn: process.env.JWT_EXPIRES_IN,
  };

  let newUser = false;

  if (user.length === 0) {
    await userDao.signUp(name, socialId, profileImage);
    user = await userDao.getUserBySocialId(socialId);
    newUser = true;
  }

  let accessToken = jwt.sign({ userId: user[0].id }, process.env.JWT_SECRET, jwtOptions);

  if (user.length > 0) {
    if (user[0].signup_status === 0) {
      newUser = true;
    }
  }

  return { newUser, accessToken };
};

const signUp = async (name, password) => {
  const hashedPassword = await hashPassword(password);
  const createUser = await userDao.createUser(name, hashedPassword);
  return createUser;
};

const login = async (name, password) => {
  const user = await userDao.getUserByName(name);
  if (!user) {
    throw new Error('Invalid Id or Password');
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    throw new Error('Invalid ID or Password');
  }

  const accessToken = generateAccessToken(user.id);
  console.log('Generated Token:', accessToken);
  return accessToken;
};

const generateAccessToken = (userId) => {
  return jwt.sign({ userId: userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

const getInfo = async (id) => {
  return await userDao.getUserById(id); // getUserById에 전달하는 인자명 수정
};

const getStyleImg = async (userId) => {
  try {
    return await userDao.getStyleImg(userId);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  signIn,
  signUp,
  login,
  getInfo,
  getStyleImg
};


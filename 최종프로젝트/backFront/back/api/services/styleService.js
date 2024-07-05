const styleDao = require("../models/styleDao");

const processImage = async (file) => {
    return await styleDao.saveFileData(file);
  };
  
const saveImg = async (user_id, img_url) => {
  try {
    const newUserImage = await styleDao.saveImg(user_id, img_url);
    return newUserImage;
  } catch (err) {
    throw err;
  }
};

const aimodel = async (user_id, { style, similarities, img_url }) => {
  try {
    const result = await styleDao.aimodel(user_id, { style, similarities, img_url });
    return result;
  } catch (err) {
    throw err;
  }
};

const deleteStyle = async (userId, id) => {
  const result = await styleDao.deleteStyle(userId, id); 
  return result;
};

module.exports = { 
  processImage,
  saveImg,
  deleteStyle,
  aimodel
};
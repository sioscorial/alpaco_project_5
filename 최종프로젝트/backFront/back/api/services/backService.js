const backDao = require("../models/backDao");

const getRandomImages = async () => {
    const randomData = await backDao.getRandomImagesFromDatabase();
    return randomData;
};

module.exports = {
  getRandomImages
};
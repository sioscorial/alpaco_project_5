const brandDao = require("../models/brandDao");

const getBrandInfo = async (brandId) => {
    const result = await brandDao.getBrandInfo(brandId);
    return result;
};
const getBrandsByNameRange = async (startName, endName) => {
    const brands = await brandDao.getBrandsByNameRange(startName, endName);
    return brands;
  };

const getBrandItems = async(brandId) => {
    const result = await brandDao.getBrandItems(brandId);
    return result
}
module.exports = {
    getBrandInfo,
    getBrandsByNameRange,
    getBrandItems
};
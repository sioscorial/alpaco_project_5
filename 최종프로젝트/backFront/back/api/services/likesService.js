const likesDao  = require("../models/likesDao");

const toggleBrandLike = async (userId, brandId) => {
    const liked = await likesDao.getBrandLikeStatus(userId, brandId);

    if (liked) {
        await likesDao.deleteBrandLike(userId, brandId);
        return false; 
    } else {
        await likesDao.createBrandLike(userId, brandId);
        return true; 
    }
};

const toggleItemLike = async (userId, itemId) => {
    const liked = await likesDao.getItemLikeStatus(userId, itemId);

    if (liked) {
        await likesDao.deleteItemLike(userId, itemId);
        return false; 
    } else {
        await likesDao.createItemLike(userId, itemId);
        return true; 
    }
};

const getBrandLikes = async(userId) => {
    return await likesDao.getBrandLikes(userId);
};
const getItemLikes = async(userId) => {
    return await likesDao.getItemLikes(userId);
};

const getLikeStatus = async(userId, brandId) => {
    return await likesDao.getLikeStatus(userId, brandId)
};

module.exports = {
  toggleBrandLike,
  toggleItemLike,
  getBrandLikes,
  getItemLikes,
  getLikeStatus
};
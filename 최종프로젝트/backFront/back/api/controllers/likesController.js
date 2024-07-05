const { likesService} = require("../services");
const { catchAsync } = require("../utils/error");

const toggleBrandLike = catchAsync(async (req, res, next) => {
    const userId = req.user.id;
    const brandId = req.body.brandId;

    try {
        const liked = await likesService.toggleBrandLike(userId, brandId);
        const message = liked ? 'Brand liked successfully.' : 'Brand like removed successfully.';
        res.status(200).json({ message });
    } catch (err) {
        console.error("Error in toggleBrandLike:", err);
        next(new Error(`500: Internal Server Error. ${err.message}`));
    }
});


const toggleItemLike = catchAsync(async (req, res, next) => {
    const userId = req.user.id;
    const itemId = req.body.itemId;

    try {
        const liked = await likesService.toggleItemLike(userId, itemId);
        const message = liked ? 'Item liked successfully.' : 'Item like removed successfully.';
        res.status(200).json({ message });
    } catch (err) {
        console.error("Error in togglItemLike:", err);
        next(new Error(`500: Internal Server Error. ${err.message}`));
    }
});


const getBrandLikes = catchAsync(async (req, res) => {
    const userId = req.user.id;
    
    try {
        const result = await likesService.getBrandLikes(userId);
        res.status(200).json({ data: result });
    } catch (err) {
        console.error("Error in getBrandLikes:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

const getItemLikes = catchAsync(async (req, res) => {
    const userId = req.user.id;
    
    try {
        const result = await likesService.getItemLikes(userId);
        res.status(200).json({ data: result });
    } catch (err) {
        console.error("Error in getItemLikes:", err);
        res.status(400).json({ error: "Internal Server Error" });
    }
});
const getLikeStatus = catchAsync(async (req, res)=> {
    const userId = req.user.id;
    const brandId = req.params.brandId;

    try{
        const result = await likesService.getLikeStatus(userId, brandId);
        res.status(200).json({data: result});
    }catch(err){
        console.error("Error",err);
        res.stauts(400).json({error: "Error"})
    }
})
module.exports = {
  toggleBrandLike,
  toggleItemLike,
  getBrandLikes,
  getItemLikes,
  getLikeStatus
};
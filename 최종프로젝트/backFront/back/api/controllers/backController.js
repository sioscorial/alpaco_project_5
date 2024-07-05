const { backService } = require("../services");
const { catchAsync } = require("../utils/error");

const background = catchAsync(async (req, res) => {
    const randomImg = await backService.getRandomImages();
    res.status(200).json({ randomImg }); 
  });

module.exports = {
  background
};

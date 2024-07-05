const { resultService } = require("../services");
const { catchAsync } = require("../utils/error");

const results = catchAsync(async (req, res) => {
    const userStyleId = req.params.itemId; // 쿼리 파라미터로 userStyleId를 받습니다.
    const resultData = await resultService.result(userStyleId);
    res.status(200).json({ data: resultData });
  });
  
module.exports = {
    results
};

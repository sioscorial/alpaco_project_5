const { brandService } = require("../services");
const { catchAsync } = require("../utils/error");

const getBrandInfo = catchAsync(async (req, res, next) => {
    try {
        const brandId = req.params.brandId; // URL의 파라미터에서 브랜드 ID를 가져옵니다.
        const result = await brandService.getBrandInfo(brandId);
        if (!result) {
            throw new Error(404, 'Brand not found');
        }
        
        res.status(200).json({ data: result }); 
    } catch (err) {
        console.error("Error in getBrandInfo:", err);
        next(new Error(500, 'Internal Server Error', err.message));
    }
});

const getBrandsByNameRange = catchAsync(async (req, res, next) => {
    const startName = req.query.startName;
    const endName = req.query.endName;
  
    const brands = await brandService.getBrandsByNameRange(startName, endName);
  
    res.status(200).json(brands);
  });

  const getBrandItems = catchAsync(async (req, res, next)=> {
    const brandId = req.params.brandId; // req.query.brandId 대신 req.params.brandId를 사용합니다.
    const result = await brandService.getBrandItems(brandId);
    res.status(200).json({data: result});
});

module.exports = {
    getBrandInfo,
    getBrandsByNameRange,
    getBrandItems
};

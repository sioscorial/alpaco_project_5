const dataSource = require("../models/dataSource");
const { searchService } = require("../services");
const { catchAsync } = require("../utils/error");

const search = catchAsync(async (req, res) => {
    const query = req.query.query;
    const result = await searchService.search(query);
    res.status(200).json({result});
});



module.exports = {
    search
};

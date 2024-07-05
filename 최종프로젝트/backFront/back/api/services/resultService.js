const resultDao = require("../models/resultDao");

const result = async (userStylesId) => {
    const resultData = await resultDao.result(userStylesId);
    return resultData;
};

module.exports = {
    result
};
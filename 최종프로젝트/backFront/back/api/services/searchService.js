const searchDao = require("../models/searchDao");

const search = async (query) => {
    const result = await searchDao.search(query);
    return result;
};

module.exports = {
    search
};
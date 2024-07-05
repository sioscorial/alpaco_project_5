const dataSource = require("./dataSource");

const search = async (query) => {
  const result = await dataSource.query(`
    SELECT * FROM brand WHERE brand_name_kr LIKE '%${query}%';
  `);
  return result;
};

module.exports = {
    search
};
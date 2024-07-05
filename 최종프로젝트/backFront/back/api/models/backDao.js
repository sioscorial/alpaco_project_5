const dataSource = require("./dataSource");

const getRandomImagesFromDatabase = async () => {
    const result = await dataSource.query(`
      SELECT
        b.img_name,
        b.img_path,
        GROUP_CONCAT(DISTINCT b.brand_id SEPARATOR ', ') AS brand_ids,
        (
          SELECT GROUP_CONCAT(DISTINCT br.brand_logo_url SEPARATOR ', ')
          FROM brand br
          WHERE FIND_IN_SET(br.id, GROUP_CONCAT(DISTINCT b.brand_id))
        ) AS brand_logos
      FROM background b
      JOIN (
        SELECT img_name
        FROM background
        ORDER BY RAND()
        LIMIT 5
      ) AS random_img USING (img_name)
      GROUP BY b.img_name, b.img_path;
    `);
    return result;
  };
  
module.exports = {
  getRandomImagesFromDatabase
};
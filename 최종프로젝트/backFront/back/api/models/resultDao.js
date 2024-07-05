const dataSource = require("./dataSource");

const result = async (userStylesId) => {
    const query = `
    SELECT
        us.img_url as style_img_url,
        us.style_name,
        b.id as brand_id,
        b.brand_name_kr,
        b.brand_name_eng,
        b.brand_logo_url,
        usb.similarity
      FROM
        user_styles us
      LEFT JOIN
        user_styles_brand usb ON us.id = usb.user_styles_id
      LEFT JOIN
        brand b ON usb.brand_id = b.id
      WHERE
        us.id = ?
    `;
    try {
        const result = await dataSource.query(query, [userStylesId, userStylesId]);
        return result;
      } catch (error) {
        console.error('Error executing query:', error);
        throw new Error('Error retrieving data.');
      }
    
  };
  
module.exports = {
    result
};
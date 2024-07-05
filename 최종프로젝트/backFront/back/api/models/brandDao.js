const dataSource = require("./dataSource");

const getBrandInfo = async (brandId) => {
    try {
        const result = await dataSource.query(`
            SELECT 
                id,
                brand_name_kr,
                brand_name_eng,
                brand_logo_url,
                brand_since,
                brand_info,
                brand_insta_url,
                brand_home_url
            FROM brand
            WHERE id = ?`, [brandId]);
        return result;
    } catch (err) {
        console.error("Error in getBrandInfo:", err);
        throw new Error("Database query failed");
    }
};

const getBrandsByNameRange = async (startName, endName) => {
    try {
      const decodedStartName = decodeURIComponent(startName);
      const decodedEndName = decodeURIComponent(endName);
      const results = await dataSource.query(`
        SELECT
            id,
            brand_name_kr,
            brand_logo_url
        FROM brand
        WHERE brand_name_kr >= ?
        AND brand_name_kr < ?
      `, [decodedStartName, decodedEndName]);
  
      return results;
    } catch (err) {
      console.error("Error in getBrandsByNameRange:", err);
      throw new Error("Database query failed");
    }
  };


  const getBrandItems = async (brandId) => {
    try {
        const result = await dataSource.query(`
        SELECT 
            b.id AS brand_id,
            b.brand_name_kr,
            b.brand_name_eng,
            b.brand_logo_url,
            b.brand_since,
            b.brand_insta_url,
            b.brand_home_url,
            i.id AS item_id,
            i.name AS item_name,
            i.gender AS item_gender,
            REPLACE(i.price, '.00', '') AS item_price, 
            i.musinsa_link AS item_musinsa_link,
            i.naver_link AS item_naver_link,
            i.img_url AS item_img_url
        FROM brand b
        LEFT JOIN items i ON b.id = i.brand_id
        WHERE b.id = ?
        `, [brandId]);
        
        // 브랜드 정보
        const brandInfo = {
            id: result[0].brand_id,
            name_kr: result[0].brand_name_kr,
            name_eng: result[0].brand_name_eng,
            logo_url: result[0].brand_logo_url,
            since: result[0].brand_since,
            info: result[0].brand_info,
            insta_url: result[0].brand_insta_url,
            home_url: result[0].brand_home_url,
            items: []
        };

        // 아이템들
        const items = result.map(row => ({
            id: row.item_id,
            name: row.item_name,
            gender: row.item_gender,
            price: row.item_price,
            musinsa_link: row.item_musinsa_link,
            naver_link: row.item_naver_link,
            img_url: row.item_img_url
        })).filter(item => item.id); // 브랜드 정보가 반복될 때는 제외

        brandInfo.items = items;

        return brandInfo;
    } catch (err) {
        console.error("Error in getBrandItems:", err);
        throw new Error("Database query failed");
    }
};



module.exports = {
    getBrandInfo,
    getBrandsByNameRange,
    getBrandItems,
};
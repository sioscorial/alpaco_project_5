const dataSource = require("./dataSource");

const getBrandLikeStatus = async (userId, brandId) => {
    try {
        const result = await dataSource.query(`
            SELECT EXISTS(
                SELECT 1
                FROM brand_likes
                WHERE user_id = ? AND brand_id = ?
            ) AS liked`, [userId, brandId]);
        
        return result[0].liked === '1';
        
    } catch (err) {
        console.error("Error in getBrandLikeStatus:", err);
        throw new Error("Database query failed");
    }
};

const createBrandLike = async (userId, brandId) => {
    await dataSource.query('INSERT INTO brand_likes (user_id, brand_id) VALUES (?, ?)', [userId, brandId]);
};

const deleteBrandLike = async (userId, brandId) => {
    await dataSource.query('DELETE FROM brand_likes WHERE user_id = ? AND brand_id = ?', [userId, brandId]);
};


const getItemLikeStatus = async (userId, itemId) => {
    try {
        const result = await dataSource.query(`
            SELECT EXISTS(
                SELECT 1
                FROM item_likes
                WHERE user_id = ? AND items_id = ?
            ) AS liked`, [userId, itemId]);
        
        return result[0].liked === '1';
        
    } catch (err) {
        console.error("Error in getItemLikeStatus:", err);
        throw new Error("Database query failed");
    }
};

const createItemLike = async (userId, itemId) => {
    await dataSource.query('INSERT INTO item_likes (user_id, items_id) VALUES (?, ?)', [userId, itemId]);
};

const deleteItemLike = async (userId, itemId) => {
    await dataSource.query('DELETE FROM item_likes WHERE user_id = ? AND items_id = ?', [userId, itemId]);
};

const getBrandLikes = async(userId) => {
    try {
        const result = await dataSource.query(`
            SELECT 
                b.id,
                b.brand_name_kr,
                b.brand_name_eng,
                b.brand_logo_url,
                b.brand_since,
                b.brand_info,
                b.brand_insta_url,
                b.brand_home_url
            FROM brand_likes bl
            JOIN brand b ON bl.brand_id = b.id
            WHERE bl.user_id = ?`, [userId]);
        return result;
    } catch (err) {
        console.error("Error in getBrandLikesWithInfo:", err);
        throw new Error("Database query failed");
    }
};
const getItemLikes = async (userId) => {
    try {
        const result = await dataSource.query(`
        SELECT 
            i.id,
            i.name,
            i.gender,
            REPLACE(i.price, '.00', '') AS price, 
            i.musinsa_link,
            i.naver_link,
            i.img_url,
            b.brand_name_kr,
            b.brand_name_eng,
            b.brand_logo_url
        FROM item_likes il
        JOIN items i ON il.items_id = i.id
        JOIN brand b ON i.brand_id = b.id
        WHERE il.user_id = ?
        `, [userId]);
        return result;
    } catch (err) {
        console.error("Error in getItemLikes:", err);
        throw new Error("Database query failed");
    }
};

const getLikeStatus = async (userId, brandId) => {
    try {
      const result = await dataSource.query(`
        SELECT
          CASE
            WHEN EXISTS (
              SELECT 1
              FROM brand_likes
              WHERE user_id = ? AND brand_id = ?
            ) THEN TRUE
            ELSE FALSE
          END AS is_liked;
      `, [userId, brandId]);
      return result;
    } catch (err) {
      console.error("Error in getLikeStatus", err);
      throw new Error("Database query failed");
    }
  };

module.exports = {
    getBrandLikeStatus,
    getItemLikeStatus,
    createBrandLike,
    deleteBrandLike,
    createItemLike,
    deleteItemLike,
    getBrandLikes,
    getItemLikes,
    getLikeStatus

    
};

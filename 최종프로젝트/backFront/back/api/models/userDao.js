const dataSource = require("./dataSource");


const signUp = async (name, socialId, profileImage) => {
  await dataSource.query(
    `INSERT INTO users
      (name,
        social_platform_id,
        profile_image)
      VALUES (?,?,?)`,
    [name, socialId, profileImage]
  );
};

const getUserBySocialId = async (socialId) => {
  const result = await dataSource.query(
    `SELECT
        id,
        social_platform_id,
        signup_status
      FROM
        users
      WHERE social_platform_id = ?`,
    [socialId]
  );
  return result;
};

const createUser = async (userId, hashedPassword) => {
  try {
    const result = await dataSource.query(
      `INSERT INTO users (name, password) VALUES (?, ?);`,
      [userId, hashedPassword]
    );
    return result;
  } catch (error) {
    // 에러 메시지 수정
    throw new Error('INVALID_DATA_INPUT: Database operation failed');
  }
};

const getUserByName = async (name) => {
  try {
    const [userInfo] = await dataSource.query(
      `SELECT id, name, password FROM users WHERE name = ?`,
      [name]
    );
    return userInfo;
  } catch (error) {
    console.error('INVALID_INPUT_DATA', error);
    throw new Error('Database query failed');
  }
};
const getUserById = async (id) => {
  const [user] = await dataSource.query(
    `SELECT
        id,
        name,
        social_platform_id AS socialId,
        phone_number
      FROM
        users
      WHERE id = ?`,
    [id]
  );
  return user;
};

const getStyleImg = async (userId) => {
  const query = `
    SELECT
      us.id,
      us.user_id,
      us.img_url,
      us.created_at,
      ct.type as content_type
    FROM
      user_styles us
    JOIN
      contenttype ct ON us.contenttype_id = ct.id
    WHERE
      us.user_id = ?
  `;
  try {
    const result = await dataSource.query(query, [userId]);
    return result;
  } catch (error) {
    throw error;  // 적절한 에러 핸들링
  }
};


module.exports = {
  signUp,
  getUserBySocialId,
  createUser,
  getUserByName,
  getUserById,
  getStyleImg,
};

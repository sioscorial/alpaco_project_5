const dataSource = require("./dataSource");

const saveFileData = async (file) => {
  const { filename, mimetype, size } = file;
  const result = await dataSource.query('INSERT INTO files (filename, mimetype, size) VALUES (?, ?, ?) RETURNING *', 
  [filename, mimetype, size]);
  return result.rows[0];
};

const saveImg = async (user_id, img_url) => {
  try {
    // '브랜드추천'에 해당하는 ID 값을 가져오는 쿼리 실행
    const contenttypeResult = await dataSource.query(
      'SELECT id FROM contenttype WHERE type = ?',
      ['브랜드추천']
    );

    // '브랜드추천'에 해당하는 ID 값
    const contenttype_id = contenttypeResult[0].id;

    // INSERT 쿼리 실행
    const result = await dataSource.query(
      'INSERT INTO user_styles (user_id, img_url, contenttype_id) VALUES (?, ?, ?)',
      [user_id, img_url, contenttype_id]
    );

    return result[0];
  } catch (error) {
    throw error;
  }
};


const aimodel = async (user_id, { style, similarities, img_url }) => {
  try {
    // img_url 추가
    const userStyleId = await saveStyle(user_id, style, img_url);

    await saveSimilarities(userStyleId, similarities);

    return userStyleId;
  } catch (err) {
    console.error("Error in aimodel:", err.message);
    throw err;
  }
};

async function saveStyle(user_id, style, img_url) {
  // '브랜드추천'에 해당하는 ID 값을 가져오는 쿼리 실행
  const contenttypeResult = await dataSource.query(
    'SELECT id FROM contenttype WHERE type = ?',
    ['브랜드추천']
  );

  const contenttype_id = contenttypeResult[0].id;

  // INSERT 쿼리 실행
  await dataSource.query(
    `INSERT INTO user_styles (user_id, style_name, img_url, contenttype_id) VALUES (?, ?, ?, ?)`,
    [user_id, style, img_url, contenttype_id]
  );

  // 마지막 삽입된 ID 가져오기
  const result = await dataSource.query(`SELECT LAST_INSERT_ID() as id`);
  return result[0].id; // 새롭게 생성된 스타일 ID 반환
}

// 유사도 데이터 저장 함수
async function saveSimilarities(userStyleId, similarities) {
  for (const [brandName, similarity] of Object.entries(similarities)) {
    const brandId = await getBrandIdByName(brandName.trim());
    if (brandId) {
      await dataSource.query(
        `INSERT INTO user_styles_brand (user_styles_id, brand_id, similarity) VALUES (?, ?, ?)`,
        [userStyleId, brandId, similarity]
      );
    }
  }
}

async function getBrandIdByName(brandName) {
  const result = await dataSource.query(
    'SELECT id FROM brand WHERE brand_name_kr = ?',
    [brandName]
  );

  // 결과가 undefined이거나 배열의 길이가 0이면 null을 반환합니다.
  if (!result || result.length === 0) {
    return null; // 존재하지 않는 경우 null 반환
  }

  return result[0].id; // 존재하는 브랜드 ID 반환
}

const deleteStyle = async (userId, id) => {
  // 먼저 user_styles_brand 테이블에서 해당하는 user_styles_id로 검색하여 모든 레코드를 삭제합니다.
  await dataSource.query('DELETE FROM user_styles_brand WHERE user_styles_id = ?', [id]);

  // user_styles 테이블에서 해당하는 행을 삭제합니다.
  const result = await dataSource.query('DELETE FROM user_styles WHERE id = ?', [id]);

  return result;
};
module.exports = {
  saveFileData,
  saveImg,
  deleteStyle,
  aimodel
};
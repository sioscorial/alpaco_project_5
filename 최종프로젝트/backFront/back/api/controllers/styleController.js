const { styleService } = require('../services');
const { catchAsync } = require("../utils/error");
const multer = require('multer');
const path = require('path');
const { spawn } = require('child_process');

// 파일 저장 경로 설정
const uploadDir = path.join(__dirname, '../../public/images');
console.log('Upload directory path:', uploadDir);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}_${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
    cb(null, uniqueSuffix);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new Error('Not an image! Please upload only images.'), false);
  }
};

const upload = multer({ storage, fileFilter }).single('image');

const uploadImage = catchAsync(async (req, res, next) => {
  await upload(req, res, async (err) => {
    if (err) {
      return next(err);
    }
    console.log('Received file:', req.file);

    try {
      const filePath = req.file.path;
      const userId = req.user.id;

      // 포트 30001을 고정하여 이미지 URL 생성
      const imgUrl = `${req.protocol}://${req.get('host').split(':')[0]}:30001/images/${req.file.filename}`;
      console.log(imgUrl)

      // Python 스크립트 실행
      const pythonExecutable = '/home/alpaco/anaconda3/envs/recomm/bin/python';
      const scriptFile = '/home/alpaco/Project/Final_model/Recomendation_v2.py';
      
      const pythonProcess = spawn(pythonExecutable, [scriptFile, filePath]);

      let result = '';
      pythonProcess.stdout.on('data', (data) => {
        result += data.toString();
      });

      pythonProcess.stderr.on('data', (data) => {
        console.error(`Python error: ${data}`);
      });

      pythonProcess.on('close', async (code) => {
        if (code !== 0) {
          return next(new Error(`Python process exited with code ${code}`));
        }

        // Python 스크립트 결과 처리 (문자열 파싱)
        const [styleInfo, ...similaritiesInfo] = result.trim().split(',');
        const style = styleInfo.split(':')[1].trim();
        const similarities = similaritiesInfo.reduce((acc, curr) => {
          const [brand, sim] = curr.split(':');
          acc[brand.trim()] = parseFloat(sim.trim());
          return acc;
        }, {});

        // img_url을 함께 전달
        const processResult = await styleService.aimodel(userId, { style, similarities, img_url: imgUrl });
        res.status(200).json({
          message: "Image uploaded and processed successfully",
          data: processResult
        });
      });
    } catch (error) {
      next(error);
    }
  });
});

const deleteStyle = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const id = req.body.id; 
  if (!id) {
    return res.status(400).json({ message: "ID_NOT_PROVIDED" });
  }
  await styleService.deleteStyle(userId, id);
  res.status(200).json({ message: "SUCCESS_DELETE" });
});

module.exports = {
  uploadImage,
  deleteStyle
};

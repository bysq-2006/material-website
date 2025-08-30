const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 30 * 1024 * 1024 }, // 所有文件最大30MB
});

// 上传接口
router.post('/upload', upload.fields([
  { name: 'file', maxCount: 1 },
  { name: 'thumbnail', maxCount: 1 }
]), async (req, res) => {
  const path = require('path');
  const files = req.files;
  const name = req.body.title || '未命名';
  const author = req.body.author || '匿名';
  // 把乱码的中文字符转码成正常字符
  files.file[0].originalname = Buffer.from(files.file[0].originalname, 'latin1').toString('utf-8');

  // 校验 thumbnail 字段最大100KB
  if (files.thumbnail && files.thumbnail[0].buffer.length > 100 * 1024) {
    return res.status(400).json({ error: '缩略图不能大于100KB' });
  }
  const time = Date.now();
  // 统一文件夹路径
  const dirPath = path.join(__dirname, `../public/${time}-${files.file[0].originalname}`);

  // 保存 file 文件
  saveFile(files.file[0].buffer, files.file[0].originalname, dirPath);
  // 保存 thumbnail 文件
  saveFile(files.thumbnail[0].buffer, 'cover.jpg', dirPath);

  const Data = extractDatabase(name, author, files.file[0], files.thumbnail[0], dirPath)
  await insertMaterialToDB(Data, 'material_pending', req.app.locals.connection);

  res.sendStatus(200);
});


// 将一条数据插入到指定的表中，返回插入的ID
async function insertMaterialToDB(data, tableName, db) {
  const sql = `
    INSERT INTO ?? 
    (name, type, path, thumbnail, size, ext, author, createdAt)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const params = [
    tableName,
    data.name,
    data.type,
    data.path,
    data.thumbnail,
    data.size,
    data.ext,
    data.author,
    data.createdAt
  ];
  return new Promise((resolve, reject) => {
    db.query(sql, params, (err, result) => {
      if (err) return reject(err);
      resolve(result.insertId);
    });
  });
}

// 根据两个文件提取出对应的一条数据库信息并返回(返回为object)
function extractDatabase(name, author, file, thumbnail, dirPath) {
  return {
    name: name,
    type: getFileType(file.originalname),
    path: `/public/${path.basename(dirPath)}/${file.originalname}`,
    thumbnail: `/public/${path.basename(dirPath)}/cover.jpg`,
    size: file.size, // 单位是字节（Byte）
    ext: path.extname(file.originalname).toLowerCase().slice(1),
    author: author,
    createdAt: new Date(Date.now() + 8 * 3600 * 1000).toISOString().slice(0, 19).replace('T', ' ')
  };
}

function getFileType(filename) {
  const ext = path.extname(filename).toLowerCase();
  if (['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'].includes(ext)) return '图片';
  if (['.zip', '.rar', '.7z', '.json', '.model3.json'].includes(ext)) return 'live2d';
  if (['.mp4', '.avi', '.mov', '.wmv', '.flv', '.mkv', '.webm'].includes(ext)) return '视频';
  if (['.mp3', '.wav', '.aac', '.flac', '.ogg', '.m4a'].includes(ext)) return '音频';
  if (['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx', '.txt', '.md'].includes(ext)) return '文档';
  return '其他';
}

// 保存文件函数，参数：buffer（二进制数据）、filename（保存后的文件名）、dirPath（文件夹路径）
function saveFile(buffer, filename, dirPath) {
  const fs = require('fs');
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  fs.writeFileSync(require('path').join(dirPath, filename), buffer);
}

module.exports = router;


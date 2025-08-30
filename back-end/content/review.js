const express = require('express');
const path = require('path');
const jwt = require('jsonwebtoken');
const {rimraf} = require('rimraf');

const router = express.Router();
const secretKey = 'a#jnaw2533%)^*@)">/,<~'; // 请使用更复杂的密钥并妥善保管

// 登录接口，只校验密码，复用主连接
router.post('/login', (req, res) => {
  const { password } = req.body;
  const connection = req.app.locals.connection;
  connection.query('SELECT * FROM plain_password WHERE password = ?', [password], (err, results) => {
    if (err) {
      return res.status(500).json({ code: 500, msg: '服务器错误', error: err.message });
    }
    if (results.length > 0) {
      const token = jwt.sign({ password: password }, secretKey, { expiresIn: '1d' });
      return res.json({ code: 0, msg: '登录成功', token });
    } else {
      return res.status(401).json({ code: 2, msg: '密码呃呃呃呃' });
    }
  });
});

router.post('/review', (req, res) => {

  let token = req.headers['authorization']?.split(' ')[1];
  try {
    token = jwt.verify(token, secretKey);
  } catch (err) {
    return res.status(401).json({ code: 2, msg: 'token无效或已过期' });
  }
  const connection = req.app.locals.connection;
  connection.query('SELECT * FROM plain_password WHERE password = ?', [token.password], (err, results) => {
    if (err) {
      return res.status(500).json({ code: 500, msg: '服务器错误', error: err.message });
    }
    if (results.length > 0) {
      if (req.body.pass === true) {
        movePendingToMaterial(req.body.id, connection, (err, result) => {
          if (err) {
            return res.status(500).json({ code: 500, msg: '服务器错误', error: err ? err.message : '未知错误' });
          }
          return res.json(result);
        });
      }
      else {
        deleteFolderAndData(req.body.id, connection, (err, result) => {
          if (err) {
            return res.status(500).json({ code: 500, msg: '服务器错误', error: err ? err.message : '未知错误' });
          }
          return res.json(result);
        });
      }
    }
    else {
      return res.status(401).json({ code: 2, msg: '去登录去' });
    }
  });
})

// 将待审核素材移至展示区
function movePendingToMaterial(id, connection, callback) {
  connection.query('SELECT * FROM material_pending WHERE id = ?', [id], (err, results) => {
    if (err) return callback(err);
    if (results.length === 0) return callback(new Error('未找到待审核素材'));
    const material = results[0];
    connection.query(
      'INSERT INTO material (name, type, path, thumbnail, size, ext, author, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [material.name, material.type, material.path, material.thumbnail, material.size, material.ext, material.author, material.createdAt],
      (insertErr) => {
        if (insertErr) return callback(insertErr);
        connection.query('DELETE FROM material_pending WHERE id = ?', [id], (deleteErr) => {
          if (deleteErr) return callback(deleteErr);
          callback(null, { code: 0, msg: '素材已移至展示区' });
        });
      }
    );
  });
}

// 删除待审核素材及其文件夹
const deleteFolderAndData = (id, connection, callback) => {
  connection.query('SELECT * FROM material_pending WHERE id = ?', [id], (err, results) => {
    if (err) return callback(err);
    if (results.length === 0) return callback(new Error('未找到待审核素材'));
    const material = results[0];
    const folderPath = path.join(__dirname, '../public', material.path);

    rimraf(folderPath)
      .then(() => {
        connection.query('DELETE FROM material_pending WHERE id = ?', [id], (deleteErr) => {
          if (deleteErr) return callback(deleteErr);
          callback(null, { code: 0, msg: '文件夹和数据已删除' });
        });
      })
      .catch((fsErr) => callback(fsErr));
  });
};


// 获取待审核区前十条素材
router.get('/pending', (req, res) => {
  const connection = req.app.locals.connection;
  connection.query('SELECT * FROM material_pending ORDER BY createdAt DESC LIMIT 10', (err, results) => {
    if (err) {
      return res.status(500).json({ code: 500, msg: '服务器错误', error: err.message });
    }
    res.json({ code: 0, data: results });
  });
});

module.exports = router;
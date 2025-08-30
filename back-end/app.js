const express = require('express');
const path = require('path');

// 加载数据库配置
require('dotenv').config({ path: './config.env' });

const mysql = require('mysql2');
// 数据库连接
const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
});

const app = express();

app.locals.connection = connection; // 挂载到全局

const cors = require('cors');
app.use(cors({
  origin: '*'
}));

app.use(express.json());

const materialRouter = require('./content/material');
const uploadRouter = require('./content/upload');
const reviewRouter = require('./content/review');
app.use('/api', materialRouter);
app.use('/api', uploadRouter);
app.use('/api', reviewRouter);

app.use('/public', express.static('public'));// 托管静态资源
// 因为前端访问是跨域访问所以要下载的话只能通过后端来做接口了
app.get('/download/public/:folder/:filename', (req, res) => {
  const folder = req.params.folder;
  const filename = req.params.filename;
  const filePath = path.join(__dirname, 'public', folder, filename);
  res.download(filePath, filename, err => {
    if (err) {
      res.status(404).send('文件未找到');
    }
  });
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
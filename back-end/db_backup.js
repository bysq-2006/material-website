// db_backup.js
// 数据库自动备份与清理脚本
// 1. 启动时备份所有表数据到 backup 目录
// 2. 删除超过 MaximumRetentiontTime 天的备份文件

// 在linux里面每天凌晨三点运行的方法
// crontab -e
// 然后会进入一个编辑器，在里面添加：0 3 * * * node db_backup.js

const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const BACKUP_DIR = path.join(__dirname, 'backup'); // 备份文件存放目录
const MAX_DAYS = parseInt(process.env.MaximumRetentiontTime, 10) || 24; // 最大保留天数

// 备份数据库所有表数据
async function backupDatabase() {
  // 创建数据库连接
  const connection = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  });

  // 查询所有表名
  const [tables] = await connection.query('SHOW TABLES');
  const tableNames = tables.map(row => Object.values(row)[0]);
  const backupData = {};

  // 遍历每个表，导出数据
  for (const table of tableNames) {
    const [rows] = await connection.query(`SELECT * FROM \`${table}\``);
    backupData[table] = rows;
  }

  await connection.end(); // 关闭连接

  // 确保备份目录存在
  if (!fs.existsSync(BACKUP_DIR)) fs.mkdirSync(BACKUP_DIR);

  // 生成备份文件名，包含时间戳
  const filename = `backup_${new Date().toISOString().replace(/[:.]/g, '-')}.json`;
  fs.writeFileSync(path.join(BACKUP_DIR, filename), JSON.stringify(backupData, null, 2));
  console.log(`数据库已备份到 ${filename}`);
}

// 清理超过最大保留天数的备份文件
function cleanOldBackups() {
  if (!fs.existsSync(BACKUP_DIR)) return;
  const files = fs.readdirSync(BACKUP_DIR);
  const now = Date.now();

  files.forEach(file => {
    const filePath = path.join(BACKUP_DIR, file);
    const stats = fs.statSync(filePath);
    // 计算文件创建到现在的天数
    const ageDays = (now - stats.birthtimeMs) / (1000 * 60 * 60 * 24);
    if (ageDays > MAX_DAYS) {
      fs.unlinkSync(filePath); // 删除过期文件
      console.log(`已删除过期备份: ${file}`);
    }
  });
}

// 主流程：先备份再清理
async function main() {
  await backupDatabase();
  cleanOldBackups();
}

main().catch(err => {
  console.error('备份失败:', err);
});

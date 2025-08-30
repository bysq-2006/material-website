const express = require('express');
const router = express.Router();
const pagesize = 12

// GET /api/materials?page=1&search=xxx&classify=图片
router.get('/materials', (req, res) => {
  const connection = req.app.locals.connection;
  const page = parseInt(req.query.page) || 1;
  const pageSize = pagesize;
  const search = req.query.search || '';
  const classify = req.query.classify || '';
  const offset = (page - 1) * pageSize;

  let sql = `
    SELECT * FROM material
    WHERE name LIKE ?
  `;
  let params = [`%${search}%`];

  if (classify && classify !== '全部') {
    sql += ' AND type = ?';
    params.push(classify);
  }

  sql += `
    ORDER BY createdAt DESC
    LIMIT ? OFFSET ?
  `;
  params.push(pageSize, offset);

  connection.query(
    sql,
    params,
    (err, results) => {
      if (err) return res.status(500).json({ error: '数据库查询失败' });
      res.json({ data: results });
    }
  );
});

// GET /api/materials/count?search=xxx&classify=图片
router.get('/materials/count', (req, res) => {
  const connection = req.app.locals.connection;
  const search = req.query.search || '';
  const classify = req.query.classify || '';

  let sql = `
    SELECT COUNT(*) AS total FROM material
    WHERE name LIKE ?
  `;
  let params = [`%${search}%`];

  if (classify && classify !== '全部') {
    sql += ' AND type = ?';
    params.push(classify);
  }

  connection.query(
    sql,
    params,
    (err, results) => {
      if (err) return res.status(500).json({ error: '数据库查询失败' });
      const total = results[0].total;
      const pageSize = pagesize;
      const totalPages = Math.ceil(total / pageSize);
      res.json({ total, totalPages });
    }
  );
});

module.exports = router;
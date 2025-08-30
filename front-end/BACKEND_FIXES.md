# 后端代码修复说明

## 需要修复的问题：

### 1. 路由路径问题
**文件位置**: 后端路由文件
**问题**: `router.post('review', ...)` 缺少路径前缀
**修复**: 
```javascript
// 错误的写法
router.post('review', (req, res) => {

// 正确的写法  
router.post('/review', (req, res) => {
```

### 2. JWT验证问题
**问题**: 在review接口中，token验证逻辑有误
**当前代码**:
```javascript
const token = req.headers['authorization']?.split(' ')[1];
connection.query('SELECT * FROM plain_password WHERE password = ?', [token.password], ...)
```

**修复建议**:
```javascript
router.post('/review', (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ code: 2, msg: '未提供认证令牌' });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    const connection = req.app.locals.connection;
    
    // 验证密码是否仍然有效
    connection.query('SELECT * FROM plain_password WHERE password = ?', [decoded.password], (err, results) => {
      if (err) {
        return res.status(500).json({ code: 500, msg: '服务器错误', error: err.message });
      }
      if (results.length > 0) {
        if (req.body.pass === true) {
          movePendingToMaterial(req.body.id, connection, (err, result) => {
            if (err) {
              return res.status(500).json({ code: 500, msg: '服务器错误', error: err.message });
            }
            return res.json(result);
          });
        } else {
          deleteFolderAndData(req.body.id, connection, (err, result) => {
            if (err) {
              return res.status(500).json({ code: 500, msg: '服务器错误', error: err.message });
            }
            return res.json(result);
          });
        }
      } else {
        return res.status(401).json({ code: 2, msg: '认证失败，请重新登录' });
      }
    });
  } catch (jwtError) {
    return res.status(401).json({ code: 2, msg: '令牌无效，请重新登录' });
  }
});
```

### 3. 回调函数修复
**问题**: movePendingToMaterial 和 deleteFolderAndData 函数中的回调使用不当
**修复**: 确保在成功的情况下正确调用回调并返回成功响应

## 前端已实现的功能：

1. **管理员登录页面** (`/admin`)
   - 密码验证
   - JWT token 存储
   - 自动跳转到管理面板

2. **管理面板功能**
   - 查看待审核素材列表
   - 通过/拒绝素材审核
   - 实时刷新列表
   - 响应式设计

3. **状态管理**
   - 使用 Pinia 管理登录状态
   - 本地存储 token
   - 自动检查登录状态

4. **用户体验**
   - 加载状态显示
   - 操作反馈提示
   - 确认对话框
   - 错误处理

## 访问方式：
访问 `http://localhost:端口/admin` 即可进入管理页面

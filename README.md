# 项目简介

本项目为前后端分离架构，分为 `front-end`（前端）和 `back-end`（后端）两个部分。

后端使用之前请先在mysql可以root身份执行初始化文件

## 部署说明

- 后端服务默认运行在 3000 端口。
- 如果前后端部署在不同服务器，需要在前端 `src/home/index.ts` 文件中修改 API 请求的后端 IP 地址。
- 前端使用 Vite 构建，相关配置在 `vite.config.ts`。
- 后端环境变量配置在 `back-end/config.env`，可用于设置数据库连接、端口等参数。
- 数据库初始化脚本为 `back-end/sql初始化.sql`，如需恢复数据可使用 `back-end/db_backup.js`。
- 静态资源存放于 `front-end/public`。

## 环境变量说明

后端环境变量文件为 `back-end/config.env`，常见配置如下：

```
PORT=3000           # 后端服务端口
DB_HOST=localhost   # 数据库主机地址
DB_USER=root        # 数据库用户名
DB_PASS=xxxxxx      # 数据库密码
```

如需修改端口或数据库连接信息，请直接编辑该文件并重启后端服务。

---
如有更多部署或开发细节，可根据实际情况补充。

-- 请使用root用户执行此脚本

CREATE DATABASE IF NOT EXISTS material_website DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE material_website;


-- 主要素材表（已审核）
CREATE TABLE material (
  id INT PRIMARY KEY AUTO_INCREMENT COMMENT '主键',
  name VARCHAR(255) NOT NULL COMMENT '素材名称',
  type VARCHAR(50) NOT NULL COMMENT '素材类型',
  path VARCHAR(500) NOT NULL COMMENT '素材文件路径',
  thumbnail VARCHAR(500) COMMENT '缩略图路径',
  size VARCHAR(50) COMMENT '素材大小',
  ext VARCHAR(20) COMMENT '文件扩展名',
  author VARCHAR(100) COMMENT '作者',
  createdAt DATETIME NOT NULL COMMENT '创建时间'
);
-- 待审核素材表
CREATE TABLE material_pending (
  id INT PRIMARY KEY AUTO_INCREMENT COMMENT '主键',
  name VARCHAR(255) NOT NULL COMMENT '素材名称',
  type VARCHAR(50) NOT NULL COMMENT '素材类型',
  path VARCHAR(500) NOT NULL COMMENT '素材文件路径',
  thumbnail VARCHAR(500) COMMENT '缩略图路径',
  size VARCHAR(50) COMMENT '素材大小',
  ext VARCHAR(20) COMMENT '文件扩展名',
  author VARCHAR(100) COMMENT '作者',
  createdAt DATETIME NOT NULL COMMENT '创建时间'
);

-- 密码表
CREATE TABLE plain_password (
  password VARCHAR(255) NOT NULL
);


-- 创建新用户（例如用户名为 material_user，密码为 yourpassword）
CREATE USER 'material_user'@'%' IDENTIFIED BY '@#Fw15a';

-- 授权该用户对 material_website 数据库的所有权限
GRANT ALL PRIVILEGES ON material_website.* TO 'material_user'@'%';

-- 刷新权限表，让授权立即生效
FLUSH PRIVILEGES;
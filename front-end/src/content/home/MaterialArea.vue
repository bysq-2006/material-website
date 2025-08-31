<template>
  <div class="MaterialArea">
    <!-- 这里是素材展示区域的内容 -->
    <div class="material-card" v-for="item in homeStore().Materials" :key="item.id">
      <img :src="item.thumbnail" alt="图片加载失败" class="display-img">

      <a :href="'/download' + item.path" :download="item.path" class="download-link">
        <button class="download"></button>
      </a>

      <div class="introduction">
        <h3>{{ item.name }}</h3>
        <div class="meta">
          <span>{{ item.ext }} · {{ formatSize(item.size) }}</span>
          <span>作者：{{ item.author }}</span>
          <span>{{ item.createdAt.substring(0, 10) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup name="MaterialArea">
/* 后端API
  id         // 素材唯一标识（主键）
  name       // 素材名称
  type       // 素材类型（如图片、视频、音频、文档等）
  path       // 素材文件的存储路径或访问地址
  thumbnail  // 缩略图地址
  size       // 文件大小（如 2.4MB）
  ext        // 文件扩展名（如 .jpg、.mp4）
  author     // 上传者或作者信息
  createdAt  // 上传时间
*/

// type有
// 图片
// live2d
// 视频
// 音频
// 文档
// 其他
import { homeStore } from '@/store/home'

import { onMounted } from 'vue'

function formatSize(bytes) {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB'
  if (bytes < 1024 * 1024 * 1024) return (bytes / 1024 / 1024).toFixed(2) + ' MB'
  return (bytes / 1024 / 1024 / 1024).toFixed(2) + ' GB'
}
</script>

<style scoped>
.introduction {
  height: 54px;
  padding: 16px 12px 0 12px;

  display: flex;
  flex-direction: column;
  justify-content: center;
}

.introduction h3 {
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 8px;
}

.introduction .meta {
  color: #888;
  font-size: 16px;
  display: flex;
  gap: 12px;
}

.download-link {
  /* 确保 a 标签不影响按钮的定位 */
  position: absolute;
  bottom: 16px;
  right: 10px;
  width: 32px;
  height: 32px;
}

.download {
  width: 32px;
  height: 32px;
  background: url('/svg/download.svg') no-repeat center center;
  border: none;
  cursor: pointer;
}

.material-card .display-img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.material-card {
  position: relative;

  width: 100%;
  height: 284px;
  border-radius: 8px;
  overflow: hidden;

  border: 1px solid #e0e0e0;
}

.MaterialArea {
  margin: 0 auto;
  width: 90vw;

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  gap: 24px;
}
</style>
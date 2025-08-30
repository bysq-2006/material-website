<template>
  <div class="submit">
    <h3 class="bigtitle">
      开始投稿
    </h3>

    <div class="choice" v-if="contributionStore().file">
      <img src="/svg/ic_ok.svg">
      <h3>已提交，待上传</h3>
    </div>
    <div class="choice" @click="$refs.fileInput.click()" v-else>
      <img src="/svg/upload.svg" alt="">
      <p>点击或拖拽文件到此处上传</p>
      <p style="transform:translateY(-8px);color:#888;">支持大部分格式，最大文件大小30MB</p>
      <input type="file" class="cover-input" @change="handleFileChange" ref="fileInput">
      <button class="select">选择文件</button>
    </div>

    <div class="cover">
      <h3 class="smalltitle">
        上传封面图片
      </h3>
      <div class="cover-upload">
        <span class="cover-text">选择封面图片</span>
        <input type="file" class="cover-input" accept="image/*" @change="handleThumbnailChange" ref="ThumbnailInput">
        <button class="cover-btn" @click="$refs.ThumbnailInput.click()">选择文件</button>
      </div>
      <div v-if="contributionStore().thumbnail" class="cover-preview">
        <img :src="URL.createObjectURL(contributionStore().thumbnail)" alt="封面预览"
          style=" max-height: 200px; margin-top: 16px; border-radius: 8px; border: 1px solid #e0e0e0;" />
      </div>
    </div>

    <div class="title">
      <h3 class="smalltitle">
        素材标题
      </h3>
      <input v-model="contributionStore().title" type="text" class="publicinput"
        placeholder="请输入素材标题，因为我没有写标签分类的逻辑，所以建议把标签加上">
    </div>

    <div class="author">
      <h3 class="smalltitle">
        作者网名
      </h3>
      <input v-model="contributionStore().author" type="text" class="publicinput" placeholder="请输入作者的名字">
    </div>

    <div class="copyright-confirm">
      <label>
        <input type="checkbox" v-model="checked" />
        我确认对提交的素材拥有版权，并同意平台的
        <a href="/terms" target="_blank">使用条款</a>
        和
        <a href="/privacy" target="_blank">隐私政策</a>
      </label>
    </div>

    <button v-if="contributionStore().progress < 0" class="upload" :disabled="!checked" @click="submitData">
      提交素材
    </button>
    <div v-else style="margin-top:32px;" class="upload-status">
      <p v-if="contributionStore().progress < 100">上传中... {{ contributionStore().progress }}%</p>
      <p v-else>上传完成awa</p>
    </div>
  </div>
</template>

<script setup name="Submission">
import { ref, toRef } from 'vue'
import { contributionStore } from '@/store/contribution';

console.log(contributionStore().progress);

const URL = window.URL || window.webkitURL
// 处理封面图片选择
function handleThumbnailChange(event) {
  const thumbnail = event.target.files[0];
  if (thumbnail) {
    contributionStore().thumbnail = thumbnail;
  }
}

function handleFileChange(event) {
  const file = event.target.files[0];
  if (file) {
    contributionStore().file = file;
  }
}

function submitData() {
  if (contributionStore().file.size > 30 * 1024 * 1024) {
    window.alert('文件大小不能超过30MB');
    return;
  }
  contributionStore().submit()
}
const checked = ref(false)
</script>

<style scoped>
.upload-status {
  margin-top: 32px;
  padding: 20px 0;
  width: 100%;
  text-align: center;
  background: linear-gradient(90deg, #e3f2fd 0%, #f8f9fa 100%);
  border-radius: 8px;
  font-size: 18px;
  color: #007AFF;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.07);
}

.upload-status p {
  margin: 0;
  font-weight: 500;
  letter-spacing: 1px;
  animation: fadeIn 0.5s;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

button.upload:disabled {
  background-color: #b0b0b0;
  color: #fff;
  cursor: not-allowed;
  opacity: 0.7;
}

button.upload {
  margin-top: 32px;
  border-radius: 8px;
  border: none;
  background-color: #007AFF;
  color: #fff;
  font-size: 18px;
  width: 130px;
  height: 48px;
  cursor: pointer;
}

/* 选择勾选同意协议的 */
.copyright-confirm {
  transform: translateX(-3px);
  margin-top: 32px;
  font-size: 16px;
}

.copyright-confirm label {
  display: flex;
  align-items: center;
}

.copyright-confirm input[type='checkbox'] {
  width: 18px;
  height: 18px;
  margin-right: 8px;
}

.copyright-confirm a {
  color: #2196f3;
  text-decoration: underline;
  margin: 0 2px;
}

/* 表单区块容器 */
.submit {
  margin: 54px auto;
  padding: 32px 32px;
  width: 840px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  border-radius: 12px;
}

/* 标题样式 */
.bigtitle {
  font-size: 24px;
  font-weight: 550;
}

.smalltitle {
  font-size: 18px;
  font-weight: 550;
}

/* 文件上传区域 */
.choice {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;

  margin-top: 16px;
  width: 776px;
  height: 274px;
  border-radius: 8px;
  border: 3px dashed #e0e0e0;
  transition: all 0.3s;
}

.choice:hover {
  background-color: #f2f2f2;
  transition: all 0.3s;
}

.choice img {
  width: 48px;
  height: 48px;
}

.choice button {
  margin-top: 10px;
  width: 112px;
  height: 40px;
  border: none;
  border-radius: 8px;
  background-color: #f3f4f6;
  font-size: 16px;
}

.choice button:hover {
  background-color: #e5e7eb;
  cursor: pointer;
}

/* 封面图片上传区域 */
.cover {
  margin-top: 32px;
}

.cover-upload {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 16px;
  padding: 16px 20px;
  width: fit-content;
  border-radius: 8px;
  background-color: #f8f9fa;
  border: 1px solid #e9ecef;
}

.cover-text {
  font-size: 16px;
  color: #495057;
  margin-right: 8px;
}

.cover-input {
  display: none;
}

.cover-btn {
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  background-color: #007AFF;
  color: white;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
}

.cover-btn:hover {
  background-color: #0056b3;
}

/* 表单输入区域 */
.title {
  margin-top: 32px;
}

.author {
  margin-top: 32px;
}

.publicinput {
  margin-top: 16px;
  width: 776px;
  height: 50px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 18px;
  padding: 0 16px;
  box-sizing: border-box;
  outline: none;
}
</style>

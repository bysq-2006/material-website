<template>
  <div class="search">
    <div class="search-box">
      <img src="/svg/search.svg" alt="search">
      <input v-model="homeStore().search" @keydown.enter="onInput" type="text" placeholder="搜索你想要的素材..." />
      <button @click="onInput">搜索</button>
    </div>

    <div class="classify" ref="classify" @click="activeClassify">
      <button class="classify-btn active">全部</button>
      <button class="classify-btn">图片</button>
      <button class="classify-btn">live2d</button>
      <button class="classify-btn">视频</button>
      <button class="classify-btn">音频</button>
      <button class="classify-btn">文档</button>
      <button class="classify-btn">其他</button>
    </div>
  </div>
</template>

<script setup name="search">
import { ref } from 'vue'
import { homeStore } from '@/store/home'

const classify = ref(null)

// 分类功能
function activeClassify(event) {
  if (event.target.tagName !== 'BUTTON') return
  const buttons = classify.value.querySelectorAll('button')
  buttons.forEach(button => {
    button.classList.remove('active')
  })
  event.target.classList.add('active')
  homeStore().classify = event.target.innerText
  homeStore().page = 1
  homeStore().fetchMaterials()
  homeStore().setTotalPages()
}

// 搜索功能
function onInput() {
  homeStore().page = 1
  homeStore().fetchMaterials()
  homeStore().setTotalPages()
}
</script>

<style scoped>
.classify {
  margin-top: 32px;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.classify-btn {
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 6px;
  border: 1px solid #e0e0e0;
  background: #fff;
  border-radius: 999px;
  padding: 0 18px;
  height: 38px;
  color: #333;
  cursor: pointer;
  font-weight: 500;
  transition: border-color 0.2s, color 0.2s;
}

.classify-btn.active {
  background: #2196f3;
  color: #fff;
  border-color: #2196f3;
}

.classify-btn img {
  width: 22px;
  height: 22px;
}

.search {
  height: 244px;

  display: flex;
  align-items: center;
  flex-direction: column;
}

.search-box {
  margin-top: 48px;
  height: 50px;
  width: 1152px;

  display: flex;
  align-items: center;
  border: 1px solid #e0e0e0;
  background: #fff;
  border-radius: 999px;

  padding-left: 15px;
  padding-right: 10px;
  gap: 4px;
}

.search-box input {
  font-size: 16px;
  border: none;
  outline: none;
  flex: 1
}

.search-box button {
  font-size: 16px;
  width: 86px;
  height: 34px;

  background: #2196f3;
  border-radius: 999px;
  color: #fff;
  font-weight: bold;
  border: none;
  cursor: pointer;
}

@media (max-width: 1200px) {
  .search-box {
    width: 96%;
  }
}
</style>

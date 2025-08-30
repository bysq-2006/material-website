<template>
  <div class="notice-container">
    <img src="/svg/！.svg" alt="">
    <div class="notice-content">
      您的投稿将进入审核队列，审核期约为1-3个工作日。审核通过后，您的素材将在平台展示。
    </div>
    <div class="left"></div>
  </div>
</template>

<script setup name="Notice">
</script>

<style scoped>
.left {
  width: 98%;
  height: 98%;
  position: absolute;
  left: -4px;
  background-color: #007aff;
  z-index: -1;
  border-radius: 8px;
}

img {
  width: 20;
  height: 20;
  margin-right: 16px;
}

.notice-container {
  margin: 0 auto;
  width: 840px;
  height: 62px;
  display: flex;
  align-items: center;
  background: #e3f2fd;
  border-radius: 8px;
  padding: 28px 20px;
  position: relative;
  margin-bottom: 32px;
}

.notice-content {
  color: #333;
  font-size: 14px;
  /* transform: translateY(-3px); */
}
</style>
<template>
  <!-- 头部导航 -->
  <div class="head">
    <h2>
      二创素材网
    </h2>
    <div class="navigation">
      <router-link to="/" active-class="active">首页</router-link>
      <router-link to="/contribution" active-class="active">素材投稿</router-link>
      <router-link to="/contact" active-class="active">关于我们</router-link>
    </div>
  </div>
</template>

<script setup name="Head">
</script>

<style scoped>
.head {
  height: 65px;
  width: 100%;

  box-sizing: border-box;
  padding: 16px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  border-bottom: 1px dashed #ccc;
}

h2 {
  color: #2196f3;
  font-weight: bold;
  font-size: 26px;
}

.navigation {
  display: flex;
  gap: 16px;
  font-size: 16px;
}

a:hover {
  color: #2196f3;
  transition: all 0.2s ease-in-out;
}

a.active {
  color: #2196f3;
}
</style>

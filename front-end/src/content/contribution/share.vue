<template>
  <div class="share">
    <div class="share__bg"></div>
    <div class="text">
      <h2>
        分享你的二创素材
      </h2>
      <p>
        分享你的设计、代码、文章等二创素材，共同打造优质的素材库。
      </p>
    </div>
  </div>
</template>

<script setup name="share">

</script>

<style scoped>
.share .text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  transform: translateY(-16px);
}

.share h2 {
  color: #fff;
  margin-bottom: 16px;
  font-weight: bold;
  font-size: 36px;
}

.share p {
  font-size: 18px;
  color: #f0f0f0;
  font-weight: 500;
}

.share {
  display: flex;

  padding: 64px 240px;

  width: 100%;
  height: 448px;
  background: linear-gradient(to right, #0079ff, #5ea4fa);

  position: relative;
  overflow: hidden;
}

.share__bg {
  position: absolute;
  left: 0; top: 0;
  width: 100%;
  height: 100%;
  background-image: url('/MYGOlogo.png');
  background-repeat: no-repeat;  /* 不重复 */
  background-position: center;
  opacity: 0.2;                  /* 可调透明度 */
  z-index: 0;
}
</style>
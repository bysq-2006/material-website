<template>
  <div class="pagination">
    <button class="page-btn" :disabled="homeStore().page === 1" @click="goPrev">上一页</button>
    <button v-for="page in homeStore().totalPages" :key="page" class="page-btn"
      :class="{ active: homeStore().page === page }" @click="goToPage(page)">
      {{ page }}
    </button>
    <button class="page-btn" :disabled="homeStore().page === homeStore().totalPages" @click="goNext">下一页</button>
  </div>
</template>

<script setup name="Pagination">
import { onMounted } from 'vue'
import { homeStore } from '@/store/home'

onMounted(async () => {
  homeStore().totalPages = await homeStore().fetchTotalPages()
  homeStore().fetchMaterials()
})

function goToPage(page) {
  homeStore().page = page
  homeStore().fetchMaterials()
}

function goPrev() {
  goToPage(homeStore().page - 1)
}

function goNext() {
  goToPage(homeStore().page + 1)
}
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 46px;
  margin-bottom: 48px;
}

.page-btn {
  min-width: 40px;
  height: 32px;
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  color: #333;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}

.page-btn.active {
  background: #2196f3;
  color: #fff;
  border-color: #2196f3;
}

.page-btn:disabled {
  background: #f5f5f5;
  color: #b0b0b0;
  cursor: not-allowed;
}
</style>

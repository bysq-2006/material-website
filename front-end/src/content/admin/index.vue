<template>
  <div class="admin-container">
    <div v-if="!admin.isLoggedIn" class="login-section">
      <Login />
    </div>
    <div v-else class="admin-dashboard">
      <AdminHeader />
      <PendingReview />
    </div>
  </div>
</template>

<script setup name="Admin-index">
import { onMounted } from 'vue'
import { adminStore } from '../../store/admin'
import Login from './Login.vue'
import AdminHeader from './AdminHeader.vue'
import PendingReview from './PendingReview.vue'

const admin = adminStore()

onMounted(() => {
  admin.checkToken()
  if (admin.isLoggedIn) {
    admin.fetchPendingMaterials()
  }
})
</script>

<style scoped>
.admin-container {
  min-height: 80vh;
  padding: 20px;
}

.login-section {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
}

.admin-dashboard {
  max-width: 1200px;
  margin: 0 auto;
}
</style>

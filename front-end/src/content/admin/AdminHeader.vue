<template>
  <div class="admin-header">
    <div class="header-content">
      <h1>管理员面板</h1>
      <div class="header-actions">
        <span class="welcome-text">欢迎回来，管理员</span>
        <button @click="handleLogout" class="logout-btn">退出登录</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { adminStore } from '../../store/admin'

const admin = adminStore()

const handleLogout = () => {
  if (confirm('确定要退出登录吗？')) {
    admin.logout()
  }
}
</script>

<style scoped>
.admin-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 20px 0;
  margin-bottom: 30px;
  border-radius: 8px;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
}

h1 {
  margin: 0;
  font-size: 28px;
  font-weight: 600;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 20px;
}

.welcome-text {
  font-size: 14px;
  opacity: 0.9;
}

.logout-btn {
  padding: 8px 16px;
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 14px;
}

.logout-btn:hover {
  background-color: rgba(255, 255, 255, 0.3);
  border-color: rgba(255, 255, 255, 0.5);
}

@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    gap: 15px;
    text-align: center;
  }
  
  h1 {
    font-size: 24px;
  }
}
</style>

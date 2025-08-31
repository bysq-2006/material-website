<template>
  <div class="pending-review">
    <div class="section-header">
      <h2>待审核素材</h2>
      <button @click="refreshList" class="refresh-btn" :disabled="isLoading">
        {{ isLoading ? '刷新中...' : '刷新列表' }}
      </button>
    </div>

    <div v-if="message" class="message" :class="messageType">
      {{ message }}
    </div>

    <div v-if="admin.pendingMaterials.length === 0" class="empty-state">
      <p>暂无待审核素材</p>
    </div>

    <div v-else class="materials-grid">
      <div 
        v-for="material in admin.pendingMaterials" 
        :key="material.id" 
        class="material-card"
      >
        <div class="material-info">
          <div class="material-thumbnail">
            <img 
              v-if="material.thumbnail" 
              :src="material.thumbnail" 
              :alt="material.name"
              @error="handleImageError"
            />
            <div v-else class="no-thumbnail">
              <span>{{ getFileTypeIcon(material.ext) }}</span>
            </div>
          </div>
          
          <div class="material-details">
            <h3 class="material-name">{{ material.name }}</h3>
            <div class="material-meta">
              <span class="meta-item">类型: {{ material.type }}</span>
              <span class="meta-item">格式: {{ material.ext }}</span>
              <span class="meta-item">大小: {{ formatFileSize(material.size) }}</span>
              <span class="meta-item">作者: {{ material.author }}</span>
              <span class="meta-item">提交时间: {{ formatDate(material.createdAt) }}</span>
            </div>
          </div>
        </div>

        <div class="material-actions">
          <button 
            @click="handleReview(material.id, true)" 
            class="approve-btn"
            :disabled="processingIds.includes(material.id)"
          >
            {{ processingIds.includes(material.id) ? '处理中...' : '通过' }}
          </button>
          <button 
            @click="handleReview(material.id, false)" 
            class="reject-btn"
            :disabled="processingIds.includes(material.id)"
          >
            {{ processingIds.includes(material.id) ? '处理中...' : '拒绝' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { adminStore } from '../../store/admin'
import { homeStore } from '../../store/home'

const admin = adminStore()
const home = homeStore()
const isLoading = ref(false)
const processingIds = ref([])
const message = ref('')
const messageType = ref('')

const refreshList = async () => {
  isLoading.value = true
  await admin.fetchPendingMaterials()
  isLoading.value = false
}

const handleReview = async (id, pass) => {
  const action = pass ? '通过' : '拒绝'

  processingIds.value.push(id)
  
  const result = await admin.reviewMaterial(id, pass)
  
  if (result.success) {
    showMessage(`素材已${action}`, 'success')
  } else {
    showMessage(result.message || `${action}失败`, 'error')
  }

  processingIds.value = processingIds.value.filter(pid => pid !== id)
}

const handleImageError = (event) => {
  event.target.style.display = 'none'
  event.target.parentElement.innerHTML = '<span class="error-icon">📷</span>'
}

const getFileTypeIcon = (ext) => {
  const icons = {
    'jpg': '🖼️', 'jpeg': '🖼️', 'png': '🖼️', 'gif': '🖼️',
    'mp4': '🎬', 'avi': '🎬', 'mov': '🎬',
    'mp3': '🎵', 'wav': '🎵', 'flac': '🎵',
    'pdf': '📄', 'doc': '📄', 'docx': '📄',
    'zip': '📦', 'rar': '📦'
  }
  return icons[ext?.toLowerCase()] || '📄'
}

const formatFileSize = (bytes) => {
  if (!bytes) return '未知'
  const sizes = ['B', 'KB', 'MB', 'GB']
  let i = 0
  while (bytes >= 1024 && i < sizes.length - 1) {
    bytes /= 1024
    i++
  }
  return `${bytes.toFixed(1)} ${sizes[i]}`
}

const formatDate = (dateString) => {
  if (!dateString) return '未知'
  const date = new Date(dateString)
  return date.toLocaleString('zh-CN')
}

const showMessage = (msg, type) => {
  message.value = msg
  messageType.value = type
  setTimeout(() => {
    message.value = ''
  }, 3000)
}
</script>

<style scoped>
.pending-review {
  background: white;
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 15px;
  border-bottom: 2px solid #f0f0f0;
}

.section-header h2 {
  margin: 0;
  color: #333;
  font-size: 24px;
}

.refresh-btn {
  padding: 8px 16px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.refresh-btn:hover:not(:disabled) {
  background-color: #218838;
}

.refresh-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #666;
  font-size: 18px;
}

.materials-grid {
  display: grid;
  gap: 20px;
}

.material-card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 20px;
  transition: box-shadow 0.3s;
}

.material-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.material-info {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.material-thumbnail {
  width: 120px;
  height: 120px;
  border-radius: 8px;
  overflow: hidden;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.material-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.no-thumbnail, .error-icon {
  font-size: 48px;
  color: #999;
}

.material-details {
  flex: 1;
}

.material-name {
  margin: 0 0 15px 0;
  color: #333;
  font-size: 20px;
  font-weight: 600;
}

.material-meta {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.meta-item {
  color: #666;
  font-size: 14px;
}

.material-actions {
  display: flex;
  gap: 15px;
  justify-content: flex-end;
}

.approve-btn, .reject-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  min-width: 80px;
}

.approve-btn {
  background-color: #28a745;
  color: white;
}

.approve-btn:hover:not(:disabled) {
  background-color: #218838;
}

.reject-btn {
  background-color: #dc3545;
  color: white;
}

.reject-btn:hover:not(:disabled) {
  background-color: #c82333;
}

.approve-btn:disabled, .reject-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.message {
  margin-top: 20px;
  padding: 12px;
  border-radius: 4px;
  text-align: center;
  font-weight: 500;
}

.message.success {
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.message.error {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

@media (max-width: 768px) {
  .material-info {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  .material-actions {
    justify-content: center;
  }
  
  .section-header {
    flex-direction: column;
    gap: 15px;
    text-align: center;
  }
}
</style>

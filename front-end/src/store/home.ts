import { defineStore } from 'pinia'
import axios from 'axios'

export const homeStore = defineStore('classify', {
  state: () => ({
    ip: '47.113.146.59:3000', // 后端地址
    Materials: [] as any[], // 素材列表
    totalPages: 1, // 总页数
    classify: '全部',
    search: '',
    page: 1
  }),
  actions: {
    // 获取素材，并将其映射到store上，渲染界面会自动更新
    fetchMaterials() {
      axios.get('/api/materials',
        {
          params: {
            search: this.search,
            page: this.page,
            classify: this.classify
          }
        }
      )
        .then(response => {
          this.Materials = response.data.data
        })
        .catch(error => {
          console.error('Error fetching materials:', error)
        })
    },
    async fetchTotalPages() {
      const search = this.search || ''
      const classify = this.classify || ''
      const response = await axios.get('/api/materials/count', { 
        params: { search, classify } 
      })
      return response.data.totalPages
    },
    async setTotalPages() {
      this.totalPages = await this.fetchTotalPages()
    }
  }
})
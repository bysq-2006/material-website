import { defineStore } from 'pinia'
import axios from 'axios'
import { homeStore } from './home'

export const adminStore = defineStore('admin', {
  state: () => ({
    isLoggedIn: false,
    token: '',
    pendingMaterials: [] as any[]
  }),
  actions: {
    // 登录
    async login(password: string) {
      const home = homeStore()
      try {
        const response = await axios.post('/api/login', {
          password: password
        })
        if (response.data.code === 0) {
          this.token = response.data.token
          this.isLoggedIn = true
          localStorage.setItem('admin_token', response.data.token)
          return { success: true, message: response.data.msg }
        } else {
          return { success: false, message: response.data.msg }
        }
      } catch (error: any) {
        console.error('Login error:', error)
        return { success: false, message: error.response?.data?.msg || '登录失败' }
      }
    },

    // 检查本地存储的token
    checkToken() {
      const token = localStorage.getItem('admin_token')
      if (token) {
        this.token = token
        this.isLoggedIn = true
      }
    },

    // 登出
    logout() {
      this.isLoggedIn = false
      this.token = ''
      localStorage.removeItem('admin_token')
    },

    // 获取待审核素材
    async fetchPendingMaterials() {
      const home = homeStore()
      try {
        const response = await axios.get('/api/pending')
        if (response.data.code === 0) {
          this.pendingMaterials = response.data.data
        }
      } catch (error) {
        console.error('Error fetching pending materials:', error)
      }
    },

    // 审核素材
    async reviewMaterial(id: number, pass: boolean) {
      const home = homeStore()
      try {
        const response = await axios.post('/api/review', {
          id: id,
          pass: pass
        }, {
          headers: {
            'Authorization': `Bearer ${this.token}`
          }
        })
        if (response.data.code === 0) {
          // 重新获取待审核列表
          await this.fetchPendingMaterials()
          return { success: true, message: response.data.msg }
        } else {
          return { success: false, message: response.data.msg }
        }
      } catch (error: any) {
        console.error('Review error:', error)
        return { success: false, message: error.response?.data?.msg || '操作失败' }
      }
    }
  }
})

import { defineStore } from 'pinia'
import { homeStore } from './home'
import { ref } from 'vue'
import axios from 'axios'

export const contributionStore = defineStore('contribution', () => {
  const file = ref<File | null>(null)
  const thumbnail = ref<File | null>(null)
  const title = ref('')
  const author = ref('')
  const progress = ref(-1)

  // 图片压缩方法
  async function compressImg(img: File, maxSize = 130 * 1024, quality = 0.7): Promise<Blob> {
    const image = new Image()
    const objectUrl = URL.createObjectURL(img)
    await new Promise((resolve, reject) => {
      image.onload = () => {
        URL.revokeObjectURL(objectUrl)
        resolve(true)
      }
      image.onerror = () => reject('图片加载失败')
      image.src = objectUrl
    })

    let scale = 1
    if (img.size > maxSize) {
      scale = Math.sqrt(maxSize / img.size)
    }
    const width = Math.floor(image.width * scale)
    const height = Math.floor(image.height * scale)

    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext('2d')
    if (!ctx) throw new Error('Canvas context error')
    ctx.drawImage(image, 0, 0, width, height)
    let blob: Blob = await new Promise((resolve, reject) => {
      canvas.toBlob(
        (b) => b ? resolve(b) : reject('压缩失败'),
        'image/jpeg',
        quality
      )
    })

    return blob
  }

  // 提交素材方法
  async function submit() {
    if (!file.value || !thumbnail.value || !title.value || !author.value) {
      throw new Error('请填写完整信息')
    }

    const compressThumbnail = await compressImg(thumbnail.value)

    const formData = new FormData()
    formData.append('file', file.value, file.value.name)
    formData.append('thumbnail', compressThumbnail)
    formData.append('title', title.value)
    formData.append('author', author.value)
    // 这里的接口地址请根据实际情况修改
    const res = await axios.post('/api/upload', formData,
      {
        onUploadProgress: (e) => {
          if (e.total) {
            progress.value = Math.round((e.loaded * 100) / e.total)
          }
        }
      }
    )
    return res.data
  }

  return {
    file,
    thumbnail,
    title,
    author,
    submit,
    progress // 加上这一行
  }
}
)
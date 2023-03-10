import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: [    // 配置别名
      {
        find: '@',
        replacement: resolve(__dirname, 'src')
      }
    ]
  },
  server: {
    port: 8080
  }
})

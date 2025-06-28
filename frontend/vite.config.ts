import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: { 
    host: true,
    port: 3000,
    proxy: {
      // 開発時のAPIプロキシ設定
      '/api': {
        target: 'http://localhost:8787',
        changeOrigin: true,
      }
    }
  },
  define: {
    // 環境変数をクライアントサイドで使用可能にする
    __API_BASE_URL__: JSON.stringify('http://localhost:8787'),
  }
})

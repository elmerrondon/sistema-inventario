import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const EXPRESS_PORT = 3000;
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: `http://localhost:${EXPRESS_PORT}`,
        changeOrigin: true, 
        secure: false,      
      },
    }
  }
})

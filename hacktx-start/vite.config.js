import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true
    },
    host: '0.0.0.0' // Allow access from outside localhost
  },
  build: {
    rollupOptions: {
      input: 'index.html' // Specify the entry point
    }
  }
})
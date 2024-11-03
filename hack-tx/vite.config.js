import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite';
import path from 'path';
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true
    },
    host: '0.0.0.0', // Allow access from outside localhost
    port: 5174
  },
  build: {
    rollupOptions: {
      input: 'index.html' // Specify the entry point
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
})
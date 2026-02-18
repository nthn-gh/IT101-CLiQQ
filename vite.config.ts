import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import fs from 'fs'

export default defineConfig({
  plugins: [vue()],
  base: '/IT101-CLiQQ/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    https: fs.existsSync('certs/localhost-key.pem') ? {
      key: fs.readFileSync('certs/localhost-key.pem'),
      cert: fs.readFileSync('certs/localhost-cert.pem')
    } : false,
    port: 3000,
    host: true // Allows access via IP address with HTTPS for camera access
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // Ensure proper path handling for GitHub Pages
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  }
})

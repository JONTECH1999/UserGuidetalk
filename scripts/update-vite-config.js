// Update vite.config.js with service worker configuration
// Run this to properly update the Vite configuration

const fs = require('fs')
const path = require('path')

const viteConfigPath = path.join(__dirname, 'vite.config.js')

const updatedConfig = `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico'],
      manifest: {
        name: 'Blind Assistive Head Tech - User Guide',
        short_name: 'Head Tech Guide',
        description: 'Fully accessible audio user guide for Blind Assistive Head Tech wearable device',
        theme_color: '#000000',
        background_color: '#ffffff',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192"><rect fill="%23000" width="192" height="192"/><circle cx="96" cy="96" r="80" fill="%23fff"/></svg>',
            sizes: '192x192',
            type: 'image/svg+xml',
            purpose: 'any'
          },
          {
            src: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect fill="%23000" width="512" height="512"/><circle cx="256" cy="256" r="200" fill="%23fff"/></svg>',
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'any'
          }
        ],
        categories: ['accessibility', 'education'],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true
      }
    })
  ],
  server: {
    port: 5173,
    open: true
  },
  build: {
    target: 'esnext',
    minify: 'terser',
    sourcemap: false
  }
})
`

fs.writeFileSync(viteConfigPath, updatedConfig)
console.log('✅ Vite config updated successfully!')

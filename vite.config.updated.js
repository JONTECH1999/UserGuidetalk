/*
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
*/

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      strategies: 'injectManifest',
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      filename: 'sw.js',
      srcDir: 'public',
      includeAssets: [
        'favicon.ico'
      ],
      manifest: {
        name: 'Blind Assistive Head Tech - User Guide',
        short_name: 'Head Tech Guide',
        description: 'Fully accessible audio user guide for Blind Assistive Head Tech wearable device',
        theme_color: '#000000',
        background_color: '#ffffff',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        orientation: 'portrait-primary',
        icons: [
          {
            src: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192"><rect fill="%23000" width="192" height="192" rx="45"/><circle cx="96" cy="96" r="80" fill="%23fff"/></svg>',
            sizes: '192x192',
            type: 'image/svg+xml',
            purpose: 'any'
          },
          {
            src: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect fill="%23000" width="512" height="512" rx="120"/><circle cx="256" cy="256" r="200" fill="%23fff"/></svg>',
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'any'
          },
          {
            src: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180"><rect fill="%23000" width="180" height="180" rx="40"/><circle cx="90" cy="90" r="72" fill="%23fff"/></svg>',
            sizes: '180x180',
            type: 'image/svg+xml',
            purpose: 'maskable'
          }
        ],
        categories: ['accessibility', 'education', 'medical'],
        screenshots: [
          {
            src: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 720"><rect fill="%231a1a1a" width="540" height="720"/><text x="270" y="100" font-size="48" fill="%23fff" text-anchor="middle" font-family="Arial, sans-serif" font-weight="bold">Blind Assistive</text><text x="270" y="160" font-size="48" fill="%23fff" text-anchor="middle" font-family="Arial, sans-serif" font-weight="bold">Head Tech</text><text x="270" y="360" font-size="32" fill="%230066cc" text-anchor="middle" font-family="Arial, sans-serif">Audio User Guide</text><circle cx="270" cy="550" r="50" fill="%23fff"/></svg>',
            sizes: '540x720',
            type: 'image/svg+xml',
            form_factor: 'narrow'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico,woff2}'],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true,
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
      },
      devOptions: {
        enabled: false,
        suppressWarnings: true,
        navigateFallback: 'index.html',
        suppressWarningsAboutUnmatchedAssets: true,
      },
    })
  ],
  server: {
    port: 5173,
    open: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    }
  },
  build: {
    target: 'esnext',
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom', 'framer-motion'],
          'services': ['./src/services/TextToSpeechService.js', './src/services/VoiceCommandService.js', './src/services/AIAssistantService.js']
        }
      }
    }
  }
})

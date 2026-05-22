import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// Disable PWA on Netlify builds to avoid dynamic require issues
const isNetlify = !!process.env.NETLIFY
const plugins = [react({ babel: false })]

if (!isNetlify) {
  plugins.push(
    VitePWA({
      registerType: 'autoUpdate',
      inlineManifest: false,
      strategies: 'generateSW',
      manifest: {
        name: 'Blind Assistive Head Tech - User Guide',
        short_name: 'Head Tech Guide',
        description: 'Voice-guided user manual for Blind Assistive Head Tech wearable device',
        theme_color: '#1a1a1a',
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
        screenshots: [
          {
            src: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 720"><rect fill="%231a1a1a" width="540" height="720"/><text x="270" y="360" font-size="40" fill="%23fff" text-anchor="middle" font-family="sans-serif" font-weight="bold">Blind Assistive Head Tech</text></svg>',
            sizes: '540x720',
            type: 'image/svg+xml',
            form_factor: 'narrow'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true
      }
    })
  )
}

export default defineConfig({
  plugins
})

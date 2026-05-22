#!/usr/bin/env node

/**
 * Project Information Script
 * Displays project details and setup information
 */

const fs = require('fs')
const path = require('path')

const projectInfo = {
  name: 'Blind Assistive Head Tech - Audio User Guide',
  version: '1.0.0',
  description:
    'Fully accessible, production-ready React web application for blind and visually impaired users',
  purpose: 'Voice-guided user manual for Blind Assistive Head Tech wearable device',
  accessibility: 'WCAG 2.1 AAA Compliant',
  features: [
    'Voice narration (Text-to-Speech)',
    'Voice commands (Speech Recognition)',
    'AI Assistant (OpenAI integration)',
    'Progressive Web App (PWA)',
    'Fully keyboard accessible',
    'Screen reader optimized',
    'Mobile-first responsive design',
    'Haptic feedback support',
    'Offline capability',
    'Large accessible UI elements',
  ],
  tech: {
    framework: 'React 18',
    bundler: 'Vite 5',
    styling: 'Tailwind CSS',
    animations: 'Framer Motion',
    accessibility: 'React Aria',
    pwa: 'Vite PWA Plugin',
  },
}

console.log('\n' + '='.repeat(60))
console.log('📱 ' + projectInfo.name)
console.log('='.repeat(60) + '\n')

console.log(`📋 Description: ${projectInfo.description}\n`)

console.log('🎯 Key Features:')
projectInfo.features.forEach((feature, i) => {
  console.log(`   ${i + 1}. ${feature}`)
})

console.log('\n🛠️ Technology Stack:')
Object.entries(projectInfo.tech).forEach(([key, value]) => {
  console.log(`   • ${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`)
})

console.log('\n📚 Quick Commands:')
console.log('   npm run dev        → Start development server')
console.log('   npm run build      → Build for production')
console.log('   npm run preview    → Preview production build')
console.log('   npm run lint       → Check code quality')

console.log('\n📖 Documentation Files:')
const docs = ['README.md', 'QUICKSTART.md', 'DEPLOYMENT.md', 'ACCESSIBILITY.md', 'PROJECT_STRUCTURE.md']
docs.forEach((doc) => {
  if (fs.existsSync(path.join(__dirname, doc))) {
    console.log(`   ✅ ${doc}`)
  }
})

console.log('\n✨ Ready to get started!')
console.log('   Run: npm run dev\n')

console.log('='.repeat(60) + '\n')

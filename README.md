# Blind Assistive Head Tech - Audio User Guide

A fully accessible, production-ready React web application designed for blind and visually impaired users to learn how to use the Blind Assistive Head Tech wearable device.

## 🎯 Key Features

- **✅ Fully Accessible**: WCAG AAA compliant
- **🎤 Voice-First**: Complete voice narration and commands
- **🤖 AI Assistant**: OpenAI-powered Q&A system
- **📱 Mobile-First**: Responsive design optimized for mobile
- **🔊 Text-to-Speech**: Natural voice narration with Web Speech API
- **🎯 Voice Recognition**: Advanced speech recognition for commands
- **⚡ PWA Support**: Works offline, installable to home screen
- **🎨 Large UI Elements**: Extra-large buttons and high contrast
- **♿ Screen Reader Optimized**: Full semantic HTML and ARIA labels
- **⌨️ Keyboard Navigation**: Complete keyboard support
- **📳 Haptic Feedback**: Vibration feedback on mobile devices

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ and npm/yarn
- Modern browser with Web Speech API support (Chrome, Edge, Safari)
- OpenAI API key (optional - app works with built-in FAQ fallback)

### Installation

```bash
# Clone or download the project
cd blind-assistive-guide

# Install dependencies
npm install

# Create .env file with your OpenAI API key (optional)
cp .env.example .env
# Edit .env and add your VITE_OPENAI_API_KEY

# Start development server
npm run dev
```

The app will open at `http://localhost:5173`

### Development

```bash
# Development server with hot reload
npm run dev

# Build for production
npm build

# Preview production build
npm run preview

# Check for TypeScript errors
npm run type-check

# Lint code
npm run lint
```

## 📁 Project Structure

```
blind-assistive-guide/
├── src/
│   ├── components/           # React components
│   │   ├── AccessibleButton.jsx
│   │   ├── PlaybackControls.jsx
│   │   ├── SpeechControls.jsx
│   │   ├── AIAssistant.jsx
│   │   └── GuideContent.jsx
│   ├── services/             # Business logic
│   │   ├── TextToSpeechService.js
│   │   ├── VoiceCommandService.js
│   │   └── AIAssistantService.js
│   ├── data/
│   │   └── userGuideContent.js
│   ├── App.jsx               # Main app component
│   ├── main.jsx              # Entry point
│   └── index.css             # Global styles
├── index.html                # HTML template
├── vite.config.js            # Vite configuration
├── tailwind.config.js        # Tailwind CSS config
├── tsconfig.json             # TypeScript config
├── package.json              # Dependencies
└── .env.example              # Environment variables template
```

## 🎤 Voice Commands

Users can control the app with these voice commands:

- **Play**: Start playback
- **Pause**: Pause playback
- **Stop**: Stop playback
- **Next**: Go to next section
- **Previous**: Go to previous section
- **Repeat**: Replay current section
- **Faster**: Increase speech speed
- **Slower**: Decrease speech speed
- **Help**: Get help information

## 🤖 AI Assistant

The AI Assistant uses OpenAI's GPT-3.5 Turbo to answer questions about the device:

1. User asks a question via voice or text
2. System checks FAQ first (instant response)
3. If not found, queries OpenAI API
4. Response is spoken aloud automatically
5. User can ask follow-up questions

### Setting Up AI Assistant

1. Get OpenAI API key from https://platform.openai.com/api-keys
2. Create `.env` file:
   ```
   VITE_OPENAI_API_KEY=sk-your-api-key-here
   ```
3. The app will work without it (FAQ-only mode)

## 📱 Progressive Web App (PWA)

### Install to Home Screen

1. Open the app in your mobile browser
2. Tap "Add to Home Screen" or "Install"
3. App will work offline with cached content
4. Full-screen experience without browser chrome

### Offline Support

- Automatic service worker registration
- Asset caching for offline use
- All features work offline except AI Assistant

## 🔗 QR Code Generation

To create a QR code linking to your deployment:

### Using QR Code Generator Tools

1. Use online tool: https://qr-code-generator.com
2. Enter your deployment URL: `https://yourdomain.com`
3. Download QR code as image
4. Print and distribute to users

### Programmatic QR Code Generation

```javascript
import QRCode from 'qrcode'

const generateQR = async (url) => {
  try {
    const qrCode = await QRCode.toDataURL(url)
    return qrCode
  } catch (err) {
    console.error('QR Code generation failed:', err)
  }
}

// Usage
const url = 'https://your-deployment-url.com'
const qrDataUrl = await generateQR(url)
```

## 📲 Deployment

### Option 1: Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
# Go to Settings > Environment Variables
# Add: VITE_OPENAI_API_KEY=sk-...
```

### Option 2: Netlify

```bash
# Build the project
npm run build

# Deploy using Netlify CLI
npm i -g netlify-cli
netlify deploy --prod --dir=dist

# Or drag-and-drop the dist folder to Netlify
```

### Option 3: GitHub Pages

```bash
# Add to package.json
"homepage": "https://yourusername.github.io/repo-name"

# Install gh-pages
npm install --save-dev gh-pages

# Add to scripts in package.json
"deploy": "npm run build && gh-pages -d dist"

# Deploy
npm run deploy
```

### Option 4: Docker

```dockerfile
# Create Dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

```bash
docker build -t blind-tech-guide .
docker run -p 80:80 blind-tech-guide
```

## ♿ Accessibility Features

### WCAG Compliance

- ✅ Color contrast ratios > 7:1
- ✅ Focus indicators visible on all interactive elements
- ✅ All images have alt text
- ✅ Form inputs have labels
- ✅ Keyboard navigation fully supported
- ✅ Screen reader compatible
- ✅ Reduced motion support
- ✅ High contrast mode support

### For Screen Readers

- Semantic HTML (`<header>`, `<main>`, `<footer>`, etc.)
- ARIA labels and descriptions
- ARIA live regions for dynamic content
- Role attributes for custom components
- Skip links for navigation

### Keyboard Navigation

- `Tab` / `Shift+Tab`: Navigate between elements
- `Enter` / `Space`: Activate buttons
- `Arrow keys`: Navigate lists and menus
- All controls keyboard accessible

### Mobile Accessibility

- Large touch targets (minimum 48x48px)
- Haptic feedback on button press
- Voice command support
- Full screen reading support

## 🎨 Customization

### Change User Guide Content

Edit `src/data/userGuideContent.js`:

```javascript
export const userGuideContent = [
  {
    id: 1,
    title: 'Section Title',
    content: 'Full text that will be read aloud...',
    duration: 15 // estimated seconds
  },
  // Add more sections...
]
```

### Customize Colors

Edit `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      'accessible-black': '#000000',
      'accessible-white': '#FFFFFF',
      'accessible-blue': '#0066CC',
    },
  },
}
```

### Add Custom Voice

Edit `TextToSpeechService.js`:

```javascript
const voices = this.synth.getVoices()
const preferredVoice = voices.find(v => v.name === 'Your Voice Name')
utterance.voice = preferredVoice
```

## 🔒 Security Best Practices

1. **API Keys**: Never commit `.env` files
2. **OpenAI API**: Use server-side proxy for production
3. **Content Security Policy**: Add CSP headers
4. **HTTPS**: Always use HTTPS in production
5. **Input Validation**: Sanitize all user input

### Production API Key Handling

For production, create a backend proxy:

```javascript
// Backend endpoint
app.post('/api/ask', async (req, res) => {
  const { question } = req.body
  
  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: question }],
  })
  
  res.json({ answer: response.choices[0].message.content })
})
```

## 🧪 Testing

### Manual Testing

1. **Voice Commands**: Say "Next", "Previous", "Play", "Pause"
2. **Screen Readers**: Test with NVDA, JAWS, or VoiceOver
3. **Keyboard Navigation**: Navigate using Tab/Shift+Tab
4. **Mobile**: Test on iOS and Android with screen readers

### Automated Testing

```bash
# Add testing setup
npm install --save-dev @testing-library/react @testing-library/jest-dom vitest

# Create test files
# Run tests
npm run test
```

## 📊 Performance

- **Lighthouse Score**: Target 95+
- **First Contentful Paint**: < 2 seconds
- **Time to Interactive**: < 5 seconds
- **Bundle Size**: < 500KB (gzipped)

## 🐛 Troubleshooting

### Voice Commands Not Working

- Check browser support (Chrome, Edge, Safari)
- Ensure microphone is connected and enabled
- Check browser permissions
- Look for errors in browser console

### Speech Not Speaking

- Check browser volume
- Verify Text-to-Speech is enabled
- Check browser permissions
- Try different voice in settings

### App Not Loading

- Clear browser cache
- Check internet connection
- Verify Node.js version (16+)
- Check for build errors: `npm run build`

### AI Assistant Not Responding

- Verify OpenAI API key in `.env`
- Check API usage limits
- Ensure `.env` file is loaded
- Check network requests in DevTools

## 📚 Additional Resources

- [Web Speech API Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [React Accessibility](https://reactjs.org/docs/accessibility.html)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [OpenAI API](https://platform.openai.com/docs/api-reference)

## 📝 License

This project is provided as-is for accessibility purposes.

## 🤝 Contributing

Contributions are welcome! Please ensure:

- All code follows accessibility standards
- Features are tested with screen readers
- Keyboard navigation is fully supported
- Code is well-commented

## 🆘 Support

For accessibility issues or feature requests:

1. Open an issue with details
2. Include browser and OS information
3. Describe the accessibility concern
4. Provide steps to reproduce

## 🎯 Roadmap

- [ ] Multi-language support
- [ ] Gesture recognition
- [ ] Custom bookmarking
- [ ] Session persistence
- [ ] Analytics dashboard
- [ ] Mobile app version
- [ ] Offline content sync
- [ ] Performance improvements

---

**Made with ❤️ for accessibility and independence.**

# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Windows Users

```bash
# 1. Navigate to project directory
cd "path\to\blind-assistive-guide"

# 2. Run setup script
setup.bat

# 3. Start development server
npm run dev
```

### Mac/Linux Users

```bash
# 1. Navigate to project directory
cd path/to/blind-assistive-guide

# 2. Run setup script
bash setup.sh

# 3. Start development server
npm run dev
```

### Manual Setup

```bash
# 1. Install Node modules
npm install

# 2. Create environment file
cp .env.example .env

# 3. (Optional) Add OpenAI API key to .env
# VITE_OPENAI_API_KEY=sk-your-key-here

# 4. Start development server
npm run dev
```

## 📱 First Time Using the App?

1. **Browser Opens Automatically** at `http://localhost:5173`
2. **Hear Welcome Message**: "Welcome to Blind Assistive Head Tech User Guide..."
3. **Press Play Button** or say "Play"
4. **Listen and Learn**: Guide reads aloud automatically
5. **Try Voice Commands**: Say "Next", "Previous", "Pause", "Faster", "Slower"
6. **Use AI Assistant**: Click "Show AI Assistant" to ask questions

## 🎤 Voice Commands to Try

| Command | What it does |
|---------|-------------|
| "Play" | Start or resume playback |
| "Pause" | Pause the audio |
| "Stop" | Stop and reset |
| "Next" | Go to next section |
| "Previous" | Go to previous section |
| "Repeat" | Replay current section |
| "Faster" | Increase speed |
| "Slower" | Decrease speed |
| "Help" | Get help |

## 🧪 Testing the App

### Test Voice Features
1. Enable voice commands (click button)
2. Say "Next" - should go to next section
3. Say "Pause" - should pause audio
4. Say "Faster" - should increase speed

### Test Accessibility
1. Press `Tab` - navigate between buttons
2. Press `Enter` - activate focused button
3. Enable screen reader (NVDA/JAWS/VoiceOver)
4. All buttons should be announced

### Test AI Assistant
1. Click "Show AI Assistant"
2. Type a question: "How do I turn on the device?"
3. Listen to response

## 🔧 Make Changes

### Edit Content
1. Open `src/data/userGuideContent.js`
2. Update section titles and text
3. Changes appear immediately (hot reload)

### Change Colors
1. Open `tailwind.config.js`
2. Edit color values
3. Refresh browser

### Update UI
1. Edit components in `src/components/`
2. Changes save automatically
3. Browser refreshes in real-time

## 📦 Build for Deployment

```bash
# Create production build
npm run build

# Test production build locally
npm run preview

# Output in 'dist' folder
```

## 🐛 Troubleshooting

### "Port 5173 already in use"
```bash
# Use different port
npm run dev -- --port 5174
```

### "Module not found" error
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Voice commands not working
1. Check microphone is connected
2. Grant browser microphone permission
3. Try in Chrome or Edge (best support)
4. Check browser console for errors

### App not speaking
1. Check volume is on
2. Check browser isn't muted
3. Check speakers are connected
4. Refresh the page

## 📚 Learn More

- **Full README**: See `README.md` for complete documentation
- **Deployment Guide**: See `DEPLOYMENT.md` for deployment instructions
- **Code Structure**: Each file has detailed comments
- **Accessibility**: WCAG 2.1 AAA compliant throughout

## 🚀 Next Steps

1. **Customize Content**: Update user guide text
2. **Add Your OpenAI Key**: Unlock AI features
3. **Test Thoroughly**: Use with screen readers
4. **Deploy**: Choose Vercel, Netlify, or GitHub Pages
5. **Create QR Code**: Link for easy scanning

## 💡 Pro Tips

- 🎧 Use headphones for best audio experience
- 📱 Test on actual mobile device
- 🔊 Adjust speech speed based on preference
- 🤖 Ask AI assistant any questions
- 📲 Install as PWA for offline use
- ⌨️ Test keyboard navigation for accessibility

## 📞 Need Help?

1. Check browser console for errors: `F12`
2. Read comments in source code
3. Check README.md for detailed info
4. Review DEPLOYMENT.md for deployment help

---

**You're all set! Start building an accessible future. 🌟**

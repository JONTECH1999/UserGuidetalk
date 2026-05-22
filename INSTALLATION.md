/**
 * Installation & Troubleshooting Guide
 * Complete setup and problem-solving documentation
 */

# Installation & Troubleshooting

## 🚀 Complete Installation Guide

### System Requirements

- **Node.js**: 16.x or higher
- **npm**: 7.x or higher (or yarn/pnpm)
- **RAM**: At least 2GB
- **Disk Space**: 500MB
- **Browser**: Modern browser with Web Speech API (Chrome, Edge, Safari 14+)

### Verify Prerequisites

```bash
# Check Node.js
node --version
# Should output: v16.0.0 or higher

# Check npm
npm --version
# Should output: 7.0.0 or higher
```

### Step-by-Step Installation

#### 1. Download Project
```bash
# Option A: Clone from repository
git clone <repository-url>
cd blind-assistive-guide

# Option B: Download ZIP
# Extract ZIP file and navigate to folder
cd blind-assistive-guide
```

#### 2. Install Dependencies
```bash
npm install
```

This installs all required packages:
- React & React DOM
- Vite build tool
- Tailwind CSS
- Framer Motion
- Accessibility libraries

#### 3. Configure Environment
```bash
# Copy example environment file
cp .env.example .env

# Edit .env (optional - only if using AI Assistant)
# Add your OpenAI API key:
# VITE_OPENAI_API_KEY=sk-your-key-here
```

#### 4. Start Development Server
```bash
npm run dev
```

Browser opens automatically to `http://localhost:5173`

#### 5. Verify Installation
1. You should hear: "Welcome to Blind Assistive Head Tech User Guide"
2. Click "START GUIDE" button
3. Audio should begin narrating the guide
4. Try saying "Next" if voice commands are supported

---

## 🔧 Common Installation Issues

### Issue: "Node.js not found"
**Symptom**: `command not found: node`

**Solution**:
1. Download Node.js from https://nodejs.org
2. Install latest LTS version
3. Restart your terminal/command prompt
4. Verify: `node --version`

### Issue: "Permission denied" (Mac/Linux)
**Symptom**: `Permission denied: ./setup.sh`

**Solution**:
```bash
chmod +x setup.sh
./setup.sh
```

### Issue: "npm: command not found"
**Symptom**: npm not recognized after Node.js install

**Solution**:
1. Node.js may need restart to register npm
2. Restart your terminal completely
3. Try `npm --version`
4. If still not found, reinstall Node.js

### Issue: Port 5173 already in use
**Symptom**: `Error: Port 5173 is already in use`

**Solution**:
```bash
# Use different port
npm run dev -- --port 5174

# Or kill existing process on port 5173
# Windows:
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Mac/Linux:
lsof -i :5173
kill -9 <PID>
```

### Issue: "Module not found" error
**Symptom**: `Cannot find module 'react'`

**Solution**:
```bash
# Reinstall all dependencies
rm -rf node_modules package-lock.json
npm install
```

### Issue: Build fails with "out of memory"
**Symptom**: `JavaScript heap out of memory`

**Solution**:
```bash
# Increase Node memory
node --max-old-space-size=4096 node_modules/vite/bin/vite.js
```

---

## 🎤 Voice Features Troubleshooting

### Voice Commands Not Working

**Symptom**: Say "Play" but nothing happens

**Troubleshooting Steps**:

1. **Check Browser Support**
   - Chrome/Chromium: ✅ Full support
   - Edge: ✅ Full support
   - Safari: ✅ Limited support
   - Firefox: ❌ Not supported
   
   → Use Chrome or Edge for best results

2. **Check Microphone Connection**
   - Verify microphone is connected
   - Test microphone in system settings
   - Try system microphone test

3. **Grant Microphone Permission**
   - Browser asks first time
   - Chrome: Settings → Privacy → Site Settings → Microphone
   - Check microphone is set to "Allow"

4. **Check Microphone in Browser**
   ```
   1. Go to Settings
   2. Search "Microphone"
   3. Set to "Allow"
   4. Refresh the page
   ```

5. **Test in Console**
   - Press F12 (Developer Tools)
   - Console tab
   - Type: `navigator.mediaDevices.getUserMedia({audio:true}).then(stream => console.log('Mic works!'))`
   - Grant permission if asked
   - Should log: "Mic works!"

6. **Restart Browser**
   - Close completely and reopen
   - Clear browser cache
   - Try again

### Speech Not Playing

**Symptom**: Audio guide doesn't speak

**Troubleshooting Steps**:

1. **Check Volume**
   - System volume is on
   - Browser volume is on (not muted)
   - Speaker/headphone volume is up
   - Try different speaker/headphone

2. **Check Browser Settings**
   - Chrome Settings → Privacy → Site Settings → Microphone
   - Check microphone/speaker permissions

3. **Test System Audio**
   - Play YouTube video to verify audio works
   - Test volume
   - Adjust system volume

4. **Disable Browser Extensions**
   - Extensions sometimes interfere
   - Try incognito/private mode
   - Check extensions: Settings → Extensions

5. **Update Browser**
   - Old browser may have bugs
   - Chrome → Settings → About → Auto-update
   - Update if available

6. **Try Different Browser**
   - If Chrome doesn't work, try Edge
   - This identifies browser-specific issues

---

## 🤖 AI Assistant Troubleshooting

### AI Assistant Not Responding

**Symptom**: Ask question but get "Error" or no response

**Troubleshooting Steps**:

1. **Check API Key**
   ```bash
   # View .env file
   cat .env  # Mac/Linux
   type .env # Windows
   
   # Should show: VITE_OPENAI_API_KEY=sk-...
   ```

2. **Verify API Key Format**
   - Must start with `sk-`
   - No spaces before/after
   - Correct key from https://platform.openai.com/api-keys

3. **Check API Usage**
   - Visit https://platform.openai.com/account/usage/overview
   - Verify you have usage quota remaining
   - Check billing is active

4. **Restart Development Server**
   ```bash
   # Stop server (Ctrl+C)
   # Start again
   npm run dev
   ```

5. **Check Network Connection**
   - Verify internet is working
   - Check firewall not blocking API calls
   - Try in different network (phone hotspot)

6. **View Error Details**
   - Press F12 (Developer Tools)
   - Go to "Network" tab
   - Ask question again
   - Look for requests to api.openai.com
   - Check response for error message

7. **Use Fallback Mode**
   - App works without API key
   - Uses built-in FAQ
   - Restart app without API key to test

---

## 🐛 Development Issues

### Hot Reload Not Working

**Symptom**: Changes don't appear after editing files

**Solution**:
```bash
# Stop dev server (Ctrl+C)
# Clear cache and restart
npm run dev
```

### TypeScript Errors

**Symptom**: Red squiggly lines in VS Code

**Solution**:
```bash
# Check for errors
npm run type-check

# Usually these are warnings, can ignore for dev
```

### Build Errors

**Symptom**: `npm run build` fails

**Solution**:
```bash
# Check for type errors
npm run type-check

# Lint code
npm run lint

# Clear cache
rm -rf dist/

# Try build again
npm run build
```

### CSS Not Applied

**Symptom**: Tailwind classes not styling elements

**Solution**:
1. Verify class names are correct
2. Check Tailwind config includes files:
   ```javascript
   content: [
     "./index.html",
     "./src/**/*.{js,jsx,ts,tsx}",
   ]
   ```
3. Restart dev server
4. Hard refresh browser (Ctrl+Shift+R)

---

## 📱 Mobile Testing Issues

### App on Mobile Doesn't Work

**Symptom**: App works on desktop but not mobile

**Troubleshooting**:

1. **Check URL Accessible**
   - Make app accessible from mobile
   - Use ngrok for tunneling:
     ```bash
     npm install -g ngrok
     ngrok http 5173
     ```

2. **Test from Same Network**
   - Get computer's IP: `ipconfig` (Windows) or `ifconfig` (Mac)
   - Access from mobile: `http://192.168.1.x:5173`

3. **Check Mobile Browser**
   - Use Chrome or Safari (best support)
   - Avoid Firefox on mobile

4. **Mobile Permissions**
   - Grant microphone permission when prompted
   - Allow notifications if asked
   - Test microphone access

5. **Zoom Level**
   - Check page renders at mobile width
   - Verify zoom is at 100%
   - Test at different zoom levels

---

## 🔒 API Key Security Issues

### "API key leaked in console"

**Prevention**:
```javascript
// ❌ WRONG - Don't do this
const key = "sk-..." // Visible in code

// ✅ RIGHT - Use environment variables
const key = import.meta.env.VITE_OPENAI_API_KEY
```

### API Key Not Loading

**Symptom**: AI assistant says API not configured

**Troubleshooting**:

1. **Check .env File**
   ```bash
   # File must exist in root directory
   ls .env  # Mac/Linux
   dir .env # Windows
   ```

2. **Restart Dev Server**
   - Dev server reads .env on startup
   - Changes to .env require restart

3. **Verify Format**
   ```
   # Correct:
   VITE_OPENAI_API_KEY=sk-abc123...

   # Incorrect (missing value):
   VITE_OPENAI_API_KEY=
   ```

4. **Check .gitignore**
   ```
   .env  # Should be listed
   ```

---

## 📊 Performance Issues

### App Loads Slowly

**Symptom**: Takes >5 seconds to load

**Troubleshooting**:

1. **Check Network**
   - Open DevTools (F12)
   - Network tab
   - Reload page
   - Check for slow requests
   - May be internet speed issue

2. **Check Browser Extensions**
   - Extensions slow down page
   - Try incognito mode
   - Disable extensions one by one

3. **Clear Cache**
   ```bash
   # Hard refresh
   Ctrl+Shift+R (Windows)
   Cmd+Shift+R (Mac)
   ```

4. **Check Development Build**
   - Development build is slower than production
   - Production build is optimized
   - Run: `npm run build && npm run preview`

---

## 🆘 Getting Help

### When You're Stuck

1. **Check Documentation**
   - README.md - Comprehensive guide
   - QUICKSTART.md - Quick reference
   - ACCESSIBILITY.md - Accessibility details

2. **Check Browser Console**
   - Press F12
   - Console tab
   - Look for error messages
   - Copy error message when asking for help

3. **Check Logs**
   - Terminal where you ran `npm run dev`
   - Look for error messages
   - May show what's wrong

4. **Create Minimal Example**
   - Isolate the problem
   - Share code snippet
   - Makes troubleshooting easier

5. **Search Online**
   - Error message + Stack Overflow
   - Error message + GitHub Issues
   - Library documentation

### Information to Include When Getting Help

```markdown
### Issue
[Describe the problem]

### Environment
- OS: Windows/Mac/Linux
- Node version: [output of `node --version`]
- npm version: [output of `npm --version`]
- Browser: Chrome/Firefox/Safari/Edge
- Browser version: [version number]

### Steps to Reproduce
1. [First step]
2. [Second step]
3. [...]

### Expected Behavior
[What should happen]

### Actual Behavior
[What actually happens]

### Error Messages
[Paste any error messages from console]

### Screenshots
[If applicable, attach screenshots]
```

---

## ✅ Verification Checklist

After installation, verify everything works:

- [ ] `npm run dev` starts without errors
- [ ] Browser opens to http://localhost:5173
- [ ] You hear welcome message
- [ ] Play button works
- [ ] Audio narration plays
- [ ] Voice commands recognized (if supported)
- [ ] Buttons are clickable
- [ ] Keyboard navigation works
- [ ] No console errors (F12)

If all checks pass: ✨ Installation successful!

---

## 📞 Support Resources

- **Node.js Help**: https://nodejs.org/en/docs/
- **npm Help**: https://docs.npmjs.com/
- **React Docs**: https://react.dev
- **Vite Docs**: https://vitejs.dev
- **Tailwind Docs**: https://tailwindcss.com/docs
- **OpenAI API**: https://platform.openai.com/docs

---

**You've got this! 💪 Let me know if you need any clarification.**

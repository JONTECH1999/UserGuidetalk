# Deployment & QR Code Setup Guide

## 📋 Prerequisites

Before deploying, ensure you have:

- Project built and tested locally
- Vercel/Netlify account
- OpenAI API key (if using AI Assistant)
- Domain name (optional but recommended)

## 🚀 Deployment Steps

### Step 1: Build the Project

```bash
npm run build
```

This creates optimized production build in `dist/` folder.

### Step 2: Choose Your Platform

#### **Option A: Vercel (Recommended for Beginners)**

1. **Create Vercel Account**
   - Go to https://vercel.com
   - Sign up with GitHub, GitLab, or email

2. **Connect Your Project**
   ```bash
   npm i -g vercel
   vercel login
   vercel
   ```

3. **Set Environment Variables**
   - Go to Vercel Dashboard
   - Select your project
   - Settings → Environment Variables
   - Add: `VITE_OPENAI_API_KEY=sk-...` (if using AI)

4. **Deploy**
   - Vercel will automatically deploy on git push
   - Your URL: `https://[project-name].vercel.app`

#### **Option B: Netlify**

1. **Create Netlify Account**
   - Go to https://netlify.com
   - Sign up with email or GitHub

2. **Deploy with CLI**
   ```bash
   npm i -g netlify-cli
   netlify login
   netlify deploy --prod --dir=dist
   ```

3. **Set Environment Variables**
   - Site settings → Build & deploy → Environment
   - Add: `VITE_OPENAI_API_KEY=sk-...`

4. **Your URL**: `https://[project-name].netlify.app`

#### **Option C: GitHub Pages**

1. **Create GitHub Repository**
   - Go to https://github.com/new
   - Create repo named `blind-assistive-guide`

2. **Update package.json**
   ```json
   "homepage": "https://yourusername.github.io/blind-assistive-guide",
   "scripts": {
     "deploy": "npm run build && gh-pages -d dist"
   }
   ```

3. **Deploy**
   ```bash
   npm run deploy
   ```

4. **Your URL**: `https://yourusername.github.io/blind-assistive-guide`

### Step 3: Configure Custom Domain (Optional)

#### **On Vercel**
- Settings → Domains
- Add your domain
- Update DNS records as shown

#### **On Netlify**
- Domain management → Custom domain
- Add your domain
- Update DNS records

#### **On GitHub Pages**
- Settings → Pages
- Custom domain field
- Update DNS CNAME record

## 🔗 QR Code Setup

### Generate QR Code

#### **Online Method (Easiest)**

1. Go to https://qr-code-generator.com
2. Select "URL" option
3. Enter your deployment URL (e.g., `https://blind-tech-guide.vercel.app`)
4. Click "Create QR Code"
5. Download as PNG
6. Print and distribute

#### **Programmatic Method**

1. Add QR generation to your app:

```javascript
import { generateQRCode, downloadQRCode } from './utils/qrCodeGenerator'

// Generate QR
const qrUrl = await generateQRCode('https://your-deployment-url.com')

// Or download directly
await downloadQRCode('https://your-deployment-url.com')
```

### QR Code Best Practices

- **Size**: Minimum 200x200 pixels
- **Contrast**: High contrast (black on white)
- **Margins**: Include 1cm white border
- **Testing**: Test QR code with multiple devices
- **Distribution**: Print on durable material

### QR Code Testing

1. **Test Scanning**
   - Use iOS Camera app or Android Google Lens
   - Verify it opens correct URL
   - Test on multiple devices

2. **Test App Loading**
   - Verify app loads quickly
   - Check voice guidance starts
   - Test voice commands
   - Verify screen reader works

## 📦 Deployment Checklist

- [ ] All features tested locally
- [ ] `.env` file created with API keys
- [ ] `npm run build` completes without errors
- [ ] Performance optimizations applied
- [ ] Accessibility audit passed
- [ ] All voice commands tested
- [ ] AI Assistant configured (if using)
- [ ] PWA manifest updated
- [ ] Security headers configured
- [ ] CORS properly configured
- [ ] CDN cache settings optimized
- [ ] Analytics integrated (optional)
- [ ] Error monitoring set up (optional)

## 🔐 Security Checklist

- [ ] No API keys in version control
- [ ] HTTPS enforced
- [ ] Content Security Policy configured
- [ ] CORS headers set correctly
- [ ] Rate limiting on backend (if applicable)
- [ ] Input validation implemented
- [ ] XSS protection enabled
- [ ] Regular security updates applied

## ⚡ Performance Optimization

### Before Deployment

```bash
# Check bundle size
npm run build -- --report

# Lighthouse audit
# In Chrome DevTools → Lighthouse
```

### Optimization Tips

1. **Code Splitting**
   - Split large components
   - Lazy load sections

2. **Image Optimization**
   - Use WebP format
   - Compress all images
   - Use CDN for delivery

3. **Caching**
   - Set cache headers
   - Use service worker
   - Enable gzip compression

4. **Monitoring**
   - Set up error tracking
   - Monitor performance metrics
   - Track user analytics

## 📊 Monitoring Deployment

### Error Tracking

```bash
# Option 1: Sentry
npm install --save @sentry/react

# Option 2: Vercel Analytics
# Automatically included with Vercel
```

### Performance Monitoring

- Vercel: Automatic Lighthouse reports
- Netlify: Built-in Analytics
- Google Analytics: Custom setup

### User Analytics

```javascript
// Track important events
analytics.track('guide_started', { timestamp: Date.now() })
analytics.track('section_completed', { section: currentSection })
analytics.track('ai_question_asked', { question: userQuestion })
```

## 🆘 Troubleshooting Deployment

### App Not Loading

1. Check deployment logs
2. Verify build completed successfully
3. Check environment variables
4. Clear browser cache
5. Try different browser

### QR Code Not Working

1. Verify URL is correct
2. Test URL directly in browser
3. Regenerate QR code
4. Use different QR scanner
5. Check QR code size (minimum 200x200px)

### Voice Features Not Working

1. Check microphone permissions
2. Verify browser supports Web Speech API
3. Check browser console for errors
4. Test on different device
5. Update browser to latest version

### AI Assistant Not Responding

1. Verify API key is set
2. Check API usage limits
3. Verify network connectivity
4. Check browser console for CORS errors
5. Test API key directly

## 🔄 Updates & Maintenance

### Deploy Updates

```bash
# Make changes
git add .
git commit -m "Update features"
git push

# Vercel/Netlify auto-deploy on push
# Or manually deploy
vercel
netlify deploy --prod --dir=dist
```

### Rollback to Previous Version

```bash
# On Vercel: Dashboard → Deployments → Select previous
# On Netlify: Deployments → Select previous version
```

### Regular Maintenance

- [ ] Weekly: Check error logs
- [ ] Monthly: Update dependencies
- [ ] Monthly: Review analytics
- [ ] Quarterly: Security audit
- [ ] Quarterly: Performance review

## 📞 Support Resources

- **Vercel Support**: https://vercel.com/support
- **Netlify Support**: https://docs.netlify.com
- **GitHub Pages Help**: https://pages.github.com
- **OpenAI API Support**: https://help.openai.com

---

**🎯 Your app is ready to help blind users worldwide!**

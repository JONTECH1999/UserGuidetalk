# 🚀 Netlify Deployment Guide

This guide walks through deploying the Blind Assistive Head Tech User Guide to Netlify.

## Prerequisites

- Netlify account (create at [netlify.com](https://netlify.com))
- GitHub/GitLab/Bitbucket account with repository
- `netlify.toml` and `_redirects` files (✅ already configured)

## Deployment Methods

### Option 1: Git-Based Deployment (Recommended)

**Step 1: Push to Git Repository**
```bash
git init
git add .
git commit -m "Initial commit - ready for Netlify deployment"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

**Step 2: Connect to Netlify**
1. Go to [app.netlify.com](https://app.netlify.com)
2. Click **"New site from Git"**
3. Select your Git provider (GitHub/GitLab/Bitbucket)
4. Select the repository
5. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Click **"Deploy site"**

**Step 3: Set Environment Variables**
1. In Netlify dashboard, go to **Site settings** → **Build & deploy** → **Environment**
2. Add environment variable:
   - Key: `VITE_OPENAI_API_KEY`
   - Value: Your OpenAI API key
3. Trigger a redeploy

### Option 2: Manual Deployment (Drag & Drop)

**Step 1: Build Locally**
```bash
npm run build
```

**Step 2: Deploy to Netlify**
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag and drop the `dist` folder
3. Site will be live with auto-generated URL

### Option 3: Netlify CLI

**Step 1: Install Netlify CLI**
```bash
npm install -g netlify-cli
```

**Step 2: Authenticate**
```bash
netlify login
```

**Step 3: Deploy**
```bash
npm run build
netlify deploy --prod --dir=dist
```

## Configuration Explained

### netlify.toml
- **Build command**: `npm run build` - Runs Vite production build
- **Publish directory**: `dist` - Where built files are served from
- **Node version**: 18.17.0 - LTS version for stability
- **Redirects**: All routes → `/index.html` (SPA routing)
- **Cache headers**: 
  - Static assets (1 year) - immutable
  - HTML files (no cache) - always fresh
  - Root (1 hour) - moderate cache

### _redirects
- Handles client-side routing for React
- Required for SPA navigation to work properly

### Security Headers
- `X-Content-Type-Options`: Prevents MIME type sniffing
- `X-Frame-Options`: Prevents clickjacking
- `Referrer-Policy`: Controls referrer information
- `Permissions-Policy`: Allows microphone/speaker for Web Speech API

## Environment Variables

**Required:**
- `VITE_OPENAI_API_KEY` - Your OpenAI API key for AI Assistant feature

**How to set in Netlify:**
1. Site settings → Build & deploy → Environment
2. Add variable and trigger redeploy

## Features

✅ **Progressive Web App (PWA)**
- Offline support with Service Worker
- App-like experience
- Installable on mobile/desktop

✅ **Accessibility**
- Screen reader optimized
- Keyboard navigation
- ARIA labels
- Voice command support

✅ **Performance**
- Vite optimized build (~94KB gzipped)
- Service Worker caching
- Optimized fonts and assets

✅ **SEO**
- Meta tags configured
- Open Graph support
- Accessibility metadata

## Troubleshooting

### Build Fails
- Check Node version: `node --version` (should be 18+)
- Clear cache: `npm ci` and rebuild
- Check environment variables are set

### Routing Issues
- Ensure `_redirects` file is in `dist` folder after build
- Check netlify.toml redirect rules

### Web Speech API Not Working
- Verify browser supports Web Speech API
- Ensure HTTPS (Netlify provides free SSL)
- Check user has given microphone/speaker permissions

### OpenAI Features Not Working
- Verify `VITE_OPENAI_API_KEY` is set in Netlify environment
- Check API key is valid and has usage credits
- Look at browser console for errors

## Post-Deployment

✅ **Test on Device**
- Test on mobile device (iOS/Android)
- Test with screen reader
- Test keyboard navigation
- Test hover announcements

✅ **Monitor Performance**
- Netlify Analytics Dashboard
- Check bundle size
- Monitor error logs

✅ **Keep Updated**
- Monitor OpenAI API changes
- Update dependencies regularly
- Test new browser features

## Custom Domain

1. In Netlify: Site settings → Domain management
2. Add custom domain or use Netlify subdomain
3. SSL certificate auto-enabled
4. Update DNS records if needed

## Support & Rollback

- Every deployment creates a version
- Netlify → Deploys tab to view history
- Easy rollback to previous version
- One-click production deploys

---

**Deployment Checklist:**
- [ ] Git repository created and pushed
- [ ] Netlify account set up
- [ ] Site connected to Git
- [ ] `VITE_OPENAI_API_KEY` environment variable set
- [ ] First deployment triggered automatically
- [ ] Custom domain configured (optional)
- [ ] Tested on mobile and desktop
- [ ] Tested with screen reader
- [ ] Web Speech API working

For more info: [Netlify Documentation](https://docs.netlify.com/)

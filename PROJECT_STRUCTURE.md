# Project Structure & Architecture

## 📁 Complete File Tree

```
blind-assistive-guide/
│
├── public/                          # Static assets
│   └── (PWA icons and manifest)
│
├── src/
│   ├── components/                  # React Components
│   │   ├── AccessibleButton.jsx     # Base accessible button component
│   │   ├── PlaybackControls.jsx     # Play/Pause/Next/Previous buttons
│   │   ├── SpeechControls.jsx       # Speed adjustment controls
│   │   ├── AIAssistant.jsx          # AI Q&A interface
│   │   └── GuideContent.jsx         # Content display with progress
│   │
│   ├── services/                    # Business Logic
│   │   ├── TextToSpeechService.js   # Web Speech API integration
│   │   ├── VoiceCommandService.js   # Speech recognition & command processing
│   │   └── AIAssistantService.js    # OpenAI API integration
│   │
│   ├── data/
│   │   └── userGuideContent.js      # User guide sections & FAQ
│   │
│   ├── utils/                       # Utility Functions
│   │   ├── qrCodeGenerator.js       # QR code creation utilities
│   │   └── accessibilityUtils.js    # Accessibility helper functions
│   │
│   ├── constants.js                 # App constants & configuration
│   ├── App.jsx                      # Main app component
│   ├── main.jsx                     # React entry point
│   └── index.css                    # Global Tailwind styles
│
├── scripts/
│   └── update-vite-config.js        # Vite config update script
│
├── Configuration Files
│   ├── index.html                   # HTML template
│   ├── vite.config.js               # Vite bundler config
│   ├── tailwind.config.js           # Tailwind CSS config
│   ├── postcss.config.js            # PostCSS config
│   ├── tsconfig.json                # TypeScript config
│   ├── .eslintrc.json              # ESLint config
│   └── package.json                # Dependencies & scripts
│
├── Documentation
│   ├── README.md                    # Complete documentation
│   ├── QUICKSTART.md                # Quick start guide
│   ├── DEPLOYMENT.md                # Deployment instructions
│   ├── ACCESSIBILITY.md             # Accessibility details
│   └── PROJECT_STRUCTURE.md         # This file
│
├── Setup Files
│   ├── setup.sh                     # Linux/Mac setup script
│   ├── setup.bat                    # Windows setup script
│   ├── .env.example                 # Environment template
│   ├── .gitignore                   # Git ignore rules
│   └── .editorconfig                # Editor configuration
│
└── Build Output (generated)
    └── dist/                        # Production build (after `npm run build`)
```

## 🏗️ Architecture Overview

### Component Hierarchy

```
App (Main Container)
├── Header
├── Main Content
│   ├── Welcome Section (shown initially)
│   ├── GuideContent (displayed when playing)
│   ├── PlaybackControls
│   ├── SpeechControls
│   ├── Voice Command Toggle
│   └── AIAssistant (optional)
└── Footer
```

### Data Flow

```
User Input (Voice/Click)
    ↓
VoiceCommandService / Event Handler
    ↓
App Component (State Management)
    ↓
TextToSpeechService (Audio Output)
    ↓
AI Assistant Service (Optional) → OpenAI API
    ↓
User Feedback (Audio/Haptic)
```

### Service Architecture

#### TextToSpeechService
- Manages Web Speech Synthesis API
- Handles voice narration
- Controls playback speed
- Provides feedback announcements
- Manages haptic feedback

#### VoiceCommandService
- Listens for voice input
- Recognizes predefined commands
- Converts speech to text
- Normalizes commands
- Triggers appropriate actions

#### AIAssistantService
- Processes user questions
- Searches FAQ database
- Queries OpenAI API
- Maintains conversation history
- Returns spoken responses

## 🔄 State Management Flow

```
App State:
├── currentSection          # Current guide section index
├── isPlaying              # Playback status
├── isPaused               # Pause status
├── speechRate             # Speech speed multiplier
├── showAIAssistant        # AI panel visibility
├── hasStarted             # Guide started flag
├── isListeningForCommands # Voice listening status
└── voiceCommandStatus     # Last recognized command

↓ Updates triggered by:
- User button clicks
- Voice commands
- Auto-next after section ends
- Speed/settings changes
- Component interactions
```

## 🔌 API Integrations

### Web APIs Used
1. **Web Speech API**
   - `SpeechSynthesisUtterance` - Text-to-speech
   - `SpeechRecognition` - Voice input

2. **Vibration API**
   - `navigator.vibrate()` - Haptic feedback

3. **Service Worker API**
   - PWA offline support
   - Asset caching

### External APIs
1. **OpenAI Chat Completions**
   - Model: `gpt-3.5-turbo`
   - Endpoint: `https://api.openai.com/v1/chat/completions`
   - Purpose: AI assistant Q&A

## 🎨 Styling Strategy

### Tailwind CSS Approach
- Utility-first CSS framework
- Accessible color palette
- Large typography scales
- High contrast defaults
- Reduced motion support

### Accessibility Colors
- Black (#000000) on White (#FFFFFF) - 21:1 contrast
- Blue (#0066CC) on White - 8.6:1 contrast
- Meets WCAG AAA standards

## 📦 Dependencies

### Core
- `react` - UI library
- `react-dom` - DOM rendering

### Audio
- `react-speech-kit` - Speech synthesis

### Animations
- `framer-motion` - Motion library

### Accessibility
- `@react-aria/` - Accessibility hooks
- `react-stately` - State management

### Build Tools
- `vite` - Next-gen bundler
- `tailwindcss` - CSS framework
- `postcss` - CSS processing
- `autoprefixer` - CSS prefixes

### PWA
- `vite-plugin-pwa` - PWA support

### Development
- `typescript` - Type checking
- `eslint` - Code linting
- `@vitejs/plugin-react` - React support

## 🔐 Security Considerations

### API Key Management
- Never commit `.env` file
- Use environment variables
- Implement backend proxy for production
- Rotate keys regularly

### Input Validation
- Sanitize voice input
- Validate user text
- Escape HTML content
- Prevent XSS attacks

### CORS Configuration
- Limit allowed origins
- Set appropriate headers
- Validate requests

## 📊 Performance Optimization

### Code Splitting
- Separate vendor bundles
- Lazy load components
- Split services module

### Caching Strategy
- Service worker caches assets
- Browser caches with versioning
- CDN caching for production

### Bundle Optimization
- Tree shaking enabled
- Minification applied
- Source maps for debugging

## 🧪 Testing Strategy

### Manual Testing Checklist
- [ ] Voice commands work
- [ ] Buttons are accessible
- [ ] Keyboard navigation works
- [ ] Screen reader compatible
- [ ] Mobile responsive
- [ ] Haptic feedback works
- [ ] AI assistant responds
- [ ] PWA installation works
- [ ] Offline mode works

### Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Device Testing
- Desktop (Windows/Mac/Linux)
- Tablet (iPad/Android)
- Mobile (iPhone/Android)
- Screen readers (NVDA/JAWS/VoiceOver)

## 🚀 Build & Deploy Pipeline

### Development
```
npm run dev → Local server → Hot reload
```

### Production Build
```
npm run build → Optimization → dist/ folder
```

### Deployment
```
dist/ → Upload to Vercel/Netlify/GitHub Pages
```

### Quality Assurance
```
npm run lint → Check code quality
npm run type-check → Check types
npm run build → Final build test
```

## 📝 Naming Conventions

### Components
- PascalCase: `AccessibleButton`, `PlaybackControls`
- Descriptive names with function
- Accessibility in mind

### Functions
- camelCase: `handlePlay()`, `onNext()`
- Start with verb or state
- Clear intent

### Variables
- camelCase: `isPlaying`, `currentSection`
- Prefix booleans with `is/has`
- Meaningful names

### CSS Classes
- kebab-case: `sr-only`, `accessible-button`
- BEM methodology where needed
- Tailwind utility classes

## 🔗 File Size Targets

```
Total Bundle: < 500KB (gzipped)
- React/ReactDOM: 40KB
- Components: 50KB
- Services: 30KB
- Tailwind CSS: 20KB
- Framer Motion: 40KB
- Other: 20KB
- Assets/Data: 300KB (cached)
```

## 🔄 Development Workflow

1. **Create feature branch**
   ```bash
   git checkout -b feature/feature-name
   ```

2. **Make changes**
   - Edit components/services
   - Test locally with `npm run dev`
   - Check accessibility

3. **Commit changes**
   ```bash
   git commit -m "Add feature description"
   ```

4. **Push and deploy**
   ```bash
   git push origin feature/feature-name
   # Create pull request
   # CI/CD deploys automatically
   ```

## 🎯 Key Design Decisions

1. **Service-Based Architecture**
   - Separation of concerns
   - Easy to test and modify
   - Reusable logic

2. **Component Composition**
   - Small, focused components
   - Props-based configuration
   - Easy to maintain

3. **Accessibility First**
   - WCAG compliance from start
   - Screen reader testing
   - Keyboard navigation always

4. **Progressive Enhancement**
   - Works without JavaScript
   - Graceful degradation
   - Fallbacks for unsupported features

## 📚 Further Reading

- See `README.md` for complete documentation
- See `QUICKSTART.md` for getting started
- See `DEPLOYMENT.md` for deployment
- See `ACCESSIBILITY.md` for accessibility details
- Code comments explain complex logic

---

**Well-structured, scalable, and accessible React application architecture.**

/**
 * Constants and Configuration
 */

export const SPEECH_RATES = {
  SLOWEST: 0.75,
  SLOW: 0.9,
  NORMAL: 1,
  FAST: 1.25,
  FASTEST: 1.5,
}

export const COLORS = {
  PRIMARY_BLACK: '#000000',
  PRIMARY_WHITE: '#FFFFFF',
  ACCESSIBLE_BLUE: '#0066CC',
  ACCESSIBLE_GRAY: '#F2F2F2',
  SUCCESS_GREEN: '#10B981',
  ERROR_RED: '#EF4444',
  WARNING_YELLOW: '#FBBF24',
}

export const ARIA_LABELS = {
  PLAY: 'Play audio guide',
  PAUSE: 'Pause audio guide',
  STOP: 'Stop audio playback',
  NEXT: 'Go to next section',
  PREVIOUS: 'Go to previous section',
  REPEAT: 'Repeat current section',
  FASTER: 'Increase speech speed',
  SLOWER: 'Decrease speech speed',
  VOICE_COMMANDS: 'Enable voice commands',
  AI_ASSISTANT: 'Open AI Assistant',
}

export const KEY_CODES = {
  ENTER: 13,
  SPACE: 32,
  ESCAPE: 27,
  TAB: 9,
  ARROW_UP: 38,
  ARROW_DOWN: 40,
  ARROW_LEFT: 37,
  ARROW_RIGHT: 39,
}

export const MESSAGES = {
  WELCOME: 'Welcome to Blind Assistive Head Tech User Guide. Tap anywhere to begin.',
  PLAYING: 'Now playing',
  PAUSED: 'Paused',
  STOPPED: 'Playback stopped',
  NEXT_SECTION: 'Moving to next section',
  PREVIOUS_SECTION: 'Moving to previous section',
  GUIDE_COMPLETE: 'Congratulations! You have completed the user guide.',
  VOICE_NOT_SUPPORTED: 'Voice commands are not supported in your browser.',
  ERROR_LOADING: 'Error loading content. Please try again.',
}

export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
}

export default {
  SPEECH_RATES,
  COLORS,
  ARIA_LABELS,
  KEY_CODES,
  MESSAGES,
  BREAKPOINTS,
}

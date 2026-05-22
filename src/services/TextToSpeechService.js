/**
 * Text-to-Speech Service
 * Handles automatic narration using Web Speech API
 * Fully accessible implementation
 */

class TextToSpeechService {
  constructor() {
    this.synth = window.speechSynthesis
    this.currentUtterance = null
    this.isPaused = false
    this.currentText = ''
    this.onStateChange = null
    this.currentRate = 1
    this.currentPitch = 1
    this.currentVolume = 1
  }

  /**
   * Speak text with full accessibility support
   */
  speak(text, options = {}) {
    // Cancel any existing speech to speak immediately
    if (this.synth.speaking) {
      this.synth.cancel()
    }

    this.currentText = text
    const utterance = new SpeechSynthesisUtterance(text)

    // Set voice properties
    utterance.rate = Math.max(0.5, Math.min(2, options.rate || this.currentRate))
    utterance.pitch = options.pitch || this.currentPitch
    utterance.volume = Math.max(0, Math.min(1, options.volume || this.currentVolume))

    // Set a voice - this is important
    const voices = this.synth.getVoices()
    if (voices.length > 0) {
      const englishVoice = voices.find(v => v.lang.startsWith('en')) || voices[0]
      utterance.voice = englishVoice
    }

    // Set all event handlers BEFORE speaking
    utterance.onstart = () => {
      console.log('🔊 Speech started')
      this.isPaused = false
      this.notifyStateChange('speaking', text)
      this.triggerHaptic(50)
    }

    utterance.onpause = () => {
      console.log('⏸️ Speech paused')
      this.isPaused = true
      this.notifyStateChange('paused')
    }

    utterance.onresume = () => {
      console.log('▶️ Speech resumed')
      this.isPaused = false
      this.notifyStateChange('resumed')
    }

    utterance.onend = () => {
      console.log('✓ Speech ended')
      this.isPaused = false
      this.currentUtterance = null
      this.notifyStateChange('completed')
    }

    utterance.onerror = (event) => {
      console.error('❌ Speech error:', event.error)
      this.isPaused = false
      this.currentUtterance = null
      this.notifyStateChange('error', event.error)
    }

    this.currentUtterance = utterance
    console.log('📢 Attempting to speak:', text.substring(0, 50) + '...')
    this.synth.speak(utterance)
  }

  /**
   * Speak feedback message to user
   */
  speakFeedback(message, options = {}) {
    const { interrupt = false, rate = 1.0, volume = 1.0 } = options

    console.log('📢 Speaking feedback:', message)

    // For feedback, interrupt the guide if requested
    let wasInterrupted = false
    if (interrupt) {
      console.log('🛑 IMMEDIATE INTERRUPT - Stopping guide for announcement')
      this.synth.cancel()
      wasInterrupted = true
      this.isPaused = true // Mark as paused so we know to resume later
    } else if (this.synth.speaking && !this.isPaused) {
      console.log('⏸️ Pausing guide for feedback')
      this.synth.pause()
    }

    // Create utterance
    const utterance = new SpeechSynthesisUtterance(message)
    utterance.rate = Math.max(0.5, Math.min(2, rate))
    utterance.volume = Math.max(0, Math.min(1, volume))
    utterance.pitch = 1.0

    // Get voices
    const voices = this.synth.getVoices()
    if (voices.length > 0) {
      const englishVoice = voices.find(v => v.lang.startsWith('en')) || voices[0]
      utterance.voice = englishVoice
    }

    // Set event handlers
    utterance.onstart = () => {
      console.log('🔊 Feedback started:', message)
    }

    utterance.onend = () => {
      console.log('✓ Feedback ended - Resuming guide')
      // After announcement finishes, restart the guide content
      if (wasInterrupted) {
        // If we interrupted, restart the current content
        console.log('🔄 After announcement: Restarting current guide content')
        this.restartCurrent({ rate: this.currentRate })
      } else if (this.isPaused) {
        // If we just paused, resume
        try {
          this.synth.resume()
        } catch (e) {
          console.log('Could not resume:', e.message)
        }
      }
    }

    utterance.onerror = (event) => {
      console.log('⚠️ Speech blocked (browser security) - will work after user interaction:', event.error)
    }

    // Try to speak (browser will allow or block based on gesture policy)
    try {
      this.synth.speak(utterance)
    } catch (e) {
      console.log('⚠️ Speech error:', e.message)
    }
  }

  /**
   * Pause speech
   */
  pause() {
    if (this.synth.speaking && !this.isPaused) {
      this.synth.pause()
    }
  }

  /**
   * Resume speech
   */
  resume() {
    if (this.synth.paused) {
      this.synth.resume()
    }
  }

  /**
   * Stop all speech
   */
  stop() {
    this.synth.cancel()
    this.isPaused = false
    this.currentUtterance = null
  }

  /**
   * Restart the current content (after interruption for button announcement)
   */
  restartCurrent(options = {}) {
    const { rate = 1.0 } = options
    if (this.currentText) {
      console.log('🔄 Restarting current content after announcement')
      this.speak(this.currentText, { rate })
    }
  }

  /**
   * Set speech rate (0.5 to 2)
   */
  setRate(rate) {
    this.currentRate = Math.max(0.5, Math.min(2, rate))
    if (this.isPaused) {
      this.resume()
    }
  }

  /**
   * Set volume (0 to 1)
   */
  setVolume(volume) {
    this.currentVolume = Math.max(0, Math.min(1, volume))
  }

  /**
   * Replay current text
   */
  replay() {
    if (this.currentText) {
      this.speakFeedback('Replaying')
      this.speak(this.currentText)
    }
  }

  /**
   * Haptic feedback for accessibility (vibration on mobile)
   */
  triggerHaptic(duration = 50) {
    if (navigator.vibrate) {
      try {
        navigator.vibrate(duration)
      } catch (e) {
        // Haptic not supported
      }
    }
  }

  /**
   * State change notification
   */
  notifyStateChange(state, data = null) {
    if (this.onStateChange) {
      this.onStateChange({ state, data })
    }
  }

  /**
   * Check if speech is currently speaking
   */
  isSpeaking() {
    return this.synth.speaking && !this.isPaused
  }

  /**
   * Get available voices
   */
  getVoices() {
    return this.synth.getVoices()
  }

  /**
   * Initialize service (load voices)
   */
  initialize() {
    // Ensure voices are loaded
    this.synth.onvoiceschanged = () => {
      // Voices updated
    }
  }
}

export default new TextToSpeechService()

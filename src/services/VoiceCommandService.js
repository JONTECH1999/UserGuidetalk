/**
 * Voice Command Recognition Service
 * Handles speech recognition for voice commands
 * Fully accessible implementation
 */

class VoiceCommandService {
  constructor() {
    // Use vendor-prefixed SpeechRecognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition()
      this.isListening = false
      this.onCommand = null
      this.onListeningChange = null

      // Configure recognition
      this.recognition.continuous = false
      this.recognition.interimResults = true
      this.recognition.lang = 'en-US'

      // Set up event handlers
      this.setupEventHandlers()
    } else {
      this.recognition = null
      this.isListening = false
      this.onCommand = null
      this.onListeningChange = null
    }
  }

  setupEventHandlers() {
    if (!this.recognition) return

    this.recognition.onstart = () => {
      this.isListening = true
      this.notifyListeningChange(true)
    }

    this.recognition.onresult = (event) => {
      let interimTranscript = ''
      let finalTranscript = ''

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript.toLowerCase()

        if (event.results[i].isFinal) {
          finalTranscript += transcript + ' '
        } else {
          interimTranscript += transcript
        }
      }

      if (finalTranscript) {
        this.processCommand(finalTranscript.trim())
      }
    }

    this.recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error)
      this.notifyCommand('error', event.error)
    }

    this.recognition.onend = () => {
      this.isListening = false
      this.notifyListeningChange(false)
    }
  }

  /**
   * Start listening for voice commands
   */
  startListening() {
    if (!this.recognition) return
    if (!this.isListening) {
      this.recognition.start()
    }
  }

  /**
   * Stop listening for voice commands
   */
  stopListening() {
    if (!this.recognition) return
    if (this.isListening) {
      this.recognition.stop()
    }
  }

  /**
   * Process recognized command
   */
  processCommand(transcript) {
    const command = this.normalizeCommand(transcript)

    if (command) {
      this.notifyCommand(command.type, command.data)
    }

    // Continue listening for next command
    this.startListening()
  }

  /**
   * Normalize voice command to standard format
   */
  normalizeCommand(transcript) {
    // Command mappings
    const commands = {
      // Navigation
      'next': { type: 'next', data: 'next section' },
      'go next': { type: 'next', data: 'next section' },
      'previous': { type: 'previous', data: 'previous section' },
      'go back': { type: 'previous', data: 'previous section' },
      'back': { type: 'previous', data: 'previous section' },

      // Playback control
      'play': { type: 'play', data: 'playing' },
      'pause': { type: 'pause', data: 'paused' },
      'stop': { type: 'stop', data: 'stopped' },
      'repeat': { type: 'repeat', data: 'repeating current section' },
      'repeat section': { type: 'repeat', data: 'repeating current section' },

      // Speed control
      'faster': { type: 'faster', data: 'increased speed' },
      'speed up': { type: 'faster', data: 'increased speed' },
      'slower': { type: 'slower', data: 'decreased speed' },
      'slow down': { type: 'slower', data: 'decreased speed' },

      // Volume control
      'volume up': { type: 'volume-up', data: 'volume increased' },
      'louder': { type: 'volume-up', data: 'volume increased' },
      'volume down': { type: 'volume-down', data: 'volume decreased' },
      'quieter': { type: 'volume-down', data: 'volume decreased' },

      // Help
      'help': { type: 'help', data: 'help requested' },
      'read help': { type: 'help', data: 'help requested' },

      // General
      'explain again': { type: 'repeat', data: 'repeating current section' },
      'say that again': { type: 'repeat', data: 'repeating current section' },
    }

    // Find matching command
    for (const [key, value] of Object.entries(commands)) {
      if (transcript.includes(key)) {
        return value
      }
    }

    // Try partial matches
    for (const [key, value] of Object.entries(commands)) {
      if (key.includes(transcript) || transcript.includes(key)) {
        return value
      }
    }

    return null
  }

  /**
   * Notify command listeners
   */
  notifyCommand(commandType, data) {
    if (this.onCommand) {
      this.onCommand({ type: commandType, data })
    }
  }

  /**
   * Notify listening state change
   */
  notifyListeningChange(isListening) {
    if (this.onListeningChange) {
      this.onListeningChange(isListening)
    }
  }

  /**
   * Check if voice recognition is available (instance method)
   */
  isSupported() {
    return !!(window.SpeechRecognition || window.webkitSpeechRecognition)
  }

  /**
   * Check if voice recognition is available (static method)
   */
  static isSupported() {
    return !!(window.SpeechRecognition || window.webkitSpeechRecognition)
  }

  /**
   * Get listening status
   */
  getListeningStatus() {
    return this.isListening
  }
}

export default new VoiceCommandService()

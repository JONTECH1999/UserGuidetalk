/**
 * Main App Component
 * Blind Assistive Head Tech - Audio User Guide
 * Fully Accessible: Auto-play, Voice Feedback, Keyboard Navigation
 * Optimized for blind users with screen readers
 */

import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaHeadphones, FaVolumeUp } from 'react-icons/fa'
import SimplePlaybackControls from './components/SimplePlaybackControls'
import AIAssistant from './components/AIAssistant'
import GuideContent from './components/GuideContent'
import TextToSpeechService from './services/TextToSpeechService'
import { userGuideContent } from './data/userGuideContent'

function App() {
  // State management
  const [currentSection, setCurrentSection] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false) // Start false, activate on first gesture
  const [isPaused, setIsPaused] = useState(false)
  const [showAIAssistant, setShowAIAssistant] = useState(false)
  const [hasStarted, setHasStarted] = useState(false) // Will be true after first gesture
  const [liveRegionMessage, setLiveRegionMessage] = useState('')
  const [hasInitialized, setHasInitialized] = useState(false) // Track if we've started playback

  // Permanent normal speech rate
  const SPEECH_RATE = 1.0
  const MAX_SECTION = 21 // 22 sections (0-21)

  // ===== ANNOUNCE TO SCREEN READER FUNCTION =====
  const announceToScreenReader = useCallback((message) => {
    setLiveRegionMessage(message)
    setTimeout(() => setLiveRegionMessage(''), 100)
  }, [])

  // ===== START GUIDE - Called on first user interaction =====
  const startGuide = useCallback(() => {
    if (!hasInitialized) {
      setHasInitialized(true)
      setHasStarted(true)
      setCurrentSection(0)
      setIsPaused(false)
      
      const section = userGuideContent[0]
      if (section) {
        // Speak immediately without delay
        try {
          // Ensure voices are initialized for Firefox/Safari
          if (TextToSpeechService.initializeVoices) {
            TextToSpeechService.initializeVoices()
          }
          
          TextToSpeechService.speak(section.content, { rate: SPEECH_RATE })
          setIsPlaying(true)
          announceToScreenReader(`Guide started: ${section.title}`)
        } catch (e) {
          console.error('Error starting guide:', e)
        }
      }
    }
  }, [hasInitialized, announceToScreenReader])

  // ===== PLAYBACK CONTROL CALLBACKS =====

  const handlePause = useCallback(() => {
    // Ensure guide has started
    if (!hasInitialized) {
      startGuide()
      return
    }

    if (isPaused) {
      // Resume
      TextToSpeechService.resume()
      setIsPaused(false)
      announceToScreenReader('Playback resumed')
    } else {
      // Pause
      TextToSpeechService.pause()
      setIsPaused(true)
      announceToScreenReader('Playback paused')
    }
  }, [isPaused, hasInitialized, startGuide, announceToScreenReader])

  const handleNext = useCallback(() => {
    // Ensure guide has started
    if (!hasInitialized) {
      startGuide()
      return
    }

    if (currentSection < MAX_SECTION) {
      TextToSpeechService.stop()
      const nextSection = currentSection + 1
      setCurrentSection(nextSection)
      setIsPaused(false)
      const nextTitle = userGuideContent[nextSection]?.title
      announceToScreenReader(`Next section: ${nextTitle}`)
      
      // Auto-play next section
      setTimeout(() => {
        const section = userGuideContent[nextSection]
        if (section) {
          TextToSpeechService.speak(section.content, { rate: SPEECH_RATE })
          setIsPlaying(true)
        }
      }, 300)
    }
  }, [currentSection, hasInitialized, startGuide, announceToScreenReader])

  const handlePrevious = useCallback(() => {
    // Ensure guide has started
    if (!hasInitialized) {
      startGuide()
      return
    }

    if (currentSection > 0) {
      TextToSpeechService.stop()
      const prevSection = currentSection - 1
      setCurrentSection(prevSection)
      setIsPaused(false)
      const prevTitle = userGuideContent[prevSection]?.title
      announceToScreenReader(`Previous section: ${prevTitle}`)
      
      // Auto-play previous section
      setTimeout(() => {
        const section = userGuideContent[prevSection]
        if (section) {
          TextToSpeechService.speak(section.content, { rate: SPEECH_RATE })
          setIsPlaying(true)
        }
      }, 300)
    }
  }, [currentSection, hasInitialized, startGuide, announceToScreenReader])

  // ===== INITIALIZE ON FIRST USER INTERACTION =====
  useEffect(() => {
    const handleFirstInteraction = (e) => {
      // Prevent default only on touch events to ensure they register
      if (e.type === 'touchstart' || e.type === 'touchend') {
        e.preventDefault?.()
      }

      if (!hasInitialized) {
        startGuide()
      }
      // Remove listeners after first interaction
      window.removeEventListener('click', handleFirstInteraction)
      window.removeEventListener('touchstart', handleFirstInteraction, { passive: false })
      window.removeEventListener('touchend', handleFirstInteraction, { passive: false })
      window.removeEventListener('keydown', handleFirstInteraction)
      document.removeEventListener('click', handleFirstInteraction)
      document.removeEventListener('touchstart', handleFirstInteraction, { passive: false })
      document.removeEventListener('touchend', handleFirstInteraction, { passive: false })
      document.removeEventListener('keydown', handleFirstInteraction)
    }

    // Add listeners with passive: false for touch events to allow preventDefault
    window.addEventListener('click', handleFirstInteraction)
    window.addEventListener('touchstart', handleFirstInteraction, { passive: false })
    window.addEventListener('touchend', handleFirstInteraction, { passive: false })
    window.addEventListener('keydown', handleFirstInteraction)
    
    // Also add to document as backup for mobile
    document.addEventListener('click', handleFirstInteraction)
    document.addEventListener('touchstart', handleFirstInteraction, { passive: false })
    document.addEventListener('touchend', handleFirstInteraction, { passive: false })
    document.addEventListener('keydown', handleFirstInteraction)

    return () => {
      window.removeEventListener('click', handleFirstInteraction)
      window.removeEventListener('touchstart', handleFirstInteraction, { passive: false })
      window.removeEventListener('touchend', handleFirstInteraction, { passive: false })
      window.removeEventListener('keydown', handleFirstInteraction)
      document.removeEventListener('click', handleFirstInteraction)
      document.removeEventListener('touchstart', handleFirstInteraction, { passive: false })
      document.removeEventListener('touchend', handleFirstInteraction, { passive: false })
      document.removeEventListener('keydown', handleFirstInteraction)
    }
  }, [hasInitialized, startGuide])

  // ===== KEYBOARD SHORTCUTS =====
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return

      // Start guide on any key if not started yet
      if (!hasInitialized) {
        startGuide()
        return
      }

      switch (e.code) {
        case 'Space':
          e.preventDefault()
          handlePause()
          break
        case 'ArrowRight':
          e.preventDefault()
          handleNext()
          break
        case 'ArrowLeft':
          e.preventDefault()
          handlePrevious()
          break
        default:
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handlePause, handleNext, handlePrevious, hasInitialized, startGuide])

  // ===== AUTO-ADVANCE TO NEXT SECTION =====
  useEffect(() => {
    const handleStateChange = (state) => {
      if (state.state === 'completed' && isPlaying && !isPaused && hasInitialized) {
        // Auto-advance to next section
        setTimeout(() => {
          if (currentSection < MAX_SECTION) {
            const nextSection = currentSection + 1
            setCurrentSection(nextSection)
            const section = userGuideContent[nextSection]
            
            setTimeout(() => {
              TextToSpeechService.speak(section.content, { rate: SPEECH_RATE })
              setIsPlaying(true)
            }, 300)
          } else {
            // Reached the end
            setIsPlaying(false)
            announceToScreenReader('Guide completed. All sections finished.')
          }
        }, 300)
      }
    }

    TextToSpeechService.onStateChange = handleStateChange
  }, [currentSection, isPlaying, isPaused, hasInitialized, announceToScreenReader])

  const section = userGuideContent[currentSection]

  return (
    <div className="min-h-screen bg-white">
      {/* Screen Reader Live Region */}
      <div
        aria-live="assertive"
        aria-atomic="true"
        className="sr-only"
        role="status"
      >
        {liveRegionMessage}
      </div>

      {/* Skip to main content link */}
      <a href="#main-content" className="sr-only focus:not-sr-only">
        Skip to main content
      </a>

      {/* Header */}
      <motion.header
        className="bg-black text-white p-4 md:p-6 border-b-4 border-blue-500"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        role="banner"
      >
        <div className="max-w-6xl mx-auto flex items-center gap-3">
          <FaHeadphones size={36} className="text-blue-400" aria-hidden="true" />
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Blind Assistive Head Tech Guide</h1>
            <p className="text-sm md:text-base text-gray-300">Complete Audio Guide with Keyboard Navigation</p>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main id="main-content" className="max-w-4xl mx-auto px-4 md:px-6 py-6 space-y-8">
        {/* Start Message - Before user interaction */}
        {!hasStarted && (
          <motion.div
            className="bg-blue-100 border-4 border-blue-500 p-8 md:p-10 rounded-3xl text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            role="region"
            aria-live="assertive"
            aria-label="Start instruction"
          >
            <p className="text-2xl md:text-3xl font-bold mb-4 text-black">Ready to Begin Guide</p>
            <div className="space-y-4 text-left md:text-center">
              <p className="text-lg text-black mb-4">The Blind Assistive Head Tech audio guide will start automatically on any interaction.</p>
              <div className="bg-white p-4 rounded-lg border-2 border-blue-300 space-y-2">
                <p className="font-bold text-black">How to use:</p>
                <ul className="text-base text-black space-y-2 list-disc list-inside">
                  <li><strong>Touch or tap anywhere</strong> on the screen to start</li>
                  <li><strong>Space bar</strong> to pause/resume</li>
                  <li><strong>Right arrow</strong> for next section</li>
                  <li><strong>Left arrow</strong> for previous section</li>
                </ul>
              </div>
            </div>
            <div className="sr-only" role="status">
              Guide is ready. Press any key, tap, or click to start the audio guide. Use arrow keys to navigate between sections, space bar to pause and resume.
            </div>
          </motion.div>
        )}

        {/* Simple Playback Controls - 3 Buttons Only */}
        {hasStarted && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="sticky top-4 z-10 mb-8 bg-white rounded-3xl shadow-lg p-1"
          >
            <SimplePlaybackControls
              isPlaying={isPlaying}
              isPaused={isPaused}
              currentSection={currentSection}
              totalSections={MAX_SECTION}
              onPause={handlePause}
              onNext={handleNext}
              onPrevious={handlePrevious}
            />
          </motion.div>
        )}

        {/* Current Section Display */}
        <AnimatePresence mode="wait">
          {hasStarted && section && (
            <motion.div
              key={currentSection}
              className="bg-blue-50 p-8 md:p-10 rounded-3xl border-4 border-blue-500 shadow-lg mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              role="region"
              aria-label="Current guide section"
              aria-live="polite"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">{section.title}</h2>
              <p className="text-xl leading-relaxed text-black mb-8 whitespace-pre-wrap">{section.content}</p>
              <div className="border-t-3 border-blue-300 pt-6">
                <p className="text-base text-gray-700 font-bold">
                  📍 Section {currentSection + 1} of {MAX_SECTION + 1}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* AI Assistant */}
        {/* Removed - AI button has been removed from the interface */}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white p-6 md:p-8 mt-12 text-center border-t-4 border-blue-500" role="contentinfo">
        <div className="space-y-3">
          <p className="text-sm md:text-base">© 2024 Blind Assistive Head Tech - Fully Accessible Audio Guide</p>
          <p className="text-xs md:text-sm text-gray-400">Optimized for blind and visually impaired users with screen reader support</p>
        </div>
      </footer>
    </div>
  )
}

export default App

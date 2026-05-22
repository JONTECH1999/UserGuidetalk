/**
 * Main App Component
 * Blind Assistive Head Tech - Audio User Guide
 * Simplified for blind users: Auto-play, 4 buttons only
 */

import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaHeadphones } from 'react-icons/fa'
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
        className="bg-black text-white p-4 border-b-4 border-blue-500"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
      >
        <div className="max-w-6xl mx-auto flex items-center gap-3">
          <FaHeadphones size={36} className="text-blue-400" aria-hidden="true" />
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Blind Assistive Head Tech</h1>
            <p className="text-sm md:text-base text-gray-300">Audio Guide - Auto-Playing</p>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main id="main-content" className="max-w-6xl mx-auto p-4 md:p-6 space-y-6">
        {/* Start Message - Before user interaction */}
        {!hasStarted && (
          <motion.div
            className="bg-blue-100 border-4 border-blue-500 p-8 rounded-2xl text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            role="region"
            aria-live="assertive"
            aria-label="Start instruction"
          >
            <p className="text-2xl font-bold mb-4 text-black">Ready to Begin</p>
            <p className="text-lg text-black mb-4">Press any key, tap the screen, or click anywhere to start the audio guide.</p>
            <p className="text-base text-gray-700">The guide will automatically play all sections.</p>
            <div className="sr-only" role="status">
              Guide is ready. Press any key, tap, or click to start playing the audio guide.
            </div>
          </motion.div>
        )}

        {/* Simple Playback Controls - 4 Buttons Only */}
        {hasStarted && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <SimplePlaybackControls
              isPlaying={isPlaying}
              isPaused={isPaused}
              currentSection={currentSection}
              totalSections={MAX_SECTION}
              onPause={handlePause}
              onNext={handleNext}
              onPrevious={handlePrevious}
              onAskAI={() => setShowAIAssistant(!showAIAssistant)}
            />
          </motion.div>
        )}

        {/* Current Section Display */}
        <AnimatePresence mode="wait">
          {hasStarted && section && (
            <motion.div
              key={currentSection}
              className="bg-blue-50 p-6 rounded-2xl border-4 border-blue-500"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              role="region"
              aria-label="Current guide section"
              aria-live="polite"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-black mb-4">{section.title}</h2>
              <p className="text-lg leading-relaxed text-black mb-4">{section.content}</p>
              <p className="text-sm text-gray-700 font-bold">
                Section {currentSection + 1} of {MAX_SECTION + 1}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* AI Assistant */}
        <AnimatePresence>
          {showAIAssistant && hasStarted && <AIAssistant />}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white p-4 mt-8 text-center border-t-4 border-blue-500">
        <p className="text-sm">© 2024 Blind Assistive Head Tech - Accessible Audio Guide</p>
      </footer>
    </div>
  )
}

export default App

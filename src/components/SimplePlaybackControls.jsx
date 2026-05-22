/**
 * Simple Playback Controls Component
 * 3 large buttons for blind user convenience
 * Row 1: Previous, Pause/Play, Next (full screen width)
 */

import React from 'react'
import AccessibleButton from './AccessibleButton'
import { motion } from 'framer-motion'
import { FaPause, FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const SimplePlaybackControls = ({
  isPlaying,
  isPaused,
  currentSection,
  totalSections,
  onPause,
  onNext,
  onPrevious,
  disabled = false,
}) => {
  return (
    <div className="w-full bg-white rounded-3xl p-8 md:p-10 space-y-8 border-4 border-black shadow-lg">
      {/* Current Section Status */}
      <motion.div
        className="text-center p-3 md:p-4 bg-gradient-to-r from-blue-100 to-blue-50 rounded-2xl border-2 border-blue-400"
        aria-live="polite"
        aria-atomic="true"
        role="status"
      >
        <p className="text-xl md:text-2xl font-bold mb-2 text-black">
          {isPlaying && !isPaused ? '▶️ Now Playing' : isPaused ? '⏸️ Paused' : '⏹️ Stopped'}
        </p>
        <p className="text-lg md:text-xl font-bold text-blue-900" aria-label={`Section ${currentSection + 1} of ${totalSections + 1}`}>
          📍 Section {currentSection + 1} of {totalSections + 1}
        </p>
      </motion.div>

      {/* Main Controls - 3 Large Buttons */}
      <div className="grid grid-cols-3 gap-4 md:gap-6" role="toolbar" aria-label="Playback controls">
        {/* Previous Button */}
        <AccessibleButton
          label="Previous"
          onClick={onPrevious}
          disabled={disabled || currentSection <= 0}
          variant="secondary"
          ariaLabel={currentSection <= 0 ? 
            'Previous button (first section, disabled)' : 
            `Go to previous section. Currently on section ${currentSection}, will go to section ${currentSection}`}
          size="large"
          icon={<FaChevronLeft size={32} className="md:block" style={{width: '32px', height: '32px'}} />}
        />

        {/* Pause/Play Button */}
        <AccessibleButton
          label={isPlaying && !isPaused ? 'Pause' : 'Play'}
          onClick={onPause}
          disabled={disabled}
          variant="primary"
          ariaLabel={isPlaying && !isPaused ? 
            'Pause playback of current section' : 
            'Play or resume the audio guide'}
          ariaPressed={isPlaying && !isPaused}
          size="large"
          icon={<FaPause size={32} className="md:block" style={{width: '32px', height: '32px'}} />}
        />

        {/* Next Button */}
        <AccessibleButton
          label="Next"
          onClick={onNext}
          disabled={disabled || currentSection >= totalSections}
          variant="secondary"
          ariaLabel={currentSection >= totalSections ? 
            'Next button (last section, disabled)' : 
            `Go to next section. Currently on section ${currentSection + 1}, will go to section ${currentSection + 2}`}
          size="large"
          icon={<FaChevronRight size={32} className="md:block" style={{width: '32px', height: '32px'}} />}
        />
      </div>

    </div>
  )
}

export default SimplePlaybackControls

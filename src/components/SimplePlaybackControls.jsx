/**
 * Simple Playback Controls Component
 * Only 4 buttons for blind user convenience
 * Row 1: Previous, Pause/Play, Next
 * Row 2: Ask AI
 */

import React from 'react'
import AccessibleButton from './AccessibleButton'
import { motion } from 'framer-motion'
import { FaPause, FaChevronLeft, FaChevronRight, FaRobot } from 'react-icons/fa'

const SimplePlaybackControls = ({
  isPlaying,
  isPaused,
  currentSection,
  totalSections,
  onPause,
  onNext,
  onPrevious,
  onAskAI,
  disabled = false,
}) => {
  return (
    <div className="w-full bg-white rounded-3xl p-8 space-y-6 border-4 border-black">
      {/* Current Section Status */}
      <motion.div
        className="text-center p-4 bg-gray-100 rounded-2xl"
        aria-live="polite"
        aria-atomic="true"
      >
        <p className="text-2xl font-bold mb-2">
          {isPlaying && !isPaused ? '▶️ Playing' : isPaused ? '⏸️ Paused' : '⏹️ Stopped'}
        </p>
        <p className="text-xl font-bold" aria-label={`Section ${currentSection + 1} of ${totalSections + 1}`}>
          Section {currentSection + 1} of {totalSections + 1}
        </p>
      </motion.div>

      {/* Main Controls - Row 1: 3 Buttons */}
      <div className="grid grid-cols-3 gap-4">
        {/* Previous Button */}
        <AccessibleButton
          label="Previous"
          onClick={onPrevious}
          disabled={disabled || currentSection <= 0}
          variant="secondary"
          ariaLabel={`Go to previous section${currentSection > 0 ? ': ' + currentSection : ''}`}
          size="large"
          icon={<FaChevronLeft size={28} />}
        />

        {/* Pause/Play Button */}
        <AccessibleButton
          label={isPlaying && !isPaused ? 'Pause' : 'Play'}
          onClick={onPause}
          disabled={disabled}
          variant="primary"
          ariaLabel={isPlaying && !isPaused ? 'Pause playback' : 'Resume playback'}
          ariaPressed={isPlaying && !isPaused}
          size="large"
          icon={<FaPause size={28} />}
        />

        {/* Next Button */}
        <AccessibleButton
          label="Next"
          onClick={onNext}
          disabled={disabled || currentSection >= totalSections}
          variant="secondary"
          ariaLabel={`Go to next section${currentSection < totalSections ? ': ' + (currentSection + 2) : ''}`}
          size="large"
          icon={<FaChevronRight size={28} />}
        />
      </div>

      {/* Ask AI Button - Row 2 */}
      <div className="flex justify-center">
        <div className="w-full max-w-xs">
          <AccessibleButton
            label="Ask AI"
            onClick={onAskAI}
            disabled={disabled}
            variant="secondary"
            ariaLabel="Ask AI questions about the guide"
            size="large"
            icon={<FaRobot size={28} />}
          />
        </div>
      </div>

    </div>
  )
}

export default SimplePlaybackControls

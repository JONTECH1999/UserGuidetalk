/**
 * Playback Controls Component
 * Large accessible buttons for controlling guide playback
 */

import React from 'react'
import AccessibleButton from './AccessibleButton'
import { motion } from 'framer-motion'
import { FaPlay, FaPause, FaStop, FaRedoAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const PlaybackControls = ({
  isPlaying,
  isPaused,
  currentSection,
  totalSections,
  onPlay,
  onPause,
  onNext,
  onPrevious,
  onRepeat,
  onStop,
  disabled = false,
}) => {
  return (
    <div className="w-full bg-gray-100 rounded-3xl p-8 space-y-8">
      {/* Status display */}
      <motion.div
        className="text-center p-6 bg-white rounded-2xl border-4 border-black"
        aria-live="polite"
        aria-atomic="true"
      >
        <div className="text-2xl font-bold mb-2 flex items-center justify-center gap-3">
          {isPlaying ? (
            <>
              <FaPlay className="text-green-600" aria-hidden="true" /> Playing Continuously
            </>
          ) : isPaused ? (
            <>
              <FaPause className="text-orange-600" aria-hidden="true" /> Paused
            </>
          ) : (
            <>
              <FaStop className="text-red-600" aria-hidden="true" /> Stopped
            </>
          )}
        </div>
        <p className="text-xl" aria-label={`Section ${currentSection} of ${totalSections}`}>
          Section {currentSection} of {totalSections}
        </p>
        {isPlaying && (
          <p className="text-sm text-gray-600 mt-2">Advancing automatically to next section...</p>
        )}
      </motion.div>

      {/* Main playback buttons */}
      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
        <AccessibleButton
          label="Stop"
          onClick={onStop}
          disabled={disabled || !isPlaying}
          variant="danger"
          ariaLabel="Stop playback"
          size="large"
          icon={<FaStop size={24} />}
        />

        <AccessibleButton
          label={isPlaying ? 'Pause' : 'Play'}
          onClick={isPlaying ? onPause : onPlay}
          disabled={disabled}
          variant="primary"
          ariaLabel={isPlaying ? 'Pause' : 'Play'}
          ariaPressed={isPlaying}
          size="large"
          icon={isPlaying ? <FaPause size={24} /> : <FaPlay size={24} />}
        />

        <AccessibleButton
          label="Repeat"
          onClick={onRepeat}
          disabled={disabled}
          variant="secondary"
          ariaLabel="Repeat current section"
          size="large"
          icon={<FaRedoAlt size={24} />}
        />

        <AccessibleButton
          label="Previous"
          onClick={onPrevious}
          disabled={disabled || currentSection <= 1}
          variant="secondary"
          ariaLabel="Go to previous section"
          size="large"
          icon={<FaChevronLeft size={24} />}
        />

        <AccessibleButton
          label="Next"
          onClick={onNext}
          disabled={disabled || currentSection >= totalSections}
          variant="secondary"
          ariaLabel="Go to next section"
          size="large"
          icon={<FaChevronRight size={24} />}
        />
      </div>
    </div>
  )
}

export default PlaybackControls

/**
 * Guide Content Display Component
 * Shows current section title and content
 * Optimized for screen readers and TalkBack
 */

import React from 'react'
import { motion } from 'framer-motion'
import { FaClock, FaVolumeUp } from 'react-icons/fa'

const GuideContent = ({ section, totalSections, isPlaying }) => {
  if (!section) {
    return null
  }

  return (
    <motion.div
      className="w-full bg-white rounded-3xl p-8 border-4 border-gray-300 shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      role="region"
      aria-label="Guide content"
      aria-live="polite"
    >
      {/* Section header */}
      <div className="text-center mb-8">
        <motion.h2
          className="text-4xl font-bold text-black mb-2"
          role="heading"
          aria-level="2"
        >
          {section.title}
        </motion.h2>
        <p className="text-xl text-gray-600" aria-label={`Section ${section.id} of ${totalSections}. ${isPlaying ? 'Now playing.' : 'Ready to play.'}`}>
          Section {section.id} of {totalSections}
        </p>
      </div>

      {/* Progress bar */}
      <div className="mb-8 h-3 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 to-blue-600"
          initial={{ width: 0 }}
          animate={{ width: `${(section.id / totalSections) * 100}%` }}
          transition={{ duration: 0.5 }}
          role="progressbar"
          aria-valuenow={section.id}
          aria-valuemin={1}
          aria-valuemax={totalSections}
        />
      </div>

      {/* Section content */}
      <div
        className="text-xl leading-relaxed mb-8 text-gray-800"
        role="region"
        aria-live="polite"
        aria-label={`${section.title}: ${section.content}`}
      >
        <p>{section.content}</p>
      </div>

      {/* Reading time estimate */}
      <div className="p-4 bg-gray-100 rounded-2xl flex items-center justify-center gap-3">
        <FaClock className="text-gray-700 flex-shrink-0" aria-hidden="true" size={20} />
        <p className="text-lg text-gray-700">
          Estimated reading time: {Math.ceil(section.duration / 10)} seconds
        </p>
      </div>

      {/* Accessibility note */}
      <div className="mt-6 p-4 border-l-4 border-blue-500 bg-blue-50 rounded-lg flex items-start gap-3">
        <FaVolumeUp className="text-blue-500 mt-1 flex-shrink-0" aria-hidden="true" size={20} />
        <p className="text-base text-gray-700">
          This content is being read aloud to you. The guide will automatically advance to the next section when finished. No need to touch buttons - just listen.
        </p>
      </div>
    </motion.div>
  )
}

export default GuideContent

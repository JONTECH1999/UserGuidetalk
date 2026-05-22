/**
 * Speech Controls Component
 * Controls for speech rate and volume
 */

import React from 'react'
import AccessibleButton from './AccessibleButton'
import { motion } from 'framer-motion'
import { FaVolumeDown, FaVolumeUp, FaLightbulb } from 'react-icons/fa'

const SpeechControls = ({
  currentRate,
  onRateChange,
  onSlower,
  onFaster,
  disabled = false,
}) => {
  // Rate levels: 0.75, 1, 1.25, 1.5
  const rates = [
    { value: 0.75, label: 'Slowest' },
    { value: 1, label: 'Normal' },
    { value: 1.25, label: 'Faster' },
    { value: 1.5, label: 'Fastest' },
  ]

  return (
    <div className="w-full bg-gray-100 rounded-3xl p-8 space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Speech Speed</h2>

        {/* Speed display */}
        <motion.div
          className="p-4 bg-white rounded-2xl border-4 border-black mb-6"
          aria-live="polite"
        >
          <p className="text-xl">Current Speed: {Math.round(currentRate * 100)}%</p>
        </motion.div>

        {/* Speed buttons grid */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {rates.map((rate) => (
            <AccessibleButton
              key={rate.value}
              label={rate.label}
              onClick={() => onRateChange(rate.value)}
              disabled={disabled}
              variant={Math.abs(currentRate - rate.value) < 0.01 ? 'primary' : 'secondary'}
              ariaLabel={`Set speed to ${Math.round(rate.value * 100)} percent`}
              ariaPressed={Math.abs(currentRate - rate.value) < 0.01}
              size="medium"
            />
          ))}
        </div>

        {/* Quick speed adjustment buttons */}
        <div className="grid grid-cols-2 gap-4">
          <AccessibleButton
            label="Slower"
            onClick={onSlower}
            disabled={disabled || currentRate <= 0.75}
            variant="secondary"
            ariaLabel="Decrease speed"
            size="medium"
            icon={<FaVolumeDown size={20} />}
          />
          <AccessibleButton
            label="Faster"
            onClick={onFaster}
            disabled={disabled || currentRate >= 1.5}
            variant="secondary"
            ariaLabel="Increase speed"
            size="medium"
            icon={<FaVolumeUp size={20} />}
          />
        </div>
      </div>

      {/* Tips for accessibility */}
      <div className="p-4 bg-white rounded-2xl border-2 border-gray-300 flex items-start gap-3">
        <FaLightbulb className="text-yellow-500 mt-1 flex-shrink-0" aria-hidden="true" />
        <p className="text-base text-gray-700">
          Tip: Slower speeds are easier to follow. Take your time.
        </p>
      </div>
    </div>
  )
}

export default SpeechControls

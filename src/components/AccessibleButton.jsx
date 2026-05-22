/**
 * Accessible Button Component
 * WCAG AAA compliant button with keyboard navigation and haptic feedback
 * Designed for blind users with large touch targets and double-tap activation
 */

import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import TextToSpeechService from '../services/TextToSpeechService'

const AccessibleButton = ({
  label,
  onClick,
  disabled = false,
  size = 'large', // 'large', 'medium', 'small'
  variant = 'primary', // 'primary', 'secondary', 'danger'
  icon = null,
  ariaLabel,
  ariaPressed = false,
  ariaLive = 'assertive',
  className = '',
  onFocus = null,
  onBlur = null,
  haptic = true,
}) => {
  const touchCountRef = useRef(0)
  const touchTimeoutRef = useRef(null)
  const lastTouchTimeRef = useRef(0)
  const wasPausedByHoverRef = useRef(false)
  const hasAnnouncedHoverRef = useRef(false)
  const [isTouched, setIsTouched] = useState(false)

  const handleClick = (e) => {
    if (!disabled && onClick) {
      // Haptic feedback
      if (haptic && navigator.vibrate) {
        navigator.vibrate([50, 30, 50])
      }

      // Announce action being performed (for click-based activation)
      const fullLabel = e.currentTarget.getAttribute('aria-label') || label
      TextToSpeechService.speakFeedback(`Activated: ${fullLabel}`, { interrupt: false, rate: 1 })

      // Call the onClick handler
      onClick(e)
    }
  }

  const handleFocus = (e) => {
    // Announce button on keyboard focus (Tab navigation)
    if (!disabled) {
      // Pause the guide speech only if it's currently speaking
      if (TextToSpeechService.synth.speaking && !TextToSpeechService.isPaused) {
        TextToSpeechService.pause()
        wasPausedByHoverRef.current = true
      } else {
        wasPausedByHoverRef.current = false
      }

      // Speak the button label with full aria-label for context
      const fullLabel = e.currentTarget.getAttribute('aria-label') || label
      TextToSpeechService.speakFeedback(fullLabel, { interrupt: false, rate: 1 })
      hasAnnouncedHoverRef.current = true

      // Haptic feedback for keyboard focus
      if (haptic && navigator.vibrate) {
        navigator.vibrate(15)
      }
    }

    // Call custom onFocus handler if provided
    if (onFocus) onFocus(e)
  }

  const handleBlur = (e) => {
    // Resume guide when focus leaves button (for keyboard navigation)
    if (!disabled && wasPausedByHoverRef.current) {
      TextToSpeechService.resume()
      wasPausedByHoverRef.current = false
    }
    // Reset announcement flag
    hasAnnouncedHoverRef.current = false

    // Call custom onBlur handler if provided
    if (onBlur) onBlur(e)
  }

  // Handle mouse hover - announce button when cursor hovers over it
  const handleMouseEnter = (e) => {
    if (!disabled) {
      // Only announce once per hover
      if (!hasAnnouncedHoverRef.current) {
        // IMMEDIATELY INTERRUPT the guide speech - don't wait for it to finish
        const wasSpeaking = TextToSpeechService.synth.speaking
        if (wasSpeaking && !TextToSpeechService.isPaused) {
          // Stop current speech immediately (interrupt)
          TextToSpeechService.stop()
          wasPausedByHoverRef.current = true
        } else {
          wasPausedByHoverRef.current = false
        }

        // Speak the button name IMMEDIATELY with interrupt enabled
        const fullLabel = e.currentTarget.getAttribute('aria-label') || label
        console.log('🎤 INTERRUPTING - Announcing on hover:', fullLabel)
        TextToSpeechService.speakFeedback(fullLabel, { interrupt: true, rate: 1.0 })
        hasAnnouncedHoverRef.current = true

        // Haptic feedback to indicate hover
        if (haptic && navigator.vibrate) {
          navigator.vibrate([20, 10, 20])
        }
      }
    }
  }

  // Handle mouse leave - announcement is complete, guide restarts automatically
  const handleMouseLeave = (e) => {
    // The speakFeedback's onend handler will restart the guide automatically
    // Just reset the flag
    wasPausedByHoverRef.current = false
    hasAnnouncedHoverRef.current = false
  }

  // Handle touch start - announce button when touched
  const handleTouchStart = (e) => {
    if (disabled) return

    setIsTouched(true)

    // Pause the guide speech only if it's currently speaking
    if (TextToSpeechService.synth.speaking && !TextToSpeechService.isPaused) {
      TextToSpeechService.pause()
      wasPausedByHoverRef.current = true
    } else {
      wasPausedByHoverRef.current = false
    }

    // Speak the button label when touched
    TextToSpeechService.speakFeedback(label, { interrupt: false, rate: 1 })

    // Haptic feedback - short pulse to indicate touch detected
    if (haptic && navigator.vibrate) {
      navigator.vibrate(30)
    }

    // Double-tap detection
    const currentTime = Date.now()
    const timeSinceLastTouch = currentTime - lastTouchTimeRef.current

    // If second tap within 300ms, count as double tap
    if (timeSinceLastTouch < 300) {
      touchCountRef.current += 1
    } else {
      touchCountRef.current = 1
    }

    lastTouchTimeRef.current = currentTime

    // Clear previous timeout
    if (touchTimeoutRef.current) {
      clearTimeout(touchTimeoutRef.current)
    }

    // If double tap, activate button
    if (touchCountRef.current >= 2) {
      touchCountRef.current = 0
      lastTouchTimeRef.current = 0

      // Haptic feedback for double-tap confirmation
      if (haptic && navigator.vibrate) {
        navigator.vibrate([50, 30, 50, 30, 50])
      }

      // Speak confirmation
      TextToSpeechService.speakFeedback('Activated', { interrupt: false })

      // Trigger the click
      handleClick(e)
    } else {
      // Set timeout to reset touch count if no second tap
      touchTimeoutRef.current = setTimeout(() => {
        touchCountRef.current = 0
      }, 300)
    }
  }

  const handleTouchEnd = (e) => {
    setIsTouched(false)
    // Resume the guide speech only if we paused it
    if (wasPausedByHoverRef.current) {
      TextToSpeechService.resume()
      wasPausedByHoverRef.current = false
    }
  }

  const sizeStyles = {
    large: 'px-6 py-6 text-2xl min-h-28 min-w-24',
    medium: 'px-6 py-4 text-xl min-h-20 min-w-20',
    small: 'px-4 py-3 text-lg min-h-16 min-w-16',
  }

  const variantStyles = {
    primary: 'bg-black text-white hover:bg-gray-800 active:bg-gray-900 focus:outline-offset-4 focus:outline-4 focus:outline-blue-500',
    secondary:
      'bg-gray-300 text-black hover:bg-gray-400 active:bg-gray-500 focus:outline-offset-4 focus:outline-4 focus:outline-blue-500',
    danger:
      'bg-red-600 text-white hover:bg-red-700 active:bg-red-800 focus:outline-offset-4 focus:outline-4 focus:outline-red-400',
  }

  const buttonClasses = `
    ${sizeStyles[size]}
    ${variantStyles[variant]}
    ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
    ${isTouched ? 'ring-4 ring-yellow-400 shadow-lg' : ''}
    rounded-2xl
    font-bold
    transition-all
    duration-200
    flex
    items-center
    justify-center
    gap-3
    focus:outline
    focus:outline-offset-2
    focus:outline-4
    ${className}
  `

  return (
    <motion.button
      onClick={handleClick}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      disabled={disabled}
      aria-label={ariaLabel || label}
      aria-pressed={ariaPressed}
      aria-live={ariaLive}
      className={buttonClasses}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileFocus={{ scale: 1.05 }}
      role="button"
      tabIndex={disabled ? -1 : 0}
      style={{ touchAction: 'none' }} // Prevent default touch behavior
    >
      {icon && <span aria-hidden="true">{icon}</span>}
      <span>{label}</span>
    </motion.button>
  )
}

export default AccessibleButton

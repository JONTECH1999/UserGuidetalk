/**
 * Accessibility Utilities
 * Helper functions for WCAG compliance and accessibility features
 */

/**
 * Announce message to screen readers
 */
export const announceToScreenReaders = (message, priority = 'polite') => {
  const announcement = document.createElement('div')
  announcement.setAttribute('role', 'status')
  announcement.setAttribute('aria-live', priority)
  announcement.setAttribute('aria-atomic', 'true')
  announcement.className = 'sr-only'
  announcement.textContent = message

  document.body.appendChild(announcement)

  // Remove after announcement
  setTimeout(() => {
    announcement.remove()
  }, 1000)
}

/**
 * Focus management for keyboard navigation
 */
export const manageFocus = {
  setFocus: (element) => {
    if (element && element.focus) {
      element.focus()
    }
  },

  trapFocus: (containerElement, initialElement) => {
    const focusableElements = containerElement.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )

    if (focusableElements.length === 0) return

    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    containerElement.addEventListener('keydown', (e) => {
      if (e.key !== 'Tab') return

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault()
          lastElement.focus()
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault()
          firstElement.focus()
        }
      }
    })
  },
}

/**
 * Keyboard event helpers
 */
export const isKeyboardEvent = {
  isEnter: (event) => event.key === 'Enter' || event.keyCode === 13,
  isSpace: (event) => event.key === ' ' || event.keyCode === 32,
  isEscape: (event) => event.key === 'Escape' || event.keyCode === 27,
  isTab: (event) => event.key === 'Tab' || event.keyCode === 9,
  isArrowUp: (event) => event.key === 'ArrowUp' || event.keyCode === 38,
  isArrowDown: (event) => event.key === 'ArrowDown' || event.keyCode === 40,
  isArrowLeft: (event) => event.key === 'ArrowLeft' || event.keyCode === 37,
  isArrowRight: (event) => event.key === 'ArrowRight' || event.keyCode === 39,
}

/**
 * Get color contrast ratio for WCAG compliance
 */
export const getContrastRatio = (rgb1, rgb2) => {
  const getLuminance = (r, g, b) => {
    const [rs, gs, bs] = [r, g, b].map((x) => {
      x = x / 255
      return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4)
    })
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs
  }

  const l1 = getLuminance(rgb1.r, rgb1.g, rgb1.b)
  const l2 = getLuminance(rgb2.r, rgb2.g, rgb2.b)

  const lighter = Math.max(l1, l2)
  const darker = Math.min(l1, l2)

  return (lighter + 0.05) / (darker + 0.05)
}

/**
 * Check if user prefers reduced motion
 */
export const prefersReducedMotion = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Check if user prefers high contrast
 */
export const prefersHighContrast = () => {
  return window.matchMedia('(prefers-contrast: more)').matches
}

/**
 * Check if device supports haptic feedback
 */
export const supportsHaptics = () => {
  return !!navigator.vibrate
}

/**
 * Trigger haptic feedback with pattern
 */
export const triggerHapticPattern = (pattern = 50) => {
  if (navigator.vibrate) {
    navigator.vibrate(pattern)
  }
}

/**
 * Get readable screen reader text for status
 */
export const getStatusText = (status) => {
  const statusTexts = {
    playing: 'Audio is playing',
    paused: 'Audio is paused',
    stopped: 'Audio is stopped',
    loading: 'Loading content',
    error: 'An error occurred',
    success: 'Operation successful',
  }

  return statusTexts[status] || status
}

export default {
  announceToScreenReaders,
  manageFocus,
  isKeyboardEvent,
  getContrastRatio,
  prefersReducedMotion,
  prefersHighContrast,
  supportsHaptics,
  triggerHapticPattern,
  getStatusText,
}

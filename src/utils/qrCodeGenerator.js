/**
 * Utility for QR Code Generation
 * Creates QR codes linking to the deployed app
 */

import QRCode from 'qrcode'

/**
 * Generate QR code for deployment URL
 */
export const generateQRCode = async (url, options = {}) => {
  try {
    const defaultOptions = {
      errorCorrectionLevel: 'H',
      type: 'image/png',
      quality: 0.95,
      margin: 1,
      width: 300,
      color: {
        dark: '#000000',
        light: '#FFFFFF',
      },
      ...options,
    }

    const qrCode = await QRCode.toDataURL(url, defaultOptions)
    return qrCode
  } catch (error) {
    console.error('QR Code generation failed:', error)
    throw error
  }
}

/**
 * Generate QR code and download as image
 */
export const downloadQRCode = async (url, filename = 'blind-tech-guide-qr.png') => {
  try {
    const canvas = await QRCode.toCanvas(url, {
      errorCorrectionLevel: 'H',
      type: 'image/png',
      quality: 0.95,
      margin: 1,
      width: 300,
    })

    const link = document.createElement('a')
    link.href = canvas.toDataURL('image/png')
    link.download = filename
    link.click()
  } catch (error) {
    console.error('QR Code download failed:', error)
    throw error
  }
}

/**
 * Generate QR code for display
 */
export const createQRImage = async (url) => {
  try {
    const qrDataUrl = await generateQRCode(url, { width: 400 })
    return qrDataUrl
  } catch (error) {
    console.error('Failed to create QR image:', error)
    return null
  }
}

export default {
  generateQRCode,
  downloadQRCode,
  createQRImage,
}

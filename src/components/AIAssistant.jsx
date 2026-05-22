/**
 * AI Assistant Component
 * Fully accessible AI-powered question answering
 */

import React, { useState, useRef, useEffect } from 'react'
import AccessibleButton from './AccessibleButton'
import TextToSpeechService from '../services/TextToSpeechService'
import AIAssistantService from '../services/AIAssistantService'
import VoiceCommandService from '../services/VoiceCommandService'
import { motion, AnimatePresence } from 'framer-motion'
import { FaRobot, FaMicrophone, FaPaperPlane, FaSpinner, FaVolumeUp, FaCheckCircle, FaTrash, FaUser, FaLightbulb } from 'react-icons/fa'

const AIAssistant = () => {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [error, setError] = useState('')
  const [conversationHistory, setConversationHistory] = useState([])
  const inputRef = useRef(null)
  const textareaRef = useRef(null)

  // Initialize services
  useEffect(() => {
    TextToSpeechService.initialize()
  }, [])

  const handleVoiceInput = () => {
    if (!VoiceCommandService.isSupported()) {
      setError('Voice commands are not supported in your browser.')
      return
    }

    if (!isListening) {
      setIsListening(true)
      setQuestion('')
      setError('')

      VoiceCommandService.onCommand = (command) => {
        if (command.type !== 'error') {
          // For voice input, we'll capture full speech as question
          VoiceCommandService.stopListening()
        }
      }

      // Use Web Speech API directly for dictation
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      const recognition = new SpeechRecognition()
      recognition.continuous = false
      recognition.interimResults = true
      recognition.lang = 'en-US'

      let transcript = ''

      recognition.onstart = () => {
        TextToSpeechService.speakFeedback('Listening for your question')
      }

      recognition.onresult = (event) => {
        let interimTranscript = ''
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcriptSegment = event.results[i][0].transcript
          if (event.results[i].isFinal) {
            transcript += transcriptSegment
          } else {
            interimTranscript += transcriptSegment
          }
        }
        setQuestion(transcript + interimTranscript)
      }

      recognition.onend = () => {
        setIsListening(false)
        if (transcript.trim()) {
          handleSubmitQuestion(transcript)
        } else {
          setError('No speech detected. Please try again.')
        }
      }

      recognition.onerror = (event) => {
        setIsListening(false)
        setError(`Error: ${event.error}`)
      }

      recognition.start()
    }
  }

  const handleSubmitQuestion = async (questionText = question) => {
    const finalQuestion = questionText.trim()
    if (!finalQuestion) {
      setError('Please enter or speak your question.')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const result = await AIAssistantService.getAnswer(finalQuestion)

      // Update conversation history
      setConversationHistory((prev) => [
        ...prev,
        { role: 'user', text: finalQuestion },
        { role: 'assistant', text: result },
      ])

      setAnswer(result)
      setQuestion('')

      // Speak the answer
      TextToSpeechService.speak(result, { rate: 1 })

      // Clear input
      if (textareaRef.current) {
        textareaRef.current.value = ''
      }
    } catch (err) {
      console.error('Error getting AI answer:', err)
      setError('Failed to get an answer. Please try again.')
      // Fallback: speak error
      TextToSpeechService.speakFeedback('Sorry, I could not find an answer.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleClearHistory = () => {
    setConversationHistory([])
    setAnswer('')
    setQuestion('')
    AIAssistantService.clearHistory()
    TextToSpeechService.speakFeedback('Conversation cleared')
  }

  return (
    <motion.div
      className="w-full bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 space-y-6 border-4 border-blue-500"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-3 mb-2">
          <FaRobot size={32} className="text-blue-600" aria-hidden="true" />
          <h2 className="text-3xl font-bold">AI Assistant</h2>
        </div>
        <p className="text-lg text-gray-700">Ask any question about your device</p>
      </div>

      {/* Question input area */}
      <div className="space-y-4">
        <label htmlFor="question-input" className="sr-only">
          Type or speak your question
        </label>
        <textarea
          ref={textareaRef}
          id="question-input"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Type your question here... or use the microphone button to speak"
          className="w-full p-4 rounded-2xl border-4 border-gray-300 text-xl focus:outline focus:outline-offset-2 focus:outline-4 focus:outline-blue-500 resize-none h-24"
          aria-label="Question input"
          disabled={isLoading}
        />

        {/* Input buttons */}
        <div className="grid grid-cols-2 gap-4">
          <AccessibleButton
            label={isListening ? 'Listening...' : 'Speak'}
            onClick={handleVoiceInput}
            disabled={isLoading || !VoiceCommandService.isSupported()}
            variant={isListening ? 'danger' : 'secondary'}
            ariaLabel={isListening ? 'Stop listening' : 'Start voice input'}
            size="medium"
            icon={<FaMicrophone size={20} />}
          />
          <AccessibleButton
            label="Submit"
            onClick={() => handleSubmitQuestion()}
            disabled={isLoading || !question.trim()}
            variant="primary"
            ariaLabel="Submit question"
            size="medium"
            icon={<FaPaperPlane size={20} />}
          />
        </div>
      </div>

      {/* Error message */}
      <AnimatePresence>
        {error && (
          <motion.div
            className="p-4 bg-red-100 border-4 border-red-500 rounded-2xl text-red-800 font-bold"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            role="alert"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading state */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="p-4 bg-blue-100 border-4 border-blue-500 rounded-2xl text-blue-800 font-bold flex items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="status"
            aria-live="polite"
          >
            <FaSpinner className="animate-spin" size={24} aria-hidden="true" />
            <span>Getting your answer...</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Answer display */}
      <AnimatePresence>
        {answer && (
          <motion.div
            className="p-6 bg-white border-4 border-green-500 rounded-2xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            role="region"
            aria-label="AI Assistant answer"
            aria-live="polite"
          >
            <p className="text-xl font-semibold text-green-700 mb-4">Answer:</p>
            <p className="text-lg leading-relaxed">{answer}</p>

            {/* Action buttons for answer */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              <AccessibleButton
                label="Repeat"
                onClick={() => TextToSpeechService.speak(answer)}
                variant="secondary"
                ariaLabel="Repeat the answer"
                size="medium"
                icon={<FaVolumeUp size={20} />}
              />
              <AccessibleButton
                label="Got It"
                onClick={() => setAnswer('')}
                variant="secondary"
                ariaLabel="Close answer"
                size="medium"
                icon={<FaCheckCircle size={20} />}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Conversation history */}
      {conversationHistory.length > 0 && (
        <motion.div className="border-t-4 border-blue-300 pt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">Recent Questions</h3>
            <AccessibleButton
              label="Clear"
              onClick={handleClearHistory}
              variant="secondary"
              ariaLabel="Clear conversation history"
              size="small"
              icon={<FaTrash size={16} />}
            />
          </div>

          {/* History items */}
          <div className="space-y-3 max-h-48 overflow-y-auto">
            {conversationHistory.map((item, index) => (
              <motion.div
                key={index}
                className={`p-3 rounded-xl ${
                  item.role === 'user'
                    ? 'bg-blue-100 border-l-4 border-blue-500'
                    : 'bg-green-100 border-l-4 border-green-500'
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <p className="font-bold text-sm mb-1 flex items-center gap-2">
                  {item.role === 'user' ? (
                    <>
                      <FaUser size={16} aria-hidden="true" />
                      You:
                    </>
                  ) : (
                    <>
                      <FaRobot size={16} aria-hidden="true" />
                      Assistant:
                    </>
                  )}
                </p>
                <p className="text-sm">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Helpful tips */}
      <div className="p-4 bg-yellow-50 border-4 border-yellow-400 rounded-2xl">
        <p className="text-lg font-semibold mb-2 flex items-center gap-2">
          <FaLightbulb size={24} className="text-yellow-600" aria-hidden="true" />
          Tips for best results:
        </p>
        <ul className="text-base space-y-2 list-disc list-inside">
          <li>Ask specific questions about the device</li>
          <li>Speak clearly when using voice input</li>
          <li>Wait for the full answer before asking another question</li>
        </ul>
      </div>
    </motion.div>
  )
}

export default AIAssistant

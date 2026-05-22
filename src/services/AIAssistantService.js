/**
 * AI Assistant Service
 * Integrates with OpenAI API for intelligent Q&A
 * Designed for blind users with simple, clear responses
 */

import { faqContent } from '../data/userGuideContent'

class AIAssistantService {
  constructor() {
    this.apiKey = import.meta.env.VITE_OPENAI_API_KEY
    this.conversationHistory = []
    this.isProcessing = false
  }

  /**
   * Check if API key is configured
   */
  isConfigured() {
    return !!this.apiKey && this.apiKey !== 'your_openai_api_key_here'
  }

  /**
   * Get answer to user question
   * Falls back to FAQ if API is not configured
   */
  async getAnswer(userQuestion) {
    if (!userQuestion || userQuestion.trim().length === 0) {
      return 'Please ask a question about the Blind Assistive Head Tech device. You can ask about wearing the device, turning it on or off, using buttons, understanding vibration and voice modes, or any other device features.'
    }

    this.isProcessing = true

    try {
      // First try FAQ for faster response
      const faqAnswer = this.searchFAQ(userQuestion)
      if (faqAnswer) {
        console.log('✓ FAQ match found')
        return faqAnswer
      }

      // If API is configured, use AI for more intelligent answers
      if (this.isConfigured()) {
        console.log('🤖 Using AI for intelligent answer')
        return await this.getAIAnswer(userQuestion)
      }

      // Fallback response with helpful suggestions
      return 'I could not find a specific answer in the FAQ. Try asking about: how to wear the device, how to turn it on or off, what the buttons do, how to use vibration mode, how to use voice mode, or any specific feature you need help with.'
    } catch (error) {
      console.error('Error getting answer:', error)
      return 'I encountered an error getting an answer. Please try again. You can ask about wearing the headband, turning it on, using buttons, vibration mode, voice guidance, or obstacle detection.'
    } finally {
      this.isProcessing = false
    }
  }

  /**
   * Search FAQ for matching answer with improved matching
   */
  searchFAQ(userQuestion) {
    const question = userQuestion.toLowerCase()
    let bestMatch = null
    let bestScore = 0

    for (const faqItem of faqContent) {
      const faqQuestion = faqItem.question.toLowerCase()
      
      // Calculate similarity score
      let score = 0
      
      // Exact phrase match (highest priority)
      if (faqQuestion.includes(question) || question.includes(faqQuestion)) {
        score += 100
      }
      
      // Word-by-word matching with better logic
      const questionWords = question
        .split(/[\s\-\/]+/)
        .filter(w => w.length > 2) // Only words longer than 2 chars
      const faqWords = faqQuestion
        .split(/[\s\-\/]+/)
        .filter(w => w.length > 2)

      // Count matching words
      for (const word of questionWords) {
        for (const faqWord of faqWords) {
          if (word === faqWord) {
            score += 50 // Exact word match
          } else if (word.length > 4 && faqWord.length > 4) {
            // Partial match for longer words
            if (faqWord.includes(word) || word.includes(faqWord)) {
              score += 20
            }
          }
        }
      }

      // Bonus for common question patterns
      if ((question.includes('how') && faqQuestion.includes('how')) ||
          (question.includes('what') && faqQuestion.includes('what')) ||
          (question.includes('when') && faqQuestion.includes('when')) ||
          (question.includes('where') && faqQuestion.includes('where'))) {
        score += 10
      }

      if (score > bestScore) {
        bestScore = score
        bestMatch = faqItem
      }
    }

    // Return only if there's a reasonable match
    return bestScore >= 30 ? bestMatch?.answer : null
  }

  /**
   * Get AI answer from OpenAI
   */
  async getAIAnswer(userQuestion) {
    try {
      // Add user message to conversation
      this.conversationHistory.push({
        role: 'user',
        content: userQuestion,
      })

      // Build comprehensive system message with device context
      const systemMessage = `You are an intelligent and helpful assistant for the Blind Assistive Head Tech device - a wearable headband designed to help visually impaired users navigate safely and independently.

DEVICE OVERVIEW:
- The device uses ultrasonic sensors to detect obstacles and provides feedback through vibration and voice guidance
- It's worn like a headband with sensors facing forward
- Power switch is on the right side near the ear (push backward to turn ON, forward to turn OFF)

MAIN FEATURES:
1. Front Button: "Where Am I" location feature - provides location information using voice guidance
2. Middle Button: 
   - Short press: Increases vibration intensity (when vibration is ON) OR increases volume (when voice is ON)
   - Long press (3+ seconds): Toggles vibration mode ON/OFF
3. Back Button:
   - Short press: Decreases vibration intensity (when vibration is ON) OR decreases volume (when voice is ON)
   - Long press (3+ seconds): Toggles voice/speak function ON/OFF

KEY FUNCTIONS:
- Vibration Mode: Provides tactile feedback for obstacle detection
- Voice Mode: Provides audio guidance and obstacle information
- Settings Memory: Device remembers the last active settings when turned off
- Obstacle Detection: Uses ultrasonic sensors to detect obstacles in front of the user

INSTRUCTIONS FOR RESPONSES:
- Answer questions clearly and helpfully
- Provide step-by-step instructions when relevant
- Use practical, actionable language
- Keep responses concise but complete (2-4 sentences normally, up to 6 for complex questions)
- Be friendly and supportive to blind/visually impaired users
- If asked about something not related to the device, politely explain the device's capabilities and redirect
- Use your full knowledge to infer answers - don't just repeat FAQ content
- Understand context from previous questions in the conversation
- Ask clarifying questions if the user's question is ambiguous

Remember: You are helping blind and visually impaired users, so be clear, patient, and thorough in your explanations.`

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4-turbo', // Use more capable model
          messages: [
            { role: 'system', content: systemMessage },
            ...this.conversationHistory,
          ],
          max_tokens: 300, // Increased from 150 for more comprehensive answers
          temperature: 0.8, // Slightly higher for better context understanding
          top_p: 0.9,
        }),
      })

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`)
      }

      const data = await response.json()
      const assistantMessage = data.choices[0].message.content

      // Add assistant response to conversation
      this.conversationHistory.push({
        role: 'assistant',
        content: assistantMessage,
      })

      // Keep only last 15 messages to maintain context (increased from 10)
      if (this.conversationHistory.length > 15) {
        this.conversationHistory = this.conversationHistory.slice(-15)
      }

      return assistantMessage
    } catch (error) {
      console.error('OpenAI API error:', error)
      
      // Fallback to better error message
      if (error.message.includes('401')) {
        throw new Error('API key is not valid. Please configure your OpenAI API key.')
      } else if (error.message.includes('429')) {
        throw new Error('Too many requests. Please wait a moment and try again.')
      } else if (error.message.includes('rate_limit')) {
        throw new Error('Rate limit exceeded. Please try again later.')
      }
      throw error
    }
  }

  /**
   * Clear conversation history
   */
  clearHistory() {
    this.conversationHistory = []
  }

  /**
   * Get conversation history
   */
  getHistory() {
    return this.conversationHistory
  }
}

export default new AIAssistantService()

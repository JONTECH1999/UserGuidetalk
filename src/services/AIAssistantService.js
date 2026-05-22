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
      return 'Please ask a question about the Blind Assistive Head Tech device.'
    }

    this.isProcessing = true

    try {
      // First try FAQ for faster response
      const faqAnswer = this.searchFAQ(userQuestion)
      if (faqAnswer) {
        return faqAnswer
      }

      // If API is configured, use AI
      if (this.isConfigured()) {
        return await this.getAIAnswer(userQuestion)
      }

      // Fallback response
      return 'I could not find an answer. Try asking about specific features like turning on the device, using voice commands, or charging the battery.'
    } catch (error) {
      console.error('Error getting answer:', error)
      return 'I encountered an error. Please try again or ask about a specific device feature.'
    } finally {
      this.isProcessing = false
    }
  }

  /**
   * Search FAQ for matching answer
   */
  searchFAQ(userQuestion) {
    const question = userQuestion.toLowerCase()

    for (const faqItem of faqContent) {
      const faqQuestion = faqItem.question.toLowerCase()
      // Check for keyword matches
      const questionWords = question.split(' ')
      const faqWords = faqQuestion.split(' ')

      let matches = 0
      for (const word of questionWords) {
        if (word.length > 3 && faqWords.some((fw) => fw.includes(word) || word.includes(fw))) {
          matches++
        }
      }

      if (matches >= 2) {
        return faqItem.answer
      }
    }

    return null
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

      // Build system message focused on accessibility
      const systemMessage = `You are a helpful assistant for the Blind Assistive Head Tech device. 
You are helping blind and visually impaired users understand how to use their device.
Keep your answers short and simple (2-3 sentences maximum).
Use clear, straightforward language.
Focus on practical instructions.
Be friendly and supportive.
If the question is not about the device, politely redirect to device-related topics.`

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: systemMessage },
            ...this.conversationHistory,
          ],
          max_tokens: 150,
          temperature: 0.7,
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

      // Keep only last 10 messages to manage token usage
      if (this.conversationHistory.length > 10) {
        this.conversationHistory = this.conversationHistory.slice(-10)
      }

      return assistantMessage
    } catch (error) {
      console.error('OpenAI API error:', error)
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

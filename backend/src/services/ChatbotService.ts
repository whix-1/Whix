import OpenAI from 'openai';
import { logger } from '../utils/logger';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export class ChatbotService {
  async chat(message: string, conversationHistory: any[] = []) {
    try {
      const messages = [
        {
          role: 'system' as const,
          content:
            'You are a helpful customer support chatbot for Whix VTU, a Nigerian fintech platform. Help users with questions about airtime, data, bills, wallet funding, and general account issues.',
        },
        ...conversationHistory,
        {
          role: 'user' as const,
          content: message,
        },
      ];

      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages,
        temperature: 0.7,
        max_tokens: 500,
      });

      return {
        success: true,
        reply:
          response.choices[0].message.content ||
          'Sorry, I could not process that request.',
      };
    } catch (error) {
      logger.error('Chatbot error:', error);
      return {
        success: false,
        reply: 'Sorry, there was an error. Please try again later.',
      };
    }
  }
}

import OpenAI from 'openai';
import { getPlaybook, UseCase, FormData } from '@samparka/playbooks';
import { z } from 'zod';

// ========================================
// 🔧 EASY LLM SWITCHING - Change this line only!
// ========================================
export const LLM_PROVIDER: 'deepseek' | 'openai' = (process.env.LLM_PROVIDER as 'deepseek' | 'openai') || 'deepseek';

// ========================================
// 🚫 DO NOT EDIT BELOW THIS LINE
// ========================================

// Get API key and configuration based on provider
const getLLMConfig = (): {
  apiKey: string | undefined;
  baseURL: string | undefined;
  model: string;
  name: string;
} => {
  if (LLM_PROVIDER === 'deepseek') {
    return {
      apiKey: process.env.DEEPSEEK_API_KEY,
      baseURL: 'https://api.deepseek.com',
      model: 'deepseek-chat',
      name: 'DeepSeek'
    };
  } else if (LLM_PROVIDER === 'openai') {
    return {
      apiKey: process.env.OPENAI_API_KEY,
      baseURL: undefined,
      model: 'gpt-3.5-turbo',
      name: 'OpenAI'
    };
  } else {
    throw new Error(`Unknown LLM provider: ${LLM_PROVIDER}. Use 'deepseek' or 'openai'`);
  }
};

const llmConfig = getLLMConfig();

const openai = new OpenAI({
  apiKey: llmConfig.apiKey,
  baseURL: llmConfig.baseURL,
});

// Check if LLM provider is available
export const isLLMAvailable = llmConfig.apiKey && llmConfig.apiKey !== 'your_api_key_here';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatResponse {
  message: string;
  isComplete: boolean;
  structuredData?: any;
  needsConfirmation?: boolean;
}

export class LLMService {
  private useCase: UseCase;
  private playbook: any;
  private conversationHistory: ChatMessage[] = [];

  constructor(useCase: UseCase) {
    this.useCase = useCase;
    this.playbook = getPlaybook(useCase);
    this.initializeConversation();
  }

  private initializeConversation() {
    // Add system message and examples
    this.conversationHistory = [
      {
        role: 'assistant',
        content: `Hello! I'm here to help you with your ${this.playbook.name.toLowerCase()}. ${this.playbook.description}`
      }
    ];
  }

  async processMessage(userMessage: string): Promise<ChatResponse> {
    this.conversationHistory.push({
      role: 'user',
      content: userMessage
    });

    try {
      const response = await openai.chat.completions.create({
        model: llmConfig.model,
        messages: [
          {
            role: 'system',
            content: this.playbook.systemPrompt
          },
          ...this.conversationHistory.slice(-10), // Keep last 10 messages for context
          {
            role: 'system',
            content: `Current conversation context: ${JSON.stringify(this.conversationHistory.slice(-5))}`
          }
        ],
        temperature: 0.7,
        max_tokens: 200,
      });

      const assistantMessage = response.choices[0]?.message?.content || 'I apologize, but I need more information.';
      
      this.conversationHistory.push({
        role: 'assistant',
        content: assistantMessage
      });

      // Check if we should try to extract structured data
      const structuredData = await this.tryExtractStructuredData();
      
      if (structuredData) {
        return {
          message: assistantMessage,
          isComplete: true,
          structuredData,
          needsConfirmation: true
        };
      }

      return {
        message: assistantMessage,
        isComplete: false
      };

    } catch (error) {
      console.error('LLM Error:', error);
      return {
        message: 'I apologize, but I\'m having trouble processing your request. Please try again.',
        isComplete: false
      };
    }
  }

  private async tryExtractStructuredData(): Promise<any | null> {
    try {
      // Try to extract structured data from the conversation
      const extractionPrompt = `Based on the conversation, extract the required information for a ${this.useCase} form. 
      Required fields: ${this.playbook.requiredFields.join(', ')}
      
      Return ONLY a valid JSON object with the extracted data, or null if not all required fields are present.
      
      Conversation: ${JSON.stringify(this.conversationHistory.slice(-10))}`;

      const response = await openai.chat.completions.create({
        model: llmConfig.model,
        messages: [
          {
            role: 'system',
            content: 'You are a data extraction assistant. Return only valid JSON or null.'
          },
          {
            role: 'user',
            content: extractionPrompt
          }
        ],
        temperature: 0.1,
        max_tokens: 500,
      });

      const extractedData = response.choices[0]?.message?.content;
      
      if (extractedData && extractedData !== 'null') {
        const parsed = JSON.parse(extractedData);
        
        // Validate with Zod schema
        const validation = this.playbook.schema.safeParse(parsed);
        
        if (validation.success) {
          return validation.data;
        }
      }

      return null;
    } catch (error) {
      console.error('Data extraction error:', error);
      return null;
    }
  }

  async confirmSubmission(data: any): Promise<boolean> {
    try {
      const validation = this.playbook.schema.safeParse(data);
      return validation.success;
    } catch (error) {
      console.error('Validation error:', error);
      return false;
    }
  }

  getConversationHistory(): ChatMessage[] {
    return this.conversationHistory;
  }

  generateSummary(): string {
    const lastMessages = this.conversationHistory.slice(-6);
    const userMessages = lastMessages.filter(m => m.role === 'user');
    const assistantMessages = lastMessages.filter(m => m.role === 'assistant');
    
    return `User asked about ${this.useCase.toLowerCase()}. Key points: ${userMessages.map(m => m.content.substring(0, 50)).join(', ')}`;
  }
}

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

// Lazy-loaded configuration
let llmConfig: ReturnType<typeof getLLMConfig> | null = null;
let openai: OpenAI | null = null;
let isLLMAvailable: boolean = false;

// Initialize LLM configuration
const initializeLLM = () => {
  if (llmConfig) return; // Already initialized
  
  llmConfig = getLLMConfig();
  
  // Check if LLM provider is available
  isLLMAvailable = Boolean(llmConfig.apiKey && llmConfig.apiKey !== 'your_api_key_here');

  // Initialize OpenAI client only if available
  if (isLLMAvailable) {
    openai = new OpenAI({
      apiKey: llmConfig.apiKey,
      baseURL: llmConfig.baseURL,
    });
  }
};

// Export function to check availability
export const getIsLLMAvailable = () => {
  initializeLLM();
  return isLLMAvailable;
};

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

  private getCollectedInformation(): string[] {
    const collected: string[] = [];
    const conversationText = this.conversationHistory.map(msg => msg.content).join(' ').toLowerCase();
    
    // Check for name
    if (conversationText.includes('name') && conversationText.includes('atom')) {
      collected.push('name (Atom)');
    }
    
    // Check for email
    if (conversationText.includes('email') && conversationText.includes('@')) {
      collected.push('email');
    }
    
    // Check for company
    if (conversationText.includes('company') && conversationText.includes('kribaat')) {
      collected.push('company (Kribaat Nepal)');
    }
    
    // Check for team size
    if (conversationText.includes('team') && (conversationText.includes('1-5') || conversationText.includes('4 people'))) {
      collected.push('team size');
    }
    
    // Check for problem statement
    if (conversationText.includes('problem') && conversationText.includes('llm')) {
      collected.push('problem statement');
    }
    
    // Check for budget
    if (conversationText.includes('budget') && conversationText.includes('50k')) {
      collected.push('budget');
    }
    
    // Check for urgency
    if (conversationText.includes('soon') && conversationText.includes('month')) {
      collected.push('urgency');
    }
    
    return collected;
  }

  async processMessage(userMessage: string): Promise<ChatResponse> {
    this.conversationHistory.push({
      role: 'user',
      content: userMessage
    });

    initializeLLM();
    if (!openai) {
      throw new Error('LLM service not available. Please check your API key configuration.');
    }

    try {
      // Create a summary of collected information
      const collectedInfo = this.getCollectedInformation();
      const contextMessage = collectedInfo.length > 0 
        ? `\n\nIMPORTANT: You have already collected this information: ${collectedInfo.join(', ')}. Do NOT ask for this information again.`
        : '';

      const response = await openai.chat.completions.create({
        model: llmConfig!.model,
        messages: [
          {
            role: 'system',
            content: this.playbook.systemPrompt + contextMessage
          },
          ...this.conversationHistory.slice(-10), // Keep last 10 messages for context
        ],
        temperature: 0.7,
        max_tokens: 200,
      });

      const assistantMessage = response.choices[0]?.message?.content || 'I apologize, but I need more information.';
      
      this.conversationHistory.push({
        role: 'assistant',
        content: assistantMessage
      });

      // Check if the assistant is indicating completion
      const isCompletionIndicated = assistantMessage.includes('CONFIRMATION_READY') || 
                                   assistantMessage.includes('I\'ve passed all your information') ||
                                   assistantMessage.includes('Someone will be in touch');

      // Check if we should try to extract structured data
      // Try extraction more aggressively - after every message once we have some data
      const structuredData = await this.tryExtractStructuredData();
      
      if (structuredData) {
        return {
          message: assistantMessage.replace('CONFIRMATION_READY', '').trim(),
          isComplete: true,
          structuredData,
          needsConfirmation: true
        };
      }

      // If completion is indicated but no structured data extracted, try one more time
      if (isCompletionIndicated) {
        console.log('Completion indicated, attempting final data extraction...');
        const finalExtraction = await this.tryExtractStructuredData();
        console.log('Final extraction result:', finalExtraction);
        if (finalExtraction) {
          console.log('Returning completed response with structured data');
          return {
            message: assistantMessage,
            isComplete: true,
            structuredData: finalExtraction,
            needsConfirmation: true
          };
        } else {
          console.log('Final extraction failed - no structured data returned');
        }
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
    if (!openai) {
      return null;
    }

    try {
      // Try to extract structured data from the conversation
      const extractionPrompt = `Based on the conversation, extract the required information for a ${this.useCase} form. 
      Required fields: ${this.playbook.requiredFields.join(', ')}
      
      IMPORTANT: Map values to the correct enum options:
      - For budgetBand: Map to one of: '<$5k', '$5k-$25k', '$25k-$100k', '>$100k', 'Not sure'
      - For urgency: Map to one of: 'ASAP', '2-4 weeks', 'Just browsing'
      - For teamSize: Map to one of: '<5', '5-20', '21-50', '51-200', '>200'
      
      CRITICAL: If you can extract ALL required fields from the conversation, return the JSON object. 
      If any field is missing or unclear, return null.
      
      Conversation: ${JSON.stringify(this.conversationHistory.slice(-10))}`;

      // Debug logging removed for production

      const response = await openai.chat.completions.create({
        model: llmConfig!.model,
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
      console.log('Raw extraction response:', extractedData);
      
      if (extractedData && extractedData !== 'null') {
        const parsed = JSON.parse(extractedData);
        console.log('Parsed structured data:', parsed);
        
        // Post-process to map values to correct enums
        const processedData = this.postProcessExtractedData(parsed);
        console.log('Processed structured data:', processedData);
        
        // Validate with Zod schema
        const validation = this.playbook.schema.safeParse(processedData);
        console.log('Validation result:', validation.success ? 'SUCCESS' : 'FAILED', validation.success ? validation.data : validation.error);
        
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

  private postProcessExtractedData(data: any): any {
    const processed = { ...data };

    // Map budget values
    if (processed.budgetBand) {
      const budget = processed.budgetBand.toLowerCase();
      if (budget.includes('50k') || budget.includes('npr')) {
        processed.budgetBand = '<$5k'; // Map 50K NPR to <$5k
      } else if (budget.includes('less than') || budget.includes('<')) {
        processed.budgetBand = '<$5k';
      } else if (budget.includes('around') || budget.includes('about')) {
        processed.budgetBand = '<$5k';
      }
    }

    // Map urgency values
    if (processed.urgency) {
      const urgency = processed.urgency.toLowerCase();
      if (urgency.includes('1-3 months') || urgency.includes('within 3 months') || urgency.includes('3 months')) {
        processed.urgency = '2-4 weeks'; // Map 1-3 months to 2-4 weeks
      } else if (urgency.includes('asap') || urgency.includes('immediately') || urgency.includes('urgent')) {
        processed.urgency = 'ASAP';
      } else if (urgency.includes('browsing') || urgency.includes('just looking')) {
        processed.urgency = 'Just browsing';
      }
    }

    // Map team size values
    if (processed.teamSize) {
      const teamSize = processed.teamSize.toLowerCase();
      if (teamSize.includes('1-5') || teamSize.includes('<5') || teamSize === '<5') {
        processed.teamSize = '1-5'; // Map to correct enum value
      } else if (teamSize.includes('5-20') || teamSize === '5-20') {
        processed.teamSize = '6-20'; // Map to correct enum value
      } else if (teamSize.includes('21-50')) {
        processed.teamSize = '21-50';
      } else if (teamSize.includes('51-200')) {
        processed.teamSize = '51-200';
      } else if (teamSize.includes('>200')) {
        processed.teamSize = '200+';
      }
    }

    return processed;
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

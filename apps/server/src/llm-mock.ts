import { UseCase, FormData } from '@samparka/playbooks';

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

export class MockLLMService {
  private useCase: UseCase;
  private conversationHistory: ChatMessage[] = [];
  private stepCount = 0;

  constructor(useCase: UseCase) {
    this.useCase = useCase;
    this.initializeConversation();
  }

  private initializeConversation() {
    this.conversationHistory = [
      {
        role: 'assistant',
        content: `Hello! I'm here to help you with your ${this.useCase.toLowerCase()} request. Let me gather some information from you.`
      }
    ];
  }

  async processMessage(userMessage: string): Promise<ChatResponse> {
    this.conversationHistory.push({
      role: 'user',
      content: userMessage
    });

    this.stepCount++;

    let response: string;
    let isComplete = false;
    let structuredData: any = null;

    // Simulate different conversation flows based on use case
    switch (this.useCase) {
      case 'SALES':
        response = this.getSalesResponse(this.stepCount, userMessage);
        if (this.stepCount >= 7) {
          isComplete = true;
          structuredData = this.generateMockSalesData();
        }
        break;
      
      case 'APPT':
        response = this.getAppointmentResponse(this.stepCount, userMessage);
        if (this.stepCount >= 6) {
          isComplete = true;
          structuredData = this.generateMockAppointmentData();
        }
        break;
      
      case 'SUPPORT':
        response = this.getSupportResponse(this.stepCount, userMessage);
        if (this.stepCount >= 5) {
          isComplete = true;
          structuredData = this.generateMockSupportData();
        }
        break;
      
      default:
        response = "I'm here to help! What can I assist you with?";
    }

    this.conversationHistory.push({
      role: 'assistant',
      content: response
    });

    return {
      message: response,
      isComplete,
      structuredData,
      needsConfirmation: isComplete
    };
  }

  private getSalesResponse(step: number, userMessage: string): string {
    const responses = [
      "What's your name?",
      "Great! What's your email address?",
      "Perfect! What company do you work for?",
      "Thanks! How many people are on your team? (1-5, 6-20, 21-50, 51-200, 200+)",
      "Got it! What problem are you trying to solve?",
      "What's your budget range? (<$5k, $5k-$25k, $25k-$100k, >$100k, Not sure)",
      "Finally, how urgent is this? (ASAP, 2-4 weeks, Just browsing)"
    ];
    
    return responses[step - 1] || "Thank you for all the information!";
  }

  private getAppointmentResponse(step: number, userMessage: string): string {
    const responses = [
      "What's your name?",
      "What's your email address?",
      "What type of service do you need?",
      "What's your preferred date?",
      "What time works best for you?",
      "Would you prefer in-person or online?"
    ];
    
    return responses[step - 1] || "Perfect! I have all the information I need.";
  }

  private getSupportResponse(step: number, userMessage: string): string {
    const responses = [
      "What's your email address?",
      "Which product area is having issues?",
      "How severe is this issue? (blocker, major, minor)",
      "Can you describe the problem in detail?",
      "What's your operating system and browser?"
    ];
    
    return responses[step - 1] || "Thank you for the detailed information!";
  }

  private generateMockSalesData() {
    return {
      name: "John Smith",
      email: "john@example.com",
      company: "TechCorp Inc",
      teamSize: "21-50",
      problemStatement: "We need better customer data management",
      budgetBand: "$25k-$100k",
      urgency: "ASAP"
    };
  }

  private generateMockAppointmentData() {
    return {
      name: "Sarah Johnson",
      email: "sarah@example.com",
      serviceType: "Brand Consultation",
      preferredDate: "2024-01-15",
      preferredTime: "2:00 PM",
      timezone: "EST",
      location: "online"
    };
  }

  private generateMockSupportData() {
    return {
      email: "support@example.com",
      productArea: "Dashboard",
      severity: "major",
      description: "Dashboard is showing incorrect data",
      environment: {
        os: "Windows 10",
        browser: "Chrome 120"
      }
    };
  }

  async confirmSubmission(data: any): Promise<boolean> {
    return true; // Mock always confirms
  }

  getConversationHistory(): ChatMessage[] {
    return this.conversationHistory;
  }

  generateSummary(): string {
    return `Mock ${this.useCase} conversation with ${this.stepCount} steps completed.`;
  }
}

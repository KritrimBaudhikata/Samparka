import './styles.css';
import { UseCase } from '@samparka/playbooks';

export interface WidgetConfig {
  apiUrl: string;
  useCase: UseCase;
  source: string;
  theme?: {
    primaryColor?: string;
    position?: 'bottom-right' | 'bottom-left';
  };
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export class SamparkaWidget {
  private config: WidgetConfig;
  private container!: HTMLElement;
  private button!: HTMLElement;
  private panel!: HTMLElement;
  private messages: ChatMessage[] = [];
  private sessionId: string;
  private isOpen: boolean = false;
  private isLoading: boolean = false;
  private isComplete: boolean = false;
  private structuredData: any = null;

  constructor(config: WidgetConfig) {
    this.config = config;
    this.sessionId = this.generateId();
    this.createWidget();
    this.attachEventListeners();
  }

  private generateId(): string {
    return 'samparka-' + Math.random().toString(36).substr(2, 9);
  }

  private createWidget(): void {
    // Create container
    this.container = document.createElement('div');
    this.container.className = 'samparka-widget';
    this.container.id = this.generateId();

    // Create button
    this.button = document.createElement('button');
    this.button.className = 'samparka-widget-button';
    this.button.innerHTML = '💬';
    this.button.setAttribute('aria-label', 'Open chat');

    // Create panel
    this.panel = this.createPanel();

    // Append to container
    this.container.appendChild(this.panel);
    this.container.appendChild(this.button);

    // Append to body
    document.body.appendChild(this.container);
  }

  private createPanel(): HTMLElement {
    const panel = document.createElement('div');
    panel.className = 'samparka-widget-panel';
    panel.style.display = 'none';

    // Header
    const header = document.createElement('div');
    header.className = 'samparka-widget-header';
    
    const title = document.createElement('h3');
    title.className = 'samparka-widget-title';
    title.textContent = 'AI Assistant';
    
    const closeButton = document.createElement('button');
    closeButton.className = 'samparka-widget-close';
    closeButton.innerHTML = '×';
    closeButton.setAttribute('aria-label', 'Close chat');
    
    header.appendChild(title);
    header.appendChild(closeButton);

    // Messages container
    const messagesContainer = document.createElement('div');
    messagesContainer.className = 'samparka-widget-messages';

    // Input container
    const inputContainer = document.createElement('div');
    inputContainer.className = 'samparka-widget-input';
    
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Type your message...';
    input.setAttribute('aria-label', 'Message input');
    
    const sendButton = document.createElement('button');
    sendButton.textContent = 'Send';
    sendButton.setAttribute('aria-label', 'Send message');
    
    inputContainer.appendChild(input);
    inputContainer.appendChild(sendButton);

    // Assemble panel
    panel.appendChild(header);
    panel.appendChild(messagesContainer);
    panel.appendChild(inputContainer);

    return panel;
  }

  private attachEventListeners(): void {
    // Button click
    this.button.addEventListener('click', () => {
      this.togglePanel();
    });

    // Close button
    const closeButton = this.panel.querySelector('.samparka-widget-close');
    closeButton?.addEventListener('click', () => {
      this.closePanel();
    });

    // Send button and input
    const input = this.panel.querySelector('input') as HTMLInputElement;
    const sendButton = this.panel.querySelector('button[aria-label="Send message"]') as HTMLButtonElement;

    const sendMessage = () => {
      const message = input.value.trim();
      if (message && !this.isLoading) {
        this.sendMessage(message);
        input.value = '';
      }
    };

    sendButton?.addEventListener('click', sendMessage);
    input?.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        sendMessage();
      }
    });
  }

  private togglePanel(): void {
    if (this.isOpen) {
      this.closePanel();
    } else {
      this.openPanel();
    }
  }

  private openPanel(): void {
    this.panel.style.display = 'block';
    this.isOpen = true;
    this.button.style.display = 'none';
    
    // Add welcome message if no messages
    if (this.messages.length === 0) {
      this.addMessage('assistant', 'Hello! I\'m here to help you. How can I assist you today?');
    }
  }

  private closePanel(): void {
    this.panel.style.display = 'none';
    this.isOpen = false;
    this.button.style.display = 'flex';
  }

  private addMessage(role: 'user' | 'assistant', content: string): void {
    const message: ChatMessage = {
      id: this.generateId(),
      role,
      content,
      timestamp: new Date(),
    };

    this.messages.push(message);
    this.renderMessages();
  }

  private renderMessages(): void {
    const messagesContainer = this.panel.querySelector('.samparka-widget-messages') as HTMLElement;
    messagesContainer.innerHTML = '';

    this.messages.forEach((message) => {
      const messageElement = this.createMessageElement(message);
      messagesContainer.appendChild(messageElement);
    });

    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  private createMessageElement(message: ChatMessage): HTMLElement {
    const messageDiv = document.createElement('div');
    messageDiv.className = `samparka-widget-message ${
      message.role === 'user' ? 'samparka-widget-message-user' : ''
    }`;

    const avatar = document.createElement('div');
    avatar.className = `samparka-widget-message-avatar ${
      message.role === 'user' 
        ? 'samparka-widget-message-avatar-user' 
        : 'samparka-widget-message-avatar-assistant'
    }`;
    avatar.textContent = message.role === 'user' ? 'U' : 'A';

    const content = document.createElement('div');
    content.className = `samparka-widget-message-content ${
      message.role === 'user' 
        ? 'samparka-widget-message-content-user' 
        : 'samparka-widget-message-content-assistant'
    }`;
    content.textContent = message.content;

    messageDiv.appendChild(avatar);
    messageDiv.appendChild(content);

    return messageDiv;
  }

  private async sendMessage(message: string): Promise<void> {
    this.addMessage('user', message);
    this.setLoading(true);

    try {
      const response = await fetch(`${this.config.apiUrl}/api/chat/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId: this.sessionId,
          useCase: this.config.useCase,
          message,
        }),
      });

      const data = await response.json();

      if (data.success) {
        this.addMessage('assistant', data.data.message);

        if (data.data.isComplete && data.data.structuredData) {
          this.structuredData = data.data.structuredData;
          this.isComplete = true;
          this.showConfirmation();
        }
      } else {
        this.addMessage('assistant', 'I apologize, but I encountered an error. Please try again.');
      }
    } catch (error) {
      console.error('Widget API error:', error);
      this.addMessage('assistant', 'I apologize, but I encountered an error. Please try again.');
    } finally {
      this.setLoading(false);
    }
  }

  private setLoading(loading: boolean): void {
    this.isLoading = loading;
    const input = this.panel.querySelector('input') as HTMLInputElement;
    const sendButton = this.panel.querySelector('button[aria-label="Send message"]') as HTMLButtonElement;

    if (loading) {
      input.disabled = true;
      sendButton.disabled = true;
      sendButton.textContent = 'Sending...';
      this.showLoadingMessage();
    } else {
      input.disabled = false;
      sendButton.disabled = false;
      sendButton.textContent = 'Send';
      this.hideLoadingMessage();
    }
  }

  private showLoadingMessage(): void {
    const messagesContainer = this.panel.querySelector('.samparka-widget-messages') as HTMLElement;
    
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'samparka-widget-loading';
    loadingDiv.innerHTML = `
      <div class="samparka-widget-loading-dots">
        <div class="samparka-widget-loading-dot"></div>
        <div class="samparka-widget-loading-dot"></div>
        <div class="samparka-widget-loading-dot"></div>
      </div>
      <span>AI is thinking...</span>
    `;
    loadingDiv.id = 'samparka-loading';

    messagesContainer.appendChild(loadingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  private hideLoadingMessage(): void {
    const loadingElement = document.getElementById('samparka-loading');
    loadingElement?.remove();
  }

  private showConfirmation(): void {
    const inputContainer = this.panel.querySelector('.samparka-widget-input') as HTMLElement;
    inputContainer.style.display = 'none';

    const confirmationDiv = document.createElement('div');
    confirmationDiv.className = 'samparka-widget-confirmation';
    confirmationDiv.innerHTML = `
      <h4 class="samparka-widget-confirmation-title">Please confirm your information:</h4>
      <div class="samparka-widget-confirmation-data">
        <pre>${JSON.stringify(this.structuredData, null, 2)}</pre>
      </div>
      <div class="samparka-widget-confirmation-buttons">
        <button class="samparka-widget-confirmation-button samparka-widget-confirmation-button-secondary" id="samparka-edit">
          Edit
        </button>
        <button class="samparka-widget-confirmation-button samparka-widget-confirmation-button-primary" id="samparka-submit">
          Submit
        </button>
      </div>
    `;

    this.panel.appendChild(confirmationDiv);

    // Add event listeners
    document.getElementById('samparka-edit')?.addEventListener('click', () => {
      this.isComplete = false;
      this.structuredData = null;
      confirmationDiv.remove();
      inputContainer.style.display = 'flex';
    });

    document.getElementById('samparka-submit')?.addEventListener('click', () => {
      this.submitForm();
    });
  }

  private async submitForm(): Promise<void> {
    try {
      // Confirm submission
      const confirmResponse = await fetch(`${this.config.apiUrl}/api/chat/confirm`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId: this.sessionId,
          data: this.structuredData,
        }),
      });

      const confirmData = await confirmResponse.json();

      if (confirmData.success) {
        // Create lead
        const leadResponse = await fetch(`${this.config.apiUrl}/api/leads`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            useCase: this.config.useCase,
            data: this.structuredData,
            source: this.config.source,
          }),
        });

        const leadData = await leadResponse.json();

        if (leadData.success) {
          this.showSuccess();
        } else {
          throw new Error(leadData.error || 'Failed to create lead');
        }
      } else {
        throw new Error(confirmData.error || 'Failed to confirm submission');
      }
    } catch (error) {
      console.error('Submission error:', error);
      this.addMessage('assistant', 'I apologize, but there was an error submitting your information. Please try again.');
    }
  }

  private showSuccess(): void {
    const confirmationDiv = this.panel.querySelector('.samparka-widget-confirmation') as HTMLElement;
    confirmationDiv.remove();

    const successDiv = document.createElement('div');
    successDiv.className = 'samparka-widget-success';
    successDiv.innerHTML = `
      <div class="samparka-widget-success-icon">✅</div>
      <p class="samparka-widget-success-message">
        Thank you! Your information has been submitted successfully. We'll get back to you soon!
      </p>
    `;

    this.panel.appendChild(successDiv);

    // Auto-close after 3 seconds
    setTimeout(() => {
      this.closePanel();
    }, 3000);
  }

  public destroy(): void {
    this.container.remove();
  }
}

// Global initialization function
declare global {
  interface Window {
    SamparkaWidget: typeof SamparkaWidget;
  }
}

window.SamparkaWidget = SamparkaWidget;

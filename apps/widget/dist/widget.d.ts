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
export declare class SamparkaWidget {
    private config;
    private container;
    private button;
    private panel;
    private messages;
    private sessionId;
    private isOpen;
    private isLoading;
    private isComplete;
    private structuredData;
    constructor(config: WidgetConfig);
    private generateId;
    private createWidget;
    private createPanel;
    private attachEventListeners;
    private togglePanel;
    private openPanel;
    private closePanel;
    private addMessage;
    private renderMessages;
    private createMessageElement;
    private sendMessage;
    private setLoading;
    private showLoadingMessage;
    private hideLoadingMessage;
    private showConfirmation;
    private submitForm;
    private showSuccess;
    destroy(): void;
}
declare global {
    interface Window {
        SamparkaWidget: typeof SamparkaWidget;
    }
}
//# sourceMappingURL=widget.d.ts.map
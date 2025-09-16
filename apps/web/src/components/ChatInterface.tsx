'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, CheckCircle, AlertCircle } from 'lucide-react';
import { apiClient, ChatRequest, ChatResponse } from '@/lib/api';
import { UseCase } from '@samparka/playbooks';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatInterfaceProps {
  useCase: UseCase;
  onComplete?: (data: any) => void;
}

export default function ChatInterface({ useCase, onComplete }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(() => crypto.randomUUID());
  const [isComplete, setIsComplete] = useState(false);
  const [structuredData, setStructuredData] = useState<any>(null);
  const [needsConfirmation, setNeedsConfirmation] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const request: ChatRequest = {
        sessionId,
        useCase,
        message: inputMessage,
      };

      const response: ChatResponse = await apiClient.chat(request);

      if (response.success) {
        const assistantMessage: ChatMessage = {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: response.data.message,
          timestamp: new Date(),
        };

        setMessages(prev => [...prev, assistantMessage]);

        if (response.data.isComplete && response.data.structuredData) {
          setStructuredData(response.data.structuredData);
          setNeedsConfirmation(response.data.needsConfirmation || false);
          setIsComplete(true);
        }
      } else {
        const errorMessage: ChatMessage = {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: 'I apologize, but I encountered an error. Please try again.',
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, errorMessage]);
      }
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: 'I apologize, but I encountered an error. Please try again.',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmSubmission = async () => {
    if (!structuredData) return;

    setIsLoading(true);

    try {
      const response = await apiClient.confirmSubmission({
        sessionId,
        data: structuredData,
      });

      if (response.success) {
        // Create the lead
        const leadResponse = await apiClient.createLead(useCase, structuredData);
        
        if (leadResponse.success) {
          const successMessage: ChatMessage = {
            id: crypto.randomUUID(),
            role: 'assistant',
            content: '✅ Thank you! Your information has been submitted successfully. We\'ll get back to you soon!',
            timestamp: new Date(),
          };
          setMessages(prev => [...prev, successMessage]);
          onComplete?.(structuredData);
        } else {
          throw new Error(leadResponse.error || 'Failed to create lead');
        }
      } else {
        throw new Error(response.error || 'Failed to confirm submission');
      }
    } catch (error) {
      console.error('Submission error:', error);
      const errorMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: 'I apologize, but there was an error submitting your information. Please try again.',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-lg">
      {/* Chat Header */}
      <div className="p-4 border-b border-gray-200 bg-gray-50 rounded-t-lg">
        <div className="flex items-center space-x-2">
          <Bot className="h-5 w-5 text-primary-600" />
          <h3 className="font-semibold text-gray-800">AI Assistant</h3>
          {isComplete && (
            <CheckCircle className="h-4 w-4 text-green-500" />
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            <Bot className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>Start a conversation to begin!</p>
          </div>
        )}
        
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`flex items-start space-x-2 max-w-xs lg:max-w-md ${
                message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
              }`}
            >
              <div className={`p-2 rounded-full ${
                message.role === 'user' 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {message.role === 'user' ? (
                  <User className="h-4 w-4" />
                ) : (
                  <Bot className="h-4 w-4" />
                )}
              </div>
              <div
                className={`px-4 py-2 rounded-lg ${
                  message.role === 'user'
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                <p className={`text-xs mt-1 ${
                  message.role === 'user' ? 'text-primary-100' : 'text-gray-500'
                }`}>
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex items-start space-x-2">
              <div className="p-2 rounded-full bg-gray-200 text-gray-600">
                <Bot className="h-4 w-4" />
              </div>
              <div className="px-4 py-2 rounded-lg bg-gray-100">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce loading-dot-1"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce loading-dot-2"></div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Confirmation Section */}
      {isComplete && structuredData && (
        <div className="p-4 border-t border-gray-200 bg-blue-50">
          <div className="flex items-start space-x-2">
            <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
            <div className="flex-1">
              <h4 className="font-medium text-blue-900 mb-2">Please confirm your information:</h4>
              <div className="bg-white p-3 rounded border text-sm">
                <pre className="whitespace-pre-wrap text-gray-700">
                  {JSON.stringify(structuredData, null, 2)}
                </pre>
              </div>
              <div className="flex space-x-2 mt-3">
                <button
                  onClick={handleConfirmSubmission}
                  disabled={isLoading}
                  className="btn-primary text-sm"
                >
                  {isLoading ? 'Submitting...' : 'Confirm & Submit'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Input */}
      {!isComplete && (
        <div className="p-4 border-t border-gray-200">
          <div className="flex space-x-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 input-field"
              disabled={isLoading}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isLoading}
              className="btn-primary px-3"
              aria-label="Send message"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

import { z } from 'zod';

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePhone(phone: string): boolean {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
}

export function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>]/g, '');
}

export function generateId(): string {
  return crypto.randomUUID();
}

export function formatDate(date: Date): string {
  return date.toISOString();
}

export function parseDate(dateString: string): Date {
  return new Date(dateString);
}

export function redactPII(text: string): string {
  // Simple PII redaction - in production, use more sophisticated methods
  return text
    .replace(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g, '[EMAIL]')
    .replace(/\b\d{4}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4}\b/g, '[CARD]')
    .replace(/\b\d{3}-\d{2}-\d{4}\b/g, '[SSN]');
}

export function extractTags(useCase: string, data: any): string[] {
  const tags: string[] = [];
  
  switch (useCase) {
    case 'SALES':
      if (data.teamSize && ['21-50', '51-200', '200+'].includes(data.teamSize)) {
        tags.push('priority');
      }
      if (data.urgency === 'ASAP') {
        tags.push('urgent');
      }
      if (data.problemStatement?.toLowerCase().includes('migration')) {
        tags.push('migration');
      }
      break;
      
    case 'APPT':
      if (data.serviceType?.toLowerCase().includes('urgent')) {
        tags.push('urgent');
      }
      break;
      
    case 'SUPPORT':
      if (data.severity === 'blocker') {
        tags.push('blocker');
      }
      if (data.severity === 'major') {
        tags.push('major');
      }
      break;
  }
  
  return tags;
}

export function createSlackMessage(useCase: string, data: any, tags: string[]): string {
  const emoji = {
    SALES: '💼',
    APPT: '📅',
    SUPPORT: '🆘'
  }[useCase] || '📝';
  
  const tagString = tags.length > 0 ? ` • ${tags.join(', ')}` : '';
  
  return `${emoji} New ${useCase} Lead${tagString}\n\n` +
         `**Email:** ${data.email}\n` +
         `**Created:** ${new Date().toLocaleString()}\n\n` +
         `[View in Inbox](${process.env.NEXT_PUBLIC_APP_URL}/inbox)`;
}

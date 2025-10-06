import { z } from 'zod';

// Base types
export const UseCase = z.enum(['SALES', 'APPT', 'SUPPORT']);
export type UseCase = z.infer<typeof UseCase>;

export const LeadStatus = z.enum(['NEW', 'SEEN', 'REPLIED']);
export type LeadStatus = z.infer<typeof LeadStatus>;

// Sales Inquiry Schema
export const SalesInquirySchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  company: z.string().min(1, "Company is required"),
  teamSize: z.enum(['1-5', '6-20', '21-50', '51-200', '200+']),
  problemStatement: z.string().min(10, "Please describe your problem (at least 10 characters)"),
  budgetBand: z.enum(['<$5k', '$5k-$25k', '$25k-$100k', '>$100k', 'Not sure']),
  urgency: z.enum(['ASAP', '2-4 weeks', 'Just browsing']),
});

export type SalesInquiry = z.infer<typeof SalesInquirySchema>;

// Service Appointment Schema
export const ServiceAppointmentSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  serviceType: z.string().min(1, "Service type is required"),
  preferredDate: z.string().min(1, "Preferred date is required"),
  preferredTime: z.string().min(1, "Preferred time is required"),
  timezone: z.string().min(1, "Timezone is required"),
  location: z.string().min(1, "Location is required"),
  notes: z.string().optional(),
});

export type ServiceAppointment = z.infer<typeof ServiceAppointmentSchema>;

// Support Ticket Schema
export const SupportTicketSchema = z.object({
  email: z.string().email("Valid email is required"),
  productArea: z.string().min(1, "Product area is required"),
  severity: z.enum(['blocker', 'major', 'minor']),
  description: z.string().min(10, "Please describe the issue (at least 10 characters)"),
  attachments: z.array(z.string().url()).optional(),
  environment: z.object({
    os: z.string().optional(),
    browser: z.string().optional(),
  }).optional(),
  reproductionSteps: z.string().optional(),
});

export type SupportTicket = z.infer<typeof SupportTicketSchema>;

// Union type for all form data
export const FormDataSchema = z.discriminatedUnion('useCase', [
  z.object({ useCase: z.literal('SALES'), data: SalesInquirySchema }),
  z.object({ useCase: z.literal('APPT'), data: ServiceAppointmentSchema }),
  z.object({ useCase: z.literal('SUPPORT'), data: SupportTicketSchema }),
]);

export type FormData = z.infer<typeof FormDataSchema>;

// Database models
export const LeadSchema = z.object({
  id: z.string().uuid(),
  useCase: UseCase,
  payload: z.record(z.any()),
  tags: z.array(z.string()),
  status: LeadStatus,
  createdAt: z.date(),
  source: z.string(),
});

export type Lead = z.infer<typeof LeadSchema>;

export const ConversationSchema = z.object({
  id: z.string().uuid(),
  leadId: z.string().uuid(),
  turns: z.array(z.object({
    role: z.enum(['user', 'assistant']),
    content: z.string(),
    timestamp: z.date(),
  })),
  modelSummary: z.string(),
});

export type Conversation = z.infer<typeof ConversationSchema>;

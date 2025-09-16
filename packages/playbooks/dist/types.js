"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversationSchema = exports.LeadSchema = exports.FormDataSchema = exports.SupportTicketSchema = exports.ServiceAppointmentSchema = exports.SalesInquirySchema = exports.LeadStatus = exports.UseCase = void 0;
const zod_1 = require("zod");
// Base types
exports.UseCase = zod_1.z.enum(['SALES', 'APPT', 'SUPPORT']);
exports.LeadStatus = zod_1.z.enum(['NEW', 'SEEN', 'REPLIED']);
// Sales Inquiry Schema
exports.SalesInquirySchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Name is required"),
    email: zod_1.z.string().email("Valid email is required"),
    company: zod_1.z.string().min(1, "Company is required"),
    teamSize: zod_1.z.enum(['1-5', '6-20', '21-50', '51-200', '200+']),
    problemStatement: zod_1.z.string().min(10, "Please describe your problem (at least 10 characters)"),
    budgetBand: zod_1.z.enum(['<$5k', '$5k-$25k', '$25k-$100k', '>$100k', 'Not sure']),
    urgency: zod_1.z.enum(['ASAP', '2-4 weeks', 'Just browsing']),
});
// Service Appointment Schema
exports.ServiceAppointmentSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Name is required"),
    email: zod_1.z.string().email("Valid email is required"),
    phone: zod_1.z.string().optional(),
    serviceType: zod_1.z.string().min(1, "Service type is required"),
    preferredDate: zod_1.z.string().min(1, "Preferred date is required"),
    preferredTime: zod_1.z.string().min(1, "Preferred time is required"),
    timezone: zod_1.z.string().min(1, "Timezone is required"),
    location: zod_1.z.enum(['in-person', 'online']),
    notes: zod_1.z.string().optional(),
});
// Support Ticket Schema
exports.SupportTicketSchema = zod_1.z.object({
    email: zod_1.z.string().email("Valid email is required"),
    productArea: zod_1.z.string().min(1, "Product area is required"),
    severity: zod_1.z.enum(['blocker', 'major', 'minor']),
    description: zod_1.z.string().min(10, "Please describe the issue (at least 10 characters)"),
    attachments: zod_1.z.array(zod_1.z.string().url()).optional(),
    environment: zod_1.z.object({
        os: zod_1.z.string().optional(),
        browser: zod_1.z.string().optional(),
    }).optional(),
    reproductionSteps: zod_1.z.string().optional(),
});
// Union type for all form data
exports.FormDataSchema = zod_1.z.discriminatedUnion('useCase', [
    zod_1.z.object({ useCase: zod_1.z.literal('SALES'), data: exports.SalesInquirySchema }),
    zod_1.z.object({ useCase: zod_1.z.literal('APPT'), data: exports.ServiceAppointmentSchema }),
    zod_1.z.object({ useCase: zod_1.z.literal('SUPPORT'), data: exports.SupportTicketSchema }),
]);
// Database models
exports.LeadSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    useCase: exports.UseCase,
    payload: zod_1.z.record(zod_1.z.any()),
    tags: zod_1.z.array(zod_1.z.string()),
    status: exports.LeadStatus,
    createdAt: zod_1.z.date(),
    source: zod_1.z.string(),
});
exports.ConversationSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    leadId: zod_1.z.string().uuid(),
    turns: zod_1.z.array(zod_1.z.object({
        role: zod_1.z.enum(['user', 'assistant']),
        content: zod_1.z.string(),
        timestamp: zod_1.z.date(),
    })),
    modelSummary: zod_1.z.string(),
});
//# sourceMappingURL=types.js.map
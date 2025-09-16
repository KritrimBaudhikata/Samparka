"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEmail = validateEmail;
exports.validatePhone = validatePhone;
exports.sanitizeInput = sanitizeInput;
exports.generateId = generateId;
exports.formatDate = formatDate;
exports.parseDate = parseDate;
exports.redactPII = redactPII;
exports.extractTags = extractTags;
exports.createSlackMessage = createSlackMessage;
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
function validatePhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
}
function sanitizeInput(input) {
    return input.trim().replace(/[<>]/g, '');
}
function generateId() {
    return crypto.randomUUID();
}
function formatDate(date) {
    return date.toISOString();
}
function parseDate(dateString) {
    return new Date(dateString);
}
function redactPII(text) {
    // Simple PII redaction - in production, use more sophisticated methods
    return text
        .replace(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g, '[EMAIL]')
        .replace(/\b\d{4}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4}\b/g, '[CARD]')
        .replace(/\b\d{3}-\d{2}-\d{4}\b/g, '[SSN]');
}
function extractTags(useCase, data) {
    const tags = [];
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
function createSlackMessage(useCase, data, tags) {
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
//# sourceMappingURL=utils.js.map
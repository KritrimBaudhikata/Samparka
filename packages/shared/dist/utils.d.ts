export declare function validateEmail(email: string): boolean;
export declare function validatePhone(phone: string): boolean;
export declare function sanitizeInput(input: string): string;
export declare function generateId(): string;
export declare function formatDate(date: Date): string;
export declare function parseDate(dateString: string): Date;
export declare function redactPII(text: string): string;
export declare function extractTags(useCase: string, data: any): string[];
export declare function createSlackMessage(useCase: string, data: any, tags: string[]): string;
//# sourceMappingURL=utils.d.ts.map
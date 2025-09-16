import { z } from 'zod';
export declare const UseCase: z.ZodEnum<["SALES", "APPT", "SUPPORT"]>;
export type UseCase = z.infer<typeof UseCase>;
export declare const LeadStatus: z.ZodEnum<["NEW", "SEEN", "REPLIED"]>;
export type LeadStatus = z.infer<typeof LeadStatus>;
export declare const SalesInquirySchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    company: z.ZodString;
    teamSize: z.ZodEnum<["1-5", "6-20", "21-50", "51-200", "200+"]>;
    problemStatement: z.ZodString;
    budgetBand: z.ZodEnum<["<$5k", "$5k-$25k", "$25k-$100k", ">$100k", "Not sure"]>;
    urgency: z.ZodEnum<["ASAP", "2-4 weeks", "Just browsing"]>;
}, "strip", z.ZodTypeAny, {
    name: string;
    email: string;
    company: string;
    teamSize: "1-5" | "6-20" | "21-50" | "51-200" | "200+";
    problemStatement: string;
    budgetBand: "<$5k" | "$5k-$25k" | "$25k-$100k" | ">$100k" | "Not sure";
    urgency: "ASAP" | "2-4 weeks" | "Just browsing";
}, {
    name: string;
    email: string;
    company: string;
    teamSize: "1-5" | "6-20" | "21-50" | "51-200" | "200+";
    problemStatement: string;
    budgetBand: "<$5k" | "$5k-$25k" | "$25k-$100k" | ">$100k" | "Not sure";
    urgency: "ASAP" | "2-4 weeks" | "Just browsing";
}>;
export type SalesInquiry = z.infer<typeof SalesInquirySchema>;
export declare const ServiceAppointmentSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    phone: z.ZodOptional<z.ZodString>;
    serviceType: z.ZodString;
    preferredDate: z.ZodString;
    preferredTime: z.ZodString;
    timezone: z.ZodString;
    location: z.ZodEnum<["in-person", "online"]>;
    notes: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name: string;
    email: string;
    serviceType: string;
    preferredDate: string;
    preferredTime: string;
    timezone: string;
    location: "in-person" | "online";
    phone?: string | undefined;
    notes?: string | undefined;
}, {
    name: string;
    email: string;
    serviceType: string;
    preferredDate: string;
    preferredTime: string;
    timezone: string;
    location: "in-person" | "online";
    phone?: string | undefined;
    notes?: string | undefined;
}>;
export type ServiceAppointment = z.infer<typeof ServiceAppointmentSchema>;
export declare const SupportTicketSchema: z.ZodObject<{
    email: z.ZodString;
    productArea: z.ZodString;
    severity: z.ZodEnum<["blocker", "major", "minor"]>;
    description: z.ZodString;
    attachments: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    environment: z.ZodOptional<z.ZodObject<{
        os: z.ZodOptional<z.ZodString>;
        browser: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        os?: string | undefined;
        browser?: string | undefined;
    }, {
        os?: string | undefined;
        browser?: string | undefined;
    }>>;
    reproductionSteps: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    email: string;
    productArea: string;
    severity: "blocker" | "major" | "minor";
    description: string;
    attachments?: string[] | undefined;
    environment?: {
        os?: string | undefined;
        browser?: string | undefined;
    } | undefined;
    reproductionSteps?: string | undefined;
}, {
    email: string;
    productArea: string;
    severity: "blocker" | "major" | "minor";
    description: string;
    attachments?: string[] | undefined;
    environment?: {
        os?: string | undefined;
        browser?: string | undefined;
    } | undefined;
    reproductionSteps?: string | undefined;
}>;
export type SupportTicket = z.infer<typeof SupportTicketSchema>;
export declare const FormDataSchema: z.ZodDiscriminatedUnion<"useCase", [z.ZodObject<{
    useCase: z.ZodLiteral<"SALES">;
    data: z.ZodObject<{
        name: z.ZodString;
        email: z.ZodString;
        company: z.ZodString;
        teamSize: z.ZodEnum<["1-5", "6-20", "21-50", "51-200", "200+"]>;
        problemStatement: z.ZodString;
        budgetBand: z.ZodEnum<["<$5k", "$5k-$25k", "$25k-$100k", ">$100k", "Not sure"]>;
        urgency: z.ZodEnum<["ASAP", "2-4 weeks", "Just browsing"]>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        email: string;
        company: string;
        teamSize: "1-5" | "6-20" | "21-50" | "51-200" | "200+";
        problemStatement: string;
        budgetBand: "<$5k" | "$5k-$25k" | "$25k-$100k" | ">$100k" | "Not sure";
        urgency: "ASAP" | "2-4 weeks" | "Just browsing";
    }, {
        name: string;
        email: string;
        company: string;
        teamSize: "1-5" | "6-20" | "21-50" | "51-200" | "200+";
        problemStatement: string;
        budgetBand: "<$5k" | "$5k-$25k" | "$25k-$100k" | ">$100k" | "Not sure";
        urgency: "ASAP" | "2-4 weeks" | "Just browsing";
    }>;
}, "strip", z.ZodTypeAny, {
    useCase: "SALES";
    data: {
        name: string;
        email: string;
        company: string;
        teamSize: "1-5" | "6-20" | "21-50" | "51-200" | "200+";
        problemStatement: string;
        budgetBand: "<$5k" | "$5k-$25k" | "$25k-$100k" | ">$100k" | "Not sure";
        urgency: "ASAP" | "2-4 weeks" | "Just browsing";
    };
}, {
    useCase: "SALES";
    data: {
        name: string;
        email: string;
        company: string;
        teamSize: "1-5" | "6-20" | "21-50" | "51-200" | "200+";
        problemStatement: string;
        budgetBand: "<$5k" | "$5k-$25k" | "$25k-$100k" | ">$100k" | "Not sure";
        urgency: "ASAP" | "2-4 weeks" | "Just browsing";
    };
}>, z.ZodObject<{
    useCase: z.ZodLiteral<"APPT">;
    data: z.ZodObject<{
        name: z.ZodString;
        email: z.ZodString;
        phone: z.ZodOptional<z.ZodString>;
        serviceType: z.ZodString;
        preferredDate: z.ZodString;
        preferredTime: z.ZodString;
        timezone: z.ZodString;
        location: z.ZodEnum<["in-person", "online"]>;
        notes: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        email: string;
        serviceType: string;
        preferredDate: string;
        preferredTime: string;
        timezone: string;
        location: "in-person" | "online";
        phone?: string | undefined;
        notes?: string | undefined;
    }, {
        name: string;
        email: string;
        serviceType: string;
        preferredDate: string;
        preferredTime: string;
        timezone: string;
        location: "in-person" | "online";
        phone?: string | undefined;
        notes?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    useCase: "APPT";
    data: {
        name: string;
        email: string;
        serviceType: string;
        preferredDate: string;
        preferredTime: string;
        timezone: string;
        location: "in-person" | "online";
        phone?: string | undefined;
        notes?: string | undefined;
    };
}, {
    useCase: "APPT";
    data: {
        name: string;
        email: string;
        serviceType: string;
        preferredDate: string;
        preferredTime: string;
        timezone: string;
        location: "in-person" | "online";
        phone?: string | undefined;
        notes?: string | undefined;
    };
}>, z.ZodObject<{
    useCase: z.ZodLiteral<"SUPPORT">;
    data: z.ZodObject<{
        email: z.ZodString;
        productArea: z.ZodString;
        severity: z.ZodEnum<["blocker", "major", "minor"]>;
        description: z.ZodString;
        attachments: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        environment: z.ZodOptional<z.ZodObject<{
            os: z.ZodOptional<z.ZodString>;
            browser: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            os?: string | undefined;
            browser?: string | undefined;
        }, {
            os?: string | undefined;
            browser?: string | undefined;
        }>>;
        reproductionSteps: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        email: string;
        productArea: string;
        severity: "blocker" | "major" | "minor";
        description: string;
        attachments?: string[] | undefined;
        environment?: {
            os?: string | undefined;
            browser?: string | undefined;
        } | undefined;
        reproductionSteps?: string | undefined;
    }, {
        email: string;
        productArea: string;
        severity: "blocker" | "major" | "minor";
        description: string;
        attachments?: string[] | undefined;
        environment?: {
            os?: string | undefined;
            browser?: string | undefined;
        } | undefined;
        reproductionSteps?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    useCase: "SUPPORT";
    data: {
        email: string;
        productArea: string;
        severity: "blocker" | "major" | "minor";
        description: string;
        attachments?: string[] | undefined;
        environment?: {
            os?: string | undefined;
            browser?: string | undefined;
        } | undefined;
        reproductionSteps?: string | undefined;
    };
}, {
    useCase: "SUPPORT";
    data: {
        email: string;
        productArea: string;
        severity: "blocker" | "major" | "minor";
        description: string;
        attachments?: string[] | undefined;
        environment?: {
            os?: string | undefined;
            browser?: string | undefined;
        } | undefined;
        reproductionSteps?: string | undefined;
    };
}>]>;
export type FormData = z.infer<typeof FormDataSchema>;
export declare const LeadSchema: z.ZodObject<{
    id: z.ZodString;
    useCase: z.ZodEnum<["SALES", "APPT", "SUPPORT"]>;
    payload: z.ZodRecord<z.ZodString, z.ZodAny>;
    tags: z.ZodArray<z.ZodString, "many">;
    status: z.ZodEnum<["NEW", "SEEN", "REPLIED"]>;
    createdAt: z.ZodDate;
    source: z.ZodString;
}, "strip", z.ZodTypeAny, {
    status: "NEW" | "SEEN" | "REPLIED";
    useCase: "SALES" | "APPT" | "SUPPORT";
    id: string;
    payload: Record<string, any>;
    tags: string[];
    createdAt: Date;
    source: string;
}, {
    status: "NEW" | "SEEN" | "REPLIED";
    useCase: "SALES" | "APPT" | "SUPPORT";
    id: string;
    payload: Record<string, any>;
    tags: string[];
    createdAt: Date;
    source: string;
}>;
export type Lead = z.infer<typeof LeadSchema>;
export declare const ConversationSchema: z.ZodObject<{
    id: z.ZodString;
    leadId: z.ZodString;
    turns: z.ZodArray<z.ZodObject<{
        role: z.ZodEnum<["user", "assistant"]>;
        content: z.ZodString;
        timestamp: z.ZodDate;
    }, "strip", z.ZodTypeAny, {
        role: "user" | "assistant";
        content: string;
        timestamp: Date;
    }, {
        role: "user" | "assistant";
        content: string;
        timestamp: Date;
    }>, "many">;
    modelSummary: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    leadId: string;
    turns: {
        role: "user" | "assistant";
        content: string;
        timestamp: Date;
    }[];
    modelSummary: string;
}, {
    id: string;
    leadId: string;
    turns: {
        role: "user" | "assistant";
        content: string;
        timestamp: Date;
    }[];
    modelSummary: string;
}>;
export type Conversation = z.infer<typeof ConversationSchema>;
//# sourceMappingURL=types.d.ts.map
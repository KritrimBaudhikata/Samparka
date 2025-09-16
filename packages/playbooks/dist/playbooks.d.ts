import { UseCase } from './types';
export interface Playbook {
    useCase: UseCase;
    name: string;
    description: string;
    systemPrompt: string;
    schema: any;
    requiredFields: string[];
    optionalFields: string[];
    examples: {
        user: string;
        assistant: string;
    }[];
}
export declare const playbooks: Record<UseCase, Playbook>;
export declare function getPlaybook(useCase: UseCase): Playbook;
//# sourceMappingURL=playbooks.d.ts.map
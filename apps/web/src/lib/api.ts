const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export interface ChatRequest {
  sessionId: string;
  useCase: 'SALES' | 'APPT' | 'SUPPORT';
  message: string;
}

export interface ChatResponse {
  success: boolean;
  data: {
    message: string;
    isComplete: boolean;
    structuredData?: any;
    needsConfirmation?: boolean;
  };
  error?: string;
}

export interface ConfirmRequest {
  sessionId: string;
  data: any;
}

export interface Lead {
  id: string;
  useCase: string;
  payload: any;
  tags: string[];
  status: string;
  createdAt: string;
  source: string;
  conversations?: Array<{
    modelSummary: string;
    createdAt: string;
  }>;
}

export interface LeadsResponse {
  success: boolean;
  data: {
    leads: Lead[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      pages: number;
    };
  };
  error?: string;
}

export class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  async chat(request: ChatRequest): Promise<ChatResponse> {
    const response = await fetch(`${this.baseUrl}/api/chat/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    return response.json();
  }

  async confirmSubmission(request: ConfirmRequest): Promise<{ success: boolean; message?: string; error?: string }> {
    const response = await fetch(`${this.baseUrl}/api/chat/confirm`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    return response.json();
  }

  async createLead(useCase: string, data: any, source: string = 'demo'): Promise<{ success: boolean; data?: { leadId: string; message: string }; error?: string }> {
    const response = await fetch(`${this.baseUrl}/api/leads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ useCase, data, source }),
    });

    return response.json();
  }

  async getLeads(page: number = 1, limit: number = 20, filters?: { useCase?: string; status?: string; search?: string }): Promise<LeadsResponse> {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    // Only add filter parameters if they have actual values
    if (filters?.useCase) {
      params.append('useCase', filters.useCase);
    }
    if (filters?.status) {
      params.append('status', filters.status);
    }
    if (filters?.search) {
      params.append('search', filters.search);
    }

    const response = await fetch(`${this.baseUrl}/api/leads?${params}`);
    return response.json();
  }

  async updateLeadStatus(leadId: string, status: string): Promise<{ success: boolean; data?: Lead; error?: string }> {
    const response = await fetch(`${this.baseUrl}/api/leads/${leadId}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });

    return response.json();
  }

  async exportLeads(): Promise<Blob> {
    const response = await fetch(`${this.baseUrl}/api/leads/export/csv`);
    return response.blob();
  }
}

export const apiClient = new ApiClient();

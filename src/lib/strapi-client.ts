/**
 * Strapi SDK Client Configuration
 *
 * Type-safe client for consuming Strapi API
 */

interface StrapiConfig {
  baseURL: string;
  apiToken?: string;
}

class StrapiClient {
  private baseURL: string;
  private apiToken?: string;

  constructor(config: StrapiConfig) {
    this.baseURL = config.baseURL;
    this.apiToken = config.apiToken;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    };

    if (this.apiToken) {
      headers['Authorization'] = `Bearer ${this.apiToken}`;
    }

    const response = await fetch(`${this.baseURL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`Strapi API Error: ${response.statusText}`);
    }

    return response.json() as Promise<T>;
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async put<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }

  clinic = {
    find: () => this.get('/api/clinics'),
    findOne: (id: string) => this.get(`/api/clinics/${id}`),
    create: (data: any) => this.post('/api/clinics', { data }),
    update: (id: string, data: any) => this.put(`/api/clinics/${id}`, { data }),
    delete: (id: string) => this.delete(`/api/clinics/${id}`),
  };

  supplier = {
    find: () => this.get('/api/suppliers'),
    findOne: (id: string) => this.get(`/api/suppliers/${id}`),
    create: (data: any) => this.post('/api/suppliers', { data }),
    update: (id: string, data: any) => this.put(`/api/suppliers/${id}`, { data }),
    delete: (id: string) => this.delete(`/api/suppliers/${id}`),
  };

  product = {
    find: () => this.get('/api/products'),
    findOne: (id: string) => this.get(`/api/products/${id}`),
    create: (data: any) => this.post('/api/products', { data }),
    update: (id: string, data: any) => this.put(`/api/products/${id}`, { data }),
    delete: (id: string) => this.delete(`/api/products/${id}`),
  };

  order = {
    find: () => this.get('/api/orders'),
    findOne: (id: string) => this.get(`/api/orders/${id}`),
    create: (data: any) => this.post('/api/orders', { data }),
    update: (id: string, data: any) => this.put(`/api/orders/${id}`, { data }),
    delete: (id: string) => this.delete(`/api/orders/${id}`),
  };

  inventoryItem = {
    find: () => this.get('/api/inventory-items'),
    findOne: (id: string) => this.get(`/api/inventory-items/${id}`),
    create: (data: any) => this.post('/api/inventory-items', { data }),
    update: (id: string, data: any) => this.put(`/api/inventory-items/${id}`, { data }),
    delete: (id: string) => this.delete(`/api/inventory-items/${id}`),
  };

  transaction = {
    find: () => this.get('/api/transactions'),
    findOne: (id: string) => this.get(`/api/transactions/${id}`),
    create: (data: any) => this.post('/api/transactions', { data }),
    update: (id: string, data: any) => this.put(`/api/transactions/${id}`, { data }),
    delete: (id: string) => this.delete(`/api/transactions/${id}`),
  };

  appointment = {
    find: () => this.get('/api/appointments'),
    findOne: (id: string) => this.get(`/api/appointments/${id}`),
    create: (data: any) => this.post('/api/appointments', { data }),
    update: (id: string, data: any) => this.put(`/api/appointments/${id}`, { data }),
    delete: (id: string) => this.delete(`/api/appointments/${id}`),
  };

  accountPayable = {
    find: () => this.get('/api/accounts-payable'),
    findOne: (id: string) => this.get(`/api/accounts-payable/${id}`),
    create: (data: any) => this.post('/api/accounts-payable', { data }),
    update: (id: string, data: any) => this.put(`/api/accounts-payable/${id}`, { data }),
    delete: (id: string) => this.delete(`/api/accounts-payable/${id}`),
  };

  accountReceivable = {
    find: () => this.get('/api/accounts-receivable'),
    findOne: (id: string) => this.get(`/api/accounts-receivable/${id}`),
    create: (data: any) => this.post('/api/accounts-receivable', { data }),
    update: (id: string, data: any) => this.put(`/api/accounts-receivable/${id}`, { data }),
    delete: (id: string) => this.delete(`/api/accounts-receivable/${id}`),
  };

  auth = {
    login: (identifier: string, password: string) =>
      this.post('/api/auth/local', { identifier, password }),
    register: (username: string, email: string, password: string) =>
      this.post('/api/auth/local/register', { username, email, password }),
    me: () => this.get('/api/users/me?populate=clinic'),
  };
}

// Production client
export const strapiProduction = new StrapiClient({
  baseURL: 'https://strapi-production-593be.up.railway.app',
});

// Development client
export const strapiDevelopment = new StrapiClient({
  baseURL: 'http://localhost:1337',
});

// Default export (uses environment variable)
export const strapi = new StrapiClient({
  baseURL: process.env.STRAPI_URL || 'http://localhost:1337',
});

export default strapi;

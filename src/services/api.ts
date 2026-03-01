// src/services/api.ts
const API_BASE_URL = 'https://eassy-to-rent-backend.onrender.com';

// Try different possible endpoint patterns
const ENDPOINTS = {
  // Try these common patterns
  LOGIN: '/api/auth/login',     // Your current attempt
  LOGIN_ALT1: '/api/login',      // Alternative 1
  LOGIN_ALT2: '/auth/login',     // Alternative 2
  LOGIN_ALT3: '/api/users/login', // Alternative 3
  LOGIN_ALT4: '/login',           // Alternative 4
  
  REGISTER: '/api/auth/register',
  REGISTER_ALT1: '/api/register',
  REGISTER_ALT2: '/auth/register',
  
  USER: '/api/auth/me',
  USER_ALT1: '/api/user',
  USER_ALT2: '/auth/me',
}

export class ApiService {
  private token: string | null = null;
  private baseURL: string;

  constructor() {
    this.baseURL = API_BASE_URL;
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('auth_token', token);
  }

  getToken(): string | null {
    if (!this.token) {
      this.token = localStorage.getItem('auth_token');
    }
    return this.token;
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem('auth_token');
  }

  // Generic request method
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const token = this.getToken();

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
      ...options.headers,
    };

    console.log('Making request to:', url); // For debugging

    const config: RequestInit = {
      ...options,
      headers,
      mode: 'cors', // Important for CORS
      credentials: 'include', // Include cookies if needed
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        console.error('API Error Response:', data); // For debugging
        throw new Error(data.message || data.error || 'Request failed');
      }

      return data as T;
    } catch (error) {
      console.error('API Request Error:', error);
      throw error;
    }
  }

  // Try multiple endpoints for login
  async login(credentials: { email: string; password: string }) {
    const endpoints = [
      '/api/auth/login',
      '/api/login',
      '/auth/login', 
      '/api/users/login',
      '/login'
    ];

    let lastError = null;

    // Try each endpoint until one works
    for (const endpoint of endpoints) {
      try {
        console.log(`Trying login endpoint: ${endpoint}`);
        const response = await this.request<any>(endpoint, {
          method: 'POST',
          body: JSON.stringify(credentials),
        });

        // Check different response structures
        if (response.token || response.data?.token || response.access_token) {
          const token = response.token || response.data?.token || response.access_token;
          const user = response.user || response.data?.user || response.data;
          
          this.setToken(token);
          
          return {
            success: true,
            data: {
              token,
              user: user || { email: credentials.email }
            }
          };
        }
        
        // If we got here but no token, maybe structure is different
        if (response.success || response.status === 'success') {
          return {
            success: true,
            data: response.data || response
          };
        }

        lastError = new Error('Invalid response structure');
      } catch (error) {
        console.log(`Endpoint ${endpoint} failed:`, error);
        lastError = error;
        // Continue to next endpoint
      }
    }

    // If all endpoints failed
    throw lastError || new Error('Login failed on all endpoints');
  }

  // Test endpoint to check API structure
  async testConnection() {
    const testEndpoints = [
      '/api/health',
      '/health',
      '/api/test',
      '/'
    ];

    for (const endpoint of testEndpoints) {
      try {
        const response = await fetch(`${this.baseURL}${endpoint}`);
        if (response.ok) {
          const data = await response.json();
          console.log(`API test successful at ${endpoint}:`, data);
          return { success: true, endpoint, data };
        }
      } catch (error) {
        console.log(`Test endpoint ${endpoint} failed`);
      }
    }
    
    return { success: false, message: 'Could not connect to API' };
  }
}

export const api = new ApiService();
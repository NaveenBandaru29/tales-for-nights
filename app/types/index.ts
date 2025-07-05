export interface Tale {
  _id: string;
  title: string;
  description: string;
  content: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}
export interface Tag {
  value: string;
  label: string;
}
export interface User {
  id: string;
  username: string;
  password: string; // This would be hashed
  isAdmin: boolean;
}

// For API responses
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Simplified form states
export interface TaleFormData {
  title: string;
  description: string;
  content: string;
  tags: string[]
}

export interface LoginFormData {
  username: string;
  password: string;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  query?: string;
}

export interface PaginatedResponse {
  data: Tale[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
  success: boolean;
}
export interface Raw {
  _id: string;
  content: string;
  pinned: boolean;
  tags: string[]
  createdAt: string;
  updatedAt: string;
}

export interface RawFormData {
  content: string;
  pinned: boolean
  tags: string[]
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  query?: string;
}

export interface PaginatedResponse {
  data: Raw[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
  success: boolean;
}
export interface Charm {
    _id: string;
    content: string;
    pinned: boolean;
    tags: string[]
    createdAt: string;
    updatedAt: string;
}
export interface CharmFormData {
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
    data: Charm[];
    pagination: {
        total: number;
        page: number;
        limit: number;
        pages: number;
    };
    success: boolean;
}
export interface News {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface CreateNewsRequest {
  title: string;
  description: string;
}

export interface UpdateNewsRequest {
  title?: string;
  description?: string;
}

export interface ListNewsFilters {
  page?: number;
  limit?: number;
  title?: string;
  description?: string;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface ListNewsResponse {
  data: News[];
  meta: PaginationMeta;
}


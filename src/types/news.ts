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


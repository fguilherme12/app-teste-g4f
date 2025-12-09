import { api } from '@/lib/http';
import type {
  News,
  CreateNewsRequest,
  UpdateNewsRequest,
  ListNewsFilters,
  ListNewsResponse,
} from '@/types/news';

export class NewsService {
  public static async list(filters?: ListNewsFilters): Promise<ListNewsResponse> {
    const params = new URLSearchParams();
    
    if (filters?.page) params.append('page', filters.page.toString());
    if (filters?.limit) params.append('limit', filters.limit.toString());
    if (filters?.title) params.append('title', filters.title);
    if (filters?.description) params.append('description', filters.description);

    const queryString = params.toString();
    const url = queryString ? `/news?${queryString}` : '/news';
    
    const response = await api.get<ListNewsResponse>(url);
    return response.data;
  }

  public static async getById(id: string): Promise<News> {
    const response = await api.get<News>(`/news/${id}`);
    return response.data;
  }

  public static async create(data: CreateNewsRequest): Promise<News> {
    const response = await api.post<News>('/news', data);
    return response.data;
  }

  public static async update(id: string, data: UpdateNewsRequest): Promise<News> {
    const response = await api.put<News>(`/news/${id}`, data);
    return response.data;
  }

  public static async delete(id: string): Promise<void> {
    await api.delete(`/news/${id}`);
  }
}


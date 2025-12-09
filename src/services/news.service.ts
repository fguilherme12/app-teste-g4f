import { api } from '@/lib/http';
import type { News, CreateNewsRequest, UpdateNewsRequest } from '@/types/news';

export class NewsService {
  public static async list(): Promise<News[]> {
    const response = await api.get<News[]>('/news');
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


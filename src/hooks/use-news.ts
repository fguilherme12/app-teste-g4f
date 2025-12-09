import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { NewsService } from '@/services/news.service';
import type {
  CreateNewsRequest,
  UpdateNewsRequest,
  ListNewsFilters,
} from '@/types/news';
import { toast } from 'sonner';

export function useNews(filters?: ListNewsFilters) {
  return useQuery({
    queryKey: ['news', filters],
    queryFn: () => NewsService.list(filters),
  });
}

export function useNewsById(id: string) {
  return useQuery({
    queryKey: ['news', id],
    queryFn: () => NewsService.getById(id),
    enabled: !!id,
  });
}

export function useCreateNews() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateNewsRequest) => NewsService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['news'] });
      toast.success('Notícia criada com sucesso!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Erro ao criar notícia');
    },
  });
}

export function useUpdateNews() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateNewsRequest }) =>
      NewsService.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['news'] });
      queryClient.invalidateQueries({ queryKey: ['news', variables.id] });
      toast.success('Notícia atualizada com sucesso!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Erro ao atualizar notícia');
    },
  });
}

export function useDeleteNews() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => NewsService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['news'] });
      toast.success('Notícia deletada com sucesso!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Erro ao deletar notícia');
    },
  });
}


'use client';

import { useState, useEffect } from 'react';
import { useNews, useDeleteNews } from '@/hooks/use-news';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';
import Link from 'next/link';
import { Trash2, Edit, Plus, Newspaper, Search, ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { ListNewsFilters } from '@/types/news';

export default function NewsPageContent() {
  const [filters, setFilters] = useState<ListNewsFilters>({
    page: 1,
    limit: 10,
  });
  const [titleFilter, setTitleFilter] = useState('');
  const [descriptionFilter, setDescriptionFilter] = useState('');

  const { data, isLoading } = useNews(filters);
  const { mutate: deleteNews, isPending: isDeleting } = useDeleteNews();

  useEffect(() => {
    const timer = setTimeout(() => {
      setFilters((prev) => ({
        ...prev,
        page: 1,
        title: titleFilter || undefined,
        description: descriptionFilter || undefined,
      }));
    }, 500);

    return () => clearTimeout(timer);
  }, [titleFilter, descriptionFilter]);

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Tem certeza que deseja deletar a notícia "${title}"?`)) {
      deleteNews(id);
    }
  };

  const handlePageChange = (newPage: number) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLimitChange = (newLimit: number) => {
    setFilters((prev) => ({ ...prev, limit: newLimit, page: 1 }));
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner />
      </div>
    );
  }

  const news = data?.data || [];
  const meta = data?.meta;

  return (
    <div className="container mx-auto p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Newspaper className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-3xl font-bold">Notícias</h1>
          </div>
          <Link href="/news/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nova Notícia
            </Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Search className="h-5 w-5" />
              Filtros
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="title-filter" className="text-sm font-medium mb-1 block">
                  Filtrar por Título
                </label>
                <div className="relative">
                  <Input
                    id="title-filter"
                    type="text"
                    placeholder="Digite o título..."
                    value={titleFilter}
                    onChange={(e) => setTitleFilter(e.target.value)}
                    className="pr-10"
                  />
                  {titleFilter && (
                    <button
                      type="button"
                      onClick={() => setTitleFilter('')}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      aria-label="Limpar filtro de título"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
              <div>
                <label htmlFor="description-filter" className="text-sm font-medium mb-1 block">
                  Filtrar por Descrição
                </label>
                <div className="relative">
                  <Input
                    id="description-filter"
                    type="text"
                    placeholder="Digite a descrição..."
                    value={descriptionFilter}
                    onChange={(e) => setDescriptionFilter(e.target.value)}
                    className="pr-10"
                  />
                  {descriptionFilter && (
                    <button
                      type="button"
                      onClick={() => setDescriptionFilter('')}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      aria-label="Limpar filtro de descrição"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {news.map((item) => (
            <Card key={item.id} className="flex flex-col">
              <CardHeader>
                <CardTitle className="text-lg line-clamp-2">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <p className="text-sm text-muted-foreground line-clamp-3 mb-4 flex-1">
                  {item.description}
                </p>
                <div className="flex gap-2 pt-2 border-t">
                  <Link href={`/news/${item.id}/edit`} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full">
                      <Edit className="mr-2 h-4 w-4" />
                      Editar
                    </Button>
                  </Link>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(item.id, item.title)}
                    disabled={isDeleting}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {news.length === 0 && (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              Nenhuma notícia encontrada
            </CardContent>
          </Card>
        )}

        {meta && (
          <Card>
            <CardContent className="py-4">
              <div className="flex flex-wrap items-center justify-center gap-4">
                <div className="flex items-center gap-2">
                  <select
                    value={filters.limit || 10}
                    onChange={(e) => handleLimitChange(Number(e.target.value))}
                    className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm min-w-[120px]"
                  >
                    <option value={10}>10 por página</option>
                    <option value={20}>20 por página</option>
                    <option value={30}>30 por página</option>
                    <option value={50}>50 por página</option>
                  </select>
                </div>

                <div className="flex items-center gap-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(meta.page - 1)}
                    disabled={!meta.hasPrev}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>

                  <div className="px-3 py-2 text-sm min-w-[60px] text-center">
                    {meta.page} / {meta.totalPages}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(meta.page + 1)}
                    disabled={!meta.hasNext}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}


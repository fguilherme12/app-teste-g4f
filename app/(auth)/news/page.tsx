'use client';

import { useNews, useDeleteNews } from '@/hooks/use-news';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';
import { toast } from 'sonner';
import Link from 'next/link';
import { Trash2, Edit, Plus, Newspaper } from 'lucide-react';

export default function NewsPage() {
  const { data: news, isLoading } = useNews();
  const { mutate: deleteNews, isPending: isDeleting } = useDeleteNews();

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Tem certeza que deseja deletar a notícia "${title}"?`)) {
      deleteNews(id);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner />
      </div>
    );
  }

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

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {news?.map((item) => (
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

        {news && news.length === 0 && (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              Nenhuma notícia encontrada
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}


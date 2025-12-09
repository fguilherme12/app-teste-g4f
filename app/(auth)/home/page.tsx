'use client';

import { useAuth } from '@/contexts/auth.context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { MapPin, Newspaper } from 'lucide-react';

export default function HomePage() {
  const { user } = useAuth();
  const router = useRouter();

  return (
    <div className="container mx-auto p-6">
      <div className="mx-auto max-w-4xl space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Bem-vindo!</h1>
          {user && (
            <p className="text-muted-foreground">
              Olá, {user.name}! Este é seu painel.
            </p>
          )}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card className="cursor-pointer hover:border-primary transition-colors" onClick={() => router.push('/cep')}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Busca de CEP
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Consulte endereços por CEP
              </p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:border-primary transition-colors" onClick={() => router.push('/news')}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Newspaper className="h-5 w-5" />
                Notícias
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Gerencie as notícias do sistema
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}


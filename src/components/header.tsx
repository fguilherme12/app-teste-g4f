'use client';

import { useAuth } from '@/contexts/auth.context';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';
import { toast } from 'sonner';
import Image from 'next/image';
import Link from 'next/link';

export function Header() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
    toast.success('Logout realizado com sucesso!');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto p-6">
        <div className="mx-auto max-w-6xl flex h-16 items-center justify-between">
          <Link href="/home" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Image
              src="/g4f-logo.jpeg"
              alt="G4F Logo"
              width={40}
              height={40}
              className="rounded-lg"
            />
            <span className="text-xl font-bold hidden sm:inline">G4F</span>
          </Link>

          <div className="flex items-center gap-4">
            {user && (
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </div>
            )}
            <Button variant="outline" size="sm" onClick={handleLogout} className="gap-2">
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Sair</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}


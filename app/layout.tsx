import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import './globals.css';
import { ReactQueryProvider } from '@/providers/react-query-provider';
import { AuthProvider } from '@/contexts/auth.context';
import { Toaster } from 'sonner';

export const metadata: Metadata = {
  title: 'Teste G4F',
  description: 'Sistema de gerenciamento de usuários',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" className="dark">
      <body className="bg-background text-foreground">
        <ReactQueryProvider>
          <AuthProvider>
            {children}
            <Toaster position="top-right" theme="dark" richColors closeButton />
          </AuthProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}



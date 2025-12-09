import type { ReactNode } from 'react';
import { AuthGuard } from '@/components/auth-guard';
import { Header } from '@/components/header';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <AuthGuard>
      <div className="min-h-screen">
        <Header />
        <main>{children}</main>
      </div>
    </AuthGuard>
  );
}



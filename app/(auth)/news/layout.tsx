import { Suspense, type ReactNode } from 'react';
import { Spinner } from '@/components/ui/spinner';

function NewsLoadingFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Spinner />
    </div>
  );
}

export default function NewsLayout({ children }: { children: ReactNode }) {
  return <Suspense fallback={<NewsLoadingFallback />}>{children}</Suspense>;
}


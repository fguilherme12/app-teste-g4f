'use client';

import dynamic from 'next/dynamic';
import { Spinner } from '@/components/ui/spinner';


const NewsPageContent = dynamic(() => import('./news-page-content'), {
  loading: () => (
    <div className="flex min-h-screen items-center justify-center">
      <Spinner />
    </div>
  ),
  ssr: false,
});

export default function NewsPage() {
  return <NewsPageContent />;
}


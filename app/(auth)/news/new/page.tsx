'use client';

import dynamic from 'next/dynamic';
import { Spinner } from '@/components/ui/spinner';

const NewNewsPageContent = dynamic(() => import('./new-news-page-content'), {
  loading: () => (
    <div className="flex min-h-screen items-center justify-center">
      <Spinner />
    </div>
  ),
  ssr: false,
});

export default function NewNewsPage() {
  return <NewNewsPageContent />;
}


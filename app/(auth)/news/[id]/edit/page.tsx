'use client';

import dynamic from 'next/dynamic';
import { Spinner } from '@/components/ui/spinner';

const EditNewsPageContent = dynamic(() => import('./edit-news-page-content'), {
  loading: () => (
    <div className="flex min-h-screen items-center justify-center">
      <Spinner />
    </div>
  ),
  ssr: false,
});

export default function EditNewsPage() {
  return <EditNewsPageContent />;
}


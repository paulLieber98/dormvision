'use client';

import InspirationGallery from '@/app/components/InspirationGallery';
import RouteGuard from '@/components/RouteGuard';

export default function InspirationPage() {
  return (
    <RouteGuard>
      <div className="min-h-screen bg-slate-900">
        <div className="container mx-auto px-4 py-8">
          <InspirationGallery />
        </div>
      </div>
    </RouteGuard>
  );
}

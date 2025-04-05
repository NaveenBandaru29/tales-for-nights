
// app/tales/[id]/page.tsx
'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import dynamic from 'next/dynamic';
// import TaleDetail from '@/app/components/tales/TaleDetail';
const TaleDetail = dynamic(()=>import('@/app/components/tales/TaleDetail'))

export default function TaleDetailPage() {
  const params = useParams();
  const id = params.id as string;  

  return (
    <div className="container mx-auto px-2 sm:px-4 py-8">
      <div className="mb-6">
        <Link href="/" className="text-blue-600 hover:underline">
          ← Back to all tales
        </Link>
      </div>
      
      <TaleDetail id={id} />
    </div>
  );
}

// app/admin/edit/[id]/page.tsx
'use client';

import TaleForm from '../../../components/tales/TaleForm';
// import { useGetTaleByIdQuery, useUpdateTaleMutation } from '../../../store/apis/talesApi';
import { useParams/* , useRouter */ } from 'next/navigation';
// import { TaleFormData } from '../../../types';
import Link from 'next/link';
import AuthGuard from '@/app/components/auth/AuthGuard';

export default function EditTalePage() {
  const params = useParams();
  const id = params.id as string;
  // const router = useRouter();

  return (
    <AuthGuard requireAdmin>
      <div className="container mx-auto p-4">
        {/* <div className="mb-6">
          <Link href="/admin" className="text-blue-600 hover:underline">
            ← Back to dashboard
          </Link>
        </div> */}

        <TaleForm
          id={id}
          isEdit
        />
      </div>
    </AuthGuard>
  );
}

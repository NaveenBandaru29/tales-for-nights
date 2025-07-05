
// app/admin/create/page.tsx

import TaleForm from '../../components/tales/TaleForm';
// import { useCreateTaleMutation } from '../../store/apis/talesApi';
import Link from 'next/link';
import AuthGuard from '@/app/components/auth/AuthGuard';

export default function CreateTalePage() {
  // const [createTale, { isLoading, error }] = useCreateTaleMutation();
  // const router = useRouter();

  // const handleSubmit = async (formData: TaleFormData) => {
  //   try {
  //     await createTale(formData).unwrap();
  //     router.push('/admin');
  //   } catch (err) {
  //     console.error('Failed to create tale:', err);
  //   }
  // };

  return (
    <AuthGuard requireAdmin>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/admin" className="text-blue-600 hover:underline">
            ← Back to dashboard
          </Link>
        </div>

        {/* <h1 className="text-3xl font-bold mb-8">Create New Tale</h1> */}

        {/* {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
            <p>Error: Failed to create tale. Please try again.</p>
          </div>
        )} */}

        <TaleForm />
      </div>
    </AuthGuard>
  );
}

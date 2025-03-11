
// components/tales/TaleDetail.tsx
'use client';

import { useGetTaleByIdQuery } from '../../store/apis/talesApi';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import Link from 'next/link';

interface TaleDetailProps {
  id: string;
}

export default function TaleDetail({ id }: TaleDetailProps) {
  const { data: tale, isLoading, error } = useGetTaleByIdQuery(id);
  const { user } = useSelector((state: RootState) => state.auth);
  const isAdmin = user?.isAdmin;

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
        <p className="mt-2 text-gray-600">Loading tale...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 text-red-700 p-4 rounded-md">
        Failed to load the tale. Please try again later.
      </div>
    );
  }

  if (!tale) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Tale not found.</p>
        <Link href="/" className="mt-4 text-blue-600 hover:underline block">
          Return to homepage
        </Link>
      </div>
    );
  }

  const formattedDate = new Date(tale.createdAt).toLocaleDateString();

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-4 text-gray-900">{tale.title}</h1>
        
        <div className="text-sm text-gray-500 mb-6">
          Created at: {formattedDate}
        </div>
        
        <div className="bg-gray-50 p-6 rounded-md mb-8">
          <h2 className="text-xl font-semibold mb-2 text-gray-800">Description</h2>
          <p className="text-gray-700">{tale.description}</p>
        </div>
        
        <div className="prose max-w-none">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Tale</h2>
          <pre className="whitespace-pre-line text-gray-700 font-sans">
            {tale.content}
          </pre>
        </div>
      </div>
      
      <div className="px-8 py-4 bg-gray-50 flex justify-between">
        <Link href="/" className="text-blue-600 hover:underline">
          Back to all tales
        </Link>
        
        {isAdmin && (
          <Link 
            href={`/admin/edit/${tale._id}`}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Edit Tale
          </Link>
        )}
      </div>
    </div>
  );
}


// components/tales/TalesList.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGetTalesQuery, useDeleteTaleMutation } from '../../store/apis/talesApi';
import TaleCard from './TaleCard';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Tale } from '@/app/types';
import { Loader } from '../ui/Loader';

export default function TalesList() {
  const { data: tales = [], isLoading, error } = useGetTalesQuery();
  const [deleteTale] = useDeleteTaleMutation();
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state.auth);
  const isAdmin = user?.isAdmin;
  
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const handleEdit = (id: string) => {
    router.push(`/admin/edit/${id}`);
  };

  const handleDelete = async (id: string) => {
    if (deleteConfirm === id) {
      try {
        await deleteTale(id).unwrap();
        setDeleteConfirm(null);
      } catch (error) {
        console.error('Failed to delete tale:', error);
      }
    } else {
      setDeleteConfirm(id);
    }
  };

  if (isLoading) {
    return (
      <Loader loadingText='Loading Tales...' />
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 text-red-700 p-4 rounded-md">
        Failed to load tales. Please try again later.
      </div>
    );
  }

  if (tales.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">No tales found.</p>
        {isAdmin && (
          <button
            onClick={() => router.push('/admin/create')}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Create your first tale
          </button>
        )}
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tales.map((tale:Tale) => (
        <div key={tale._id} className="relative">
          {deleteConfirm === tale._id && (
            <div className="absolute inset-0 bg-white bg-opacity-90 flex flex-col items-center justify-center z-10 rounded-lg shadow-md">
              <p className="text-center mb-4">Are you sure you want to delete this tale?</p>
              <div className="flex space-x-4">
                <button
                  onClick={() => handleDelete(tale._id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Yes, Delete
                </button>
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
          
          <TaleCard
            tale={tale}
            onEdit={isAdmin ? () => handleEdit(tale._id) : undefined}
            onDelete={isAdmin ? () => handleDelete(tale._id) : undefined}
          />
        </div>
      ))}
    </div>
  );
}

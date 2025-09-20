'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGetTalesQuery, useDeleteTaleMutation } from '../../store/apis/talesApi';
import TaleCard from './TaleCard';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { PaginationParams, Tale } from '@/app/types';
import { Loader } from '../ui/Loader';
import Paginator from '../ui/Paginator';

export default function TalesList() {
  const [searchParams, setSearchParams] = useState<PaginationParams>({
    query: "",
    page: 1,
    limit: 10,
  });
  const { data, isLoading, error } = useGetTalesQuery(searchParams);
  const tales = data?.data || [];
  const totalPages = data?.pagination?.pages || 1;
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

  const handlePageChange = (e: any, page: number) => {
    setSearchParams((prev: any) => ({
      ...prev,
      page,
    }));
  };

  if (isLoading) {
    return (
      <Loader loadingText='Loading Tales...' />
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100 p-4 rounded-md shadow-md">
        <p>Failed to load tales. Please try again later.</p>
        <p className="mt-2 text-sm">Error details: {JSON.stringify(error)}</p>
      </div>
    );
  }

  if (tales.length === 0) {
    return (
      <div className="text-center py-16 px-4">
        <p className="text-xl font-semibold text-gray-500 dark:text-gray-400">No tales found.</p>
        {isAdmin && (
          <button
            onClick={() => router.push('/admin/create')}
            className="mt-6 px-6 py-3 bg-blue-600 dark:bg-blue-700 text-white rounded-lg shadow-md hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-200"
          >
            Create your first tale
          </button>
        )}
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tales.map((tale: Tale) => (
          <div key={tale._id} className="relative transition-transform duration-300 hover:scale-[1.02]">
            {deleteConfirm === tale._id && (
              <div className="absolute inset-0 bg-white dark:bg-gray-900 bg-opacity-90 dark:bg-opacity-90 flex flex-col items-center justify-center z-10 rounded-lg shadow-xl backdrop-blur-sm p-4">
                <p className="text-center mb-4 text-gray-900 dark:text-gray-100 font-semibold">
                  Are you sure you want to delete this tale?
                </p>
                <div className="flex space-x-4">
                  <button
                    onClick={() => handleDelete(tale._id)}
                    className="px-5 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200"
                  >
                    Yes, Delete
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(null)}
                    className="px-5 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors duration-200"
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
      {totalPages > 1 && (
        <div className="mt-12 flex justify-center">
          <Paginator count={totalPages} onChange={handlePageChange} page={searchParams.page || 1} />
        </div>
      )}
    </>
  );
}
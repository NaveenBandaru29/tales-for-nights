// app/admin/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import AuthGuard from '../components/auth/AuthGuard';
import { useGetTalesQuery, useDeleteTaleMutation } from '../store/apis/talesApi';
import { logout } from '../store/slices/authSlice';
import { Tale } from '../types';

export default function AdminPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const { data: tales, isLoading, isError,refetch } = useGetTalesQuery();
  const [deleteTale, { isLoading: isDeleting }] = useDeleteTaleMutation();
  const [selectedTale, setSelectedTale] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  useEffect(() => {
    refetch()
  }, [refetch]);

  // const handleLogout = () => {
  //   dispatch(logout());
  //   router.push('/');
  // };

  const handleDelete = async () => {
    if (selectedTale) {
      try {
        await deleteTale(selectedTale).unwrap();
        setShowDeleteModal(false);
        setSelectedTale(null);
      } catch (error) {
        console.error('Failed to delete tale:', error);
      }
    }
  };

  const openDeleteModal = (id: string) => {
    setSelectedTale(id);
    setShowDeleteModal(true);
  };

  return (
    <AuthGuard requireAdmin>
      <div className="min-h-screen bg-gray-50">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Manage Tales</h2>
            <Link
              href="/admin/create"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Add New Tale
            </Link>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : isError ? (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
              Error loading tales. Please try again.
            </div>
          ) : tales && tales.length > 0 ? (
            <>
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {tales.slice(0,2).map((tale) => (
                  <li key={tale._id}>
                    <div className="px-6 py-4 flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center">
                          <h3 className="text-lg font-medium text-gray-900 truncate">{tale.title}</h3>
                        </div>
                        <p className="mt-1 text-sm text-gray-500 truncate">{tale.description}</p>
                        <p className="mt-1 text-xs text-gray-400">
                          Last updated: {new Date(tale.updatedAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex space-x-2 flex-col gap-2 sm:flex-row">
                        <Link
                          href={`/tales/${tale._id}`}
                          className="w-20 text-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          View
                        </Link>
                        <Link
                          href={`/admin/edit/${tale._id}`}
                          className="w-20 text-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => openDeleteModal(tale._id)}
                          className="w-20 text-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className='text-right p-2'>
            <Link href={"/"} className='text-blue-600 font-semibold hover:text-blue-400'>See More Tales</Link>
            </div>
            </>
          ) : (
            <div className="bg-white shadow overflow-hidden sm:rounded-md p-6 text-center">
              <p className="text-gray-500">No tales available. Create your first tale!</p>
            </div>
          )}
        </main>

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Confirm Delete</h3>
              <p className="text-sm text-gray-500 mb-6">
                Are you sure you want to delete this tale? This action cannot be undone.
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  {isDeleting ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AuthGuard>
  );
}
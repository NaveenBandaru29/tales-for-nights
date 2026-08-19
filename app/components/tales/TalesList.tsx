'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGetAllTalesQuery } from '@/app/hooks/queries/useTalesQuery';
import { useDeleteTaleMutation } from '@/app/hooks/mutations/useTalesMutation';
import TaleCard from './TaleCard';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { PaginationParams, Tale } from '@/app/types';
import { TalesListSkeleton } from '../ui/Loader';
import Paginator from '../ui/Paginator';
import { motion, AnimatePresence } from 'framer-motion';
import { WarningAmberRounded, AutoStoriesOutlined } from '@mui/icons-material';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut' as const,
    },
  },
};

export default function TalesList() {
  const [searchParams, setSearchParams] = useState<PaginationParams>({
    query: "",
    page: 1,
    limit: 10,
  });
  const { data, isLoading, error, isFetching } = useGetAllTalesQuery(searchParams);
  const tales = data?.data || [];
  const totalPages = data?.pagination?.pages || 1;
  const { mutateAsync: deleteTale } = useDeleteTaleMutation();
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
        await deleteTale(id);
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

  if (isLoading || isFetching) {
    return <TalesListSkeleton count={6} />;
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/60 text-red-700 dark:text-red-200 p-6 rounded-2xl shadow-sm text-center">
        <p className="font-semibold text-lg">Failed to load tales.</p>
        <p className="mt-1 text-sm text-red-500 dark:text-red-400">Please check your connection and try again later.</p>
      </div>
    );
  }

  if (tales.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-20 px-4 bg-gray-50/50 dark:bg-slate-900/30 rounded-3xl border border-dashed border-gray-200 dark:border-gray-800"
      >
        <AutoStoriesOutlined sx={{ fontSize: 48, color: '#94a3b8', mb: 2 }} />
        <p className="text-2xl font-bold text-gray-700 dark:text-gray-300">No tales found</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 max-w-sm mx-auto">
          It looks quiet here. Check back soon for new stories.
        </p>
        {isAdmin && (
          <button
            onClick={() => router.push('/admin/create')}
            className="mt-6 px-6 py-2.5 bg-blue-600 dark:bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-500/20 hover:bg-blue-700 hover:shadow-blue-500/30 transition-all duration-200 font-medium text-sm"
          >
            Create First Tale
          </button>
        )}
      </motion.div>
    );
  }

  return (
    <>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {tales.map((tale: Tale) => (
          <motion.div
            key={tale._id}
            variants={cardItemVariants}
            className="relative h-full"
          >
            <AnimatePresence>
              {deleteConfirm === tale._id && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="absolute inset-0 bg-white/95 dark:bg-slate-900/95 z-20 rounded-2xl shadow-2xl backdrop-blur-md p-6 flex flex-col items-center justify-center border border-red-200/50 dark:border-red-900/50"
                >
                  <WarningAmberRounded sx={{ fontSize: 44, color: '#ef4444', mb: 1.5 }} />
                  <p className="text-center mb-5 text-gray-900 dark:text-gray-100 font-semibold text-sm">
                    Are you sure you want to delete this tale?
                  </p>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleDelete(tale._id)}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-xl shadow-md transition-colors"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(null)}
                      className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 text-xs font-semibold rounded-xl transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <TaleCard
              tale={tale}
              onEdit={isAdmin ? () => handleEdit(tale._id) : undefined}
              onDelete={isAdmin ? () => handleDelete(tale._id) : undefined}
            />
          </motion.div>
        ))}
      </motion.div>

      {totalPages > 1 && (
        <div className="mt-12 flex justify-center">
          <Paginator count={totalPages} onChange={handlePageChange} page={searchParams.page || 1} />
        </div>
      )}
    </>
  );
}

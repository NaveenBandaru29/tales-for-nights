'use client';

import Link from 'next/link';
import { Tale } from '../../types';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { formatDate } from '@/app/utils/helpers';
import HashTagIcon from '@/public/Icons/HashTagIcon';
import { Chip, ButtonBase, Button } from '@mui/material';

interface TaleCardProps {
  tale: Tale;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function TaleCard({ tale, onEdit, onDelete }: TaleCardProps) {
  const { user } = useSelector((state: RootState) => state.auth);
  const isAdmin = user?.isAdmin;

  const truncatedDescription = tale.description.length > 150
    ? `${tale.description.substring(0, 150)}...`
    : tale.description;

  return (
    <div className={`
      bg-white dark:bg-gray-800 rounded-lg shadow-md
      overflow-hidden transition-all duration-300
      hover:shadow-xl dark:hover:shadow-2xl
      flex flex-col h-full
      ${!isAdmin && "select-none"}
    `}>
      <ButtonBase
        component={Link}
        href={`/tales/${tale._id}`}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          textAlign: 'left',
          width: '100%',
          flexGrow: 1,
          padding: { xs: 2, sm: 3 }, // Adjust padding with MUI sx prop
        }}
      >
        <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100 line-clamp-2">
          {tale.title}
        </h3>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-3 sm:mb-4 line-clamp-3">
          {truncatedDescription}
        </p>
        <div className="flex justify-end w-full text-xs sm:text-sm text-gray-500 dark:text-gray-400">
          <span>{formatDate(tale?.createdAt)}</span>
        </div>
        <div className="flex items-center gap-2 sm:gap-4 mt-4 w-full">
          {tale.tags.length > 0 && (
            <span className="text-blue-600 dark:text-blue-400 text-xl">
              <HashTagIcon />
            </span>
          )}
          <div className="flex gap-2 sm:gap-2 flex-wrap">
            {tale.tags.map((tagLabel: string, index: number) => (
              <Chip
                label={tagLabel}
                key={tagLabel + index}
                onClick={() => { }}
                size="small"
                sx={{
                  bgcolor: 'rgba(29, 78, 216, 0.1) !important',
                  color: '#1d4ed8 !important',
                  '.dark &': {
                    bgcolor: 'rgba(59, 130, 246, 0.1) !important',
                    color: '#3b82f6 !important',
                  },
                }}
              />
            ))}
          </div>
        </div>
      </ButtonBase>

      {isAdmin && (
        <div className="px-6 py-3 bg-gray-50 dark:bg-gray-900/50 flex justify-end space-x-2 border-t border-gray-200 dark:border-gray-700">
          {onEdit && (
            <Button
              color='primary'
              onClick={(e) => { e.preventDefault(); onEdit(); }}
              // className="px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white text-sm rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-200"
              aria-label="Edit tale"
            >
              Edit
            </Button>
          )}

          {onDelete && (
            <Button
              color='error'
              onClick={(e) => { e.preventDefault(); onDelete(); }}
              // className="px-4 py-2 bg-red-600 dark:bg-red-700 text-white text-sm rounded-md hover:bg-red-700 dark:hover:bg-red-600 transition-colors duration-200"
              aria-label="Delete tale"
            >
              Delete
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
'use client';

import Link from 'next/link';
import { Tale } from '../../types';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

interface TaleCardProps {
  tale: Tale;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function TaleCard({ tale, onEdit, onDelete }: TaleCardProps) {
  const { user } = useSelector((state: RootState) => state.auth);
  const isAdmin = user?.isAdmin;
  
  // Format the date
  const formattedDate = new Date(tale.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });;
  
  // Truncate description if it's too long
  const truncatedDescription = tale.description.length > 150
    ? `${tale.description.substring(0, 150)}...`
    : tale.description;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg flex flex-col h-full">
      <Link href={`/tales/${tale._id}`} className="block flex-grow">
        <div className="p-4 sm:p-6">
          <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-800 line-clamp-2">{tale.title}</h3>
          <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 line-clamp-3">{truncatedDescription}</p>
          <div className="text-xs sm:text-sm text-gray-500 flex justify-end">
            <span>{formattedDate}</span>
          </div>
        </div>
      </Link>
      
      {isAdmin && (
        <div className="px-6 py-3 bg-gray-50 flex justify-end space-x-2">
          {onEdit && (
            <button
              onClick={(e) => {
                e.preventDefault();
                onEdit();
              }}
              className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors duration-200"
              aria-label="Edit tale"
            >
              Edit
            </button>
          )}
          
          {onDelete && (
            <button
              onClick={(e) => {
                e.preventDefault();
                onDelete();
              }}
              className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors duration-200"
              aria-label="Delete tale"
            >
              Delete
            </button>
          )}
        </div>
      )}
    </div>
  );
}
'use client';

import Link from 'next/link';
import { Tale } from '../../types';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { formatDate } from '@/app/utils/helpers';
import HashTagIcon from '@/public/Icons/HashTagIcon';
import { Chip, IconButton } from '@mui/material';
import CustomTooltip from '@/app/components/ui/CustomTooltip';
import { EditOutlined, DeleteOutline } from '@mui/icons-material';
import { motion } from 'framer-motion';

interface TaleCardProps {
  tale: Tale;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function TaleCard({ tale, onEdit, onDelete }: TaleCardProps) {
  const { user } = useSelector((state: RootState) => state.auth);
  const isAdmin = user?.isAdmin;

  return (
    <motion.div
      whileHover={{ y: -5, transition: { duration: 0.25, ease: 'easeOut' } }}
      className={`
        group relative
        bg-white/80 dark:bg-slate-900/80 backdrop-blur-md
        rounded-2xl border border-gray-200/70 dark:border-gray-800/70
        shadow-sm hover:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-blue-950/20
        transition-all duration-300
        flex flex-col justify-between h-full overflow-hidden
        ${!isAdmin && "select-none"}
      `}
    >
      {/* Decorative top accent line on hover */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <Link
        href={`/tales/${tale._id}`}
        className="p-6 sm:p-7 flex flex-col flex-grow text-left focus:outline-none cursor-pointer"
      >
        <div className="flex justify-between items-start gap-3 mb-3">
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 line-clamp-2 leading-snug">
            {tale.title}
          </h3>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 line-clamp-3 leading-relaxed flex-grow">
          {tale.description}
        </p>

        <div className="pt-4 border-t border-gray-100 dark:border-gray-800/60 mt-auto">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-1.5 flex-wrap">
              {tale.tags && tale.tags.length > 0 && (
                <div className="flex gap-1.5 flex-wrap">
                  {tale.tags.slice(0, 3).map((tagLabel: string, index: number) => (
                    <Chip
                      label={tagLabel}
                      key={tagLabel + index}
                      size="small"
                      sx={{
                        fontSize: '0.75rem',
                        height: '24px',
                        borderRadius: '6px',
                        bgcolor: 'rgba(59, 130, 246, 0.08) !important',
                        color: '#2563eb !important',
                        border: '1px solid rgba(59, 130, 246, 0.15)',
                        fontWeight: 500,
                        '.dark &': {
                          bgcolor: 'rgba(59, 130, 246, 0.12) !important',
                          color: '#60a5fa !important',
                          border: '1px solid rgba(59, 130, 246, 0.25)',
                        },
                      }}
                    />
                  ))}
                  {tale.tags.length > 3 && (
                    <span className="text-[11px] text-gray-400 self-center">
                      +{tale.tags.length - 3}
                    </span>
                  )}
                </div>
              )}
            </div>
            <span className="text-xs font-medium text-gray-400 dark:text-gray-500 tracking-wide">
              {formatDate(tale?.createdAt)}
            </span>
          </div>
        </div>
      </Link>

      {isAdmin && (
        <div className="absolute top-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 translate-y-1 group-hover:translate-y-0">
          {onEdit && (
            <CustomTooltip title="Edit Tale" placement="top" arrow>
              <IconButton
                size="small"
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); onEdit(); }}
                sx={{
                  bgcolor: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(8px)',
                  color: '#3b82f6',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.5)',
                  '&:hover': { 
                    bgcolor: '#ffffff', 
                    transform: 'scale(1.1) translateY(-1px)',
                    boxShadow: '0 6px 16px rgba(59, 130, 246, 0.2)'
                  },
                  transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                  '.dark &': {
                    bgcolor: 'rgba(15, 23, 42, 0.8)',
                    color: '#60a5fa',
                    borderColor: 'rgba(51, 65, 85, 0.5)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                    '&:hover': { 
                      bgcolor: 'rgba(30, 41, 59, 1)',
                      boxShadow: '0 6px 16px rgba(96, 165, 250, 0.2)'
                    }
                  }
                }}
              >
                <EditOutlined fontSize="small" />
              </IconButton>
            </CustomTooltip>
          )}

          {onDelete && (
            <CustomTooltip title="Delete Tale" placement="top" arrow>
              <IconButton
                size="small"
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); onDelete(); }}
                sx={{
                  bgcolor: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(8px)',
                  color: '#ef4444',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.5)',
                  '&:hover': { 
                    bgcolor: '#ffffff', 
                    transform: 'scale(1.1) translateY(-1px)',
                    boxShadow: '0 6px 16px rgba(239, 68, 68, 0.2)'
                  },
                  transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                  '.dark &': {
                    bgcolor: 'rgba(15, 23, 42, 0.8)',
                    color: '#f87171',
                    borderColor: 'rgba(51, 65, 85, 0.5)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                    '&:hover': { 
                      bgcolor: 'rgba(30, 41, 59, 1)',
                      boxShadow: '0 6px 16px rgba(248, 113, 113, 0.2)'
                    }
                  }
                }}
              >
                <DeleteOutline fontSize="small" />
              </IconButton>
            </CustomTooltip>
          )}
        </div>
      )}
    </motion.div>
  );
}

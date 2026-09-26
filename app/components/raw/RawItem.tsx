"use client";

import { Raw } from "@/app/types/Raw";
import PinIcon from "@/public/Icons/PinIcon";
import HashTagIcon from "@/public/Icons/HashTagIcon";
import { Chip } from "@mui/material";
import { formatDate } from "@/app/utils/helpers";
import EditorTextReadOnly from "../common/CustomEditor/EditorTextReadOnly";
import { IconButton } from '@mui/material';
import CustomTooltip from '@/app/components/ui/CustomTooltip';
import { EditOutlined, DeleteOutline, PushPinOutlined } from '@mui/icons-material';
import { motion } from "framer-motion";

interface RawItemProps {
  raw: Raw;
  isAdmin: boolean;
  onEdit?: () => void,
  onDelete?: () => void
  onPin?: () => void,
}

export default function RawItem({ raw, isAdmin, onDelete, onEdit, onPin }: RawItemProps) {

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`relative w-full bg-white/90 dark:bg-slate-900/60 backdrop-blur-3xl rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] border border-gray-200/80 dark:border-slate-700/50 transition-all duration-300 overflow-hidden group hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:hover:shadow-[0_8px_30px_rgb(0,0,0,0.3)] ${!isAdmin && "select-none"}`}
    >
      {/* Subtle inner glow for premium glass effect */}
      <div className="absolute inset-0 rounded-[2rem] border border-white/60 dark:border-white/5 pointer-events-none"></div>

      <div className="relative p-6 sm:p-8 z-10">
        <div className="flex justify-between gap-4 text-gray-800 dark:text-gray-100 font-medium">
          <EditorTextReadOnly content={raw.content} />
          {raw.pinned && (
            <span className="text-2xl opacity-90 drop-shadow-sm">
              <PinIcon className="fill-blue-500 dark:fill-blue-400" />
            </span>
          )}
        </div>
        <div className="mt-6 pt-4 border-t border-gray-200/50 dark:border-gray-700/50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-xs font-semibold tracking-wide text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-2 sm:gap-3">
            {raw.tags.length > 0 && <span className="text-blue-500 dark:text-blue-400 text-lg opacity-80"><HashTagIcon /> </span>}
            <div className="flex gap-2 flex-wrap">
              {raw.tags.map((tagLabel: string, index: number) => (
                <Chip
                  label={tagLabel}
                  key={tagLabel + index}
                  size="small"
                  sx={{
                    bgcolor: 'rgba(59, 130, 246, 0.08) !important',
                    color: '#2563eb !important',
                    fontWeight: 600,
                    borderRadius: '8px',
                    border: '1px solid rgba(59, 130, 246, 0.1)',
                    '.dark &': {
                      bgcolor: 'rgba(96, 165, 250, 0.08) !important',
                      color: '#60a5fa !important',
                      border: '1px solid rgba(96, 165, 250, 0.1)',
                    },
                  }}
                />
              ))}
            </div>
          </div>
          <span className="self-end opacity-80 uppercase tracking-widest">{formatDate(raw.createdAt)}</span>
        </div>
      </div>

      {isAdmin && (
        <div className="absolute top-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 translate-y-1 group-hover:translate-y-0">
          {onEdit && (
            <CustomTooltip title="Edit" placement="top" arrow>
              <IconButton
                size="small"
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); onEdit(); }}
                sx={{
                  bgcolor: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(8px)',
                  color: '#3b82f6',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.5)',
                  cursor: 'pointer',
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
            <CustomTooltip title="Delete" placement="top" arrow>
              <IconButton
                size="small"
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); onDelete(); }}
                sx={{
                  bgcolor: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(8px)',
                  color: '#ef4444',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.5)',
                  cursor: 'pointer',
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
          {onPin && (
            <CustomTooltip title={raw.pinned ? "Unpin" : "Pin"} placement="top" arrow>
              <IconButton
                size="small"
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); onPin(); }}
                sx={{
                  bgcolor: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(8px)',
                  color: '#8b5cf6',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.5)',
                  cursor: 'pointer',
                  '&:hover': {
                    bgcolor: '#ffffff',
                    transform: 'scale(1.1) translateY(-1px)',
                    boxShadow: '0 6px 16px rgba(139, 92, 246, 0.2)'
                  },
                  transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                  '.dark &': {
                    bgcolor: 'rgba(15, 23, 42, 0.8)',
                    color: '#a78bfa',
                    borderColor: 'rgba(51, 65, 85, 0.5)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                    '&:hover': {
                      bgcolor: 'rgba(30, 41, 59, 1)',
                      boxShadow: '0 6px 16px rgba(167, 139, 250, 0.2)'
                    }
                  }
                }}
              >
                <PushPinOutlined fontSize="small" />
              </IconButton>
            </CustomTooltip>
          )}
        </div>
      )}
    </motion.div>
  );
}

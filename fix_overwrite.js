const fs = require('fs');

const rawItemContent = `"use client";

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
      className={\`relative w-full bg-white/90 dark:bg-slate-900/60 backdrop-blur-3xl rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] border border-gray-200/80 dark:border-slate-700/50 transition-all duration-300 overflow-hidden group hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:hover:shadow-[0_8px_30px_rgb(0,0,0,0.3)] \${!isAdmin && "select-none"}\`}
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
`;

const rawListContent = `"use client";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useGetRawsQuery } from '@/app/hooks/queries/useRawQuery';
import { useDeleteRawMutation, useUpdateRawMutation } from '@/app/hooks/mutations/useRawMutation';
import SearchBar from "./SearchBar";
import { AddCircleRounded, RemoveCircleRounded } from "@mui/icons-material"
import { PaginationParams, Raw } from "@/app/types/Raw";
import { Loader, RawListSkeleton } from "../ui/Loader";
import dynamic from "next/dynamic";
import { IconButton } from '@mui/material';
import CustomTooltip from '@/app/components/ui/CustomTooltip';
const Paginator = dynamic(() => import('../ui/Paginator'), { ssr: false });
const RawDelete = dynamic(() => import('../raw/RawDelete'), { ssr: false });
const RawItem = dynamic(() => import('../raw/RawItem'), { ssr: false });
const RawEditForm = dynamic(() => import('../raw/RawEditForm'), { ssr: false });
const RawPin = dynamic(() => import('../raw/RawPin'), { ssr: false });
const RawForm = dynamic(() => import('../raw/RawForm'), { ssr: false });

export default function RawList() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Redux - Global state
  const { user, isAuthenticated }: any = useSelector((state: RootState) => state.auth);
  const isAdmin = mounted && isAuthenticated && user?.isAdmin;

  // Local state - Pagination & UI control
  const [searchParams, setSearchParams] = useState<PaginationParams>({
    query: "",
    page: 1,
    limit: 10,
  });
  const [addRaw, setAddRaw] = useState<boolean>(false);

  // Local state - Modals / Item state
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [pinId, setPinId] = useState<string | null>(null);
  const [edit, setEdit] = useState<string | null>(null);

  // Data fetching
  const { data, isLoading, error } = useGetRawsQuery(searchParams);

  // Mutations
  const { mutateAsync: deleteRaw, isPending: isDeleting } = useDeleteRawMutation();
  const { mutateAsync: updateRaw, isPending: isUpdating } = useUpdateRawMutation();

  // Derived data
  const raws = data?.data || [];
  const totalPages = data?.pagination?.pages || 1;

  // Handlers

  // Handle search query update
  const handleSearch = (query: string) => {
    setSearchParams((prev: any) => ({
      ...prev,
      query,
      page: 1,
    }));
    setAddRaw(false);
  };

  // Handle page change for pagination
  const handlePageChange = (e: any, page: number) => {
    setSearchParams((prev: any) => ({
      ...prev,
      page,
    }));
    setAddRaw(false);
  };

  // Handle saving updates to RAW content
  const handleSave = async (id: string, raw: Raw) => {
    const { content, pinned, tags } = raw;
    if (!content.trim()) return;

    const rawData = { content, pinned, tags };

    try {
      await updateRaw({ id, rawData });
      setEdit(null);
    } catch (err) {
      console.error("Failed to update RAW:", err);
    }
    setAddRaw(false);
  };

  // Handle delete action with confirmation
  const handleDelete = async (id: string) => {
    if (deleteConfirm === id) {
      try {
        await deleteRaw(id);
        setDeleteConfirm(null);
      } catch (error) {
        console.error("Failed to delete RAW:", error);
      }
    } else {
      setDeleteConfirm(id);
    }
    setAddRaw(false);
  };

  // Handle pin toggle with confirmation
  const handlePin = async (id: string, pinned: boolean, content: string, tags: string[]) => {
    if (pinId === id) {
      try {
        await updateRaw({ id, rawData: { content, pinned, tags } });
      } catch (err) {
        console.error("Failed to update RAW:", err);
      }
      setPinId(null);
    } else {
      setPinId(id);
    }
    setAddRaw(false);
  };

  // Handle edit click
  const handleEditClick = (id: string) => {
    setAddRaw(false);
    setEdit(id);
    setDeleteConfirm(null);
    setPinId(null)
  };

  // Handle delete click
  const handleDeleteClick = (id: string) => {
    setDeleteConfirm(id);
    setAddRaw(false);
    setEdit(null);
    setPinId(null)
  };

  // Handle add toggle
  const handleAddClick = () => {
    setAddRaw((prev: boolean) => !prev);
    setDeleteConfirm(null);
    setEdit(null);
    setPinId(null)
  };
  // Handle pin click
  const handlePinClick = (id: string) => {
    setPinId(id)
    setAddRaw(false)
    setDeleteConfirm(null);
    setEdit(null);
  }

  return (
    <div className="mx-auto w-full">
      <div className="mb-6 flex gap-2 sm:gap-4 items-center">
        <SearchBar placeholder="Search by Content/Tags..." onSearch={handleSearch} />
        {isAdmin && (
          <button
            onClick={handleAddClick}
            className={\`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center gap-2 shadow-lg \${
                addRaw 
                ? 'bg-red-500 hover:bg-red-600 text-white shadow-red-500/30 hover:shadow-red-500/50' 
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/30 hover:shadow-blue-600/50'
            }\`}
          >
            {addRaw ? (
                <>
                    <RemoveCircleRounded fontSize="small" />
                    Cancel
                </>
            ) : (
                <>
                    <AddCircleRounded fontSize="small" />
                    Add Raw
                </>
            )}
          </button>
        )}
      </div>

      {isAdmin && addRaw && <RawForm identifier="RAW" handleFormClose={() => setAddRaw(false)} />}

      {isLoading ? (<RawListSkeleton count={3} />)
        : error ? (
          <div className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100 p-6 rounded-lg shadow-md transition-colors duration-300">
            Error loading RAWs. Please try again.
          </div>
        ) : raws.length === 0 ? (
          <div className="text-center py-16 text-gray-500 dark:text-gray-400 transition-colors duration-300">
            {searchParams.query
              ? \`No RAWs found matching "\${searchParams.query}"\`
              : "No RAWs available"}
          </div>
        ) : (
          <div className="w-full flex gap-4 flex-col">
            {raws.map((raw: Raw) => (
              <div key={raw._id} className="relative">
                {deleteConfirm === raw._id && (
                  <RawDelete
                    handleCancel={() => setDeleteConfirm(null)}
                    handleDelete={() => handleDelete(raw._id)}
                    isDeleting={isDeleting}
                  />
                )}
                {edit === raw._id && isAdmin && (
                  <RawEditForm
                    identifier="RAW"
                    raw={raw}
                    handleSave={handleSave}
                    isUpdating={isUpdating}
                    handleCancel={() => setEdit(null)}
                  />
                )}
                {
                  pinId === raw._id && isAdmin && (
                    <RawPin
                      handleCancel={() => setPinId(null)}
                      isPinning={isUpdating}
                      handlePin={() => handlePin(raw._id, !raw.pinned, raw.content, raw.tags)}
                      pinned={raw.pinned}
                    />
                  )
                }
                {edit !== raw._id && (
                  <RawItem
                    key={raw._id}
                    raw={raw}
                    isAdmin={isAdmin ? true : false}
                    onEdit={
                      isAdmin
                        ? () => handleEditClick(raw._id) : undefined
                    }
                    onDelete={isAdmin ? () => handleDeleteClick(raw._id) : undefined}
                    onPin={isAdmin ? () => handlePinClick(raw._id) : undefined}
                  />)}
              </div>
            ))}

            {totalPages > 1 && (
              <div className="mt-8 flex justify-center">
                <Paginator count={totalPages} onChange={handlePageChange} page={searchParams.page || 1} />
              </div>
            )}
          </div>
        )}
    </div>
  );
}
`;

fs.writeFileSync('e:/Projects/tales-for-nights/app/components/raw/RawItem.tsx', rawItemContent);
fs.writeFileSync('e:/Projects/tales-for-nights/app/components/raw/RawList.tsx', rawListContent);

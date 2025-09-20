"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import {
  useDeleteRawMutation,
  useGetRawsQuery,
  useUpdateRawMutation,
} from "@/app/store/apis/rawApi";
import SearchBar from "./SearchBar";
import { AddCircleRounded, RemoveCircleRounded } from "@mui/icons-material"
import { PaginationParams, Raw } from "@/app/types/Raw";
import { Loader } from "../ui/Loader";
import dynamic from "next/dynamic";
import { IconButton, Tooltip } from "@mui/material";
const Paginator = dynamic(() => import('../ui/Paginator'), { ssr: false });
const RawDelete = dynamic(() => import('../raw/RawDelete'), { ssr: false });
const RawItem = dynamic(() => import('../raw/RawItem'), { ssr: false });
const RawEditForm = dynamic(() => import('../raw/RawEditForm'), { ssr: false });
const RawPin = dynamic(() => import('../raw/RawPin'), { ssr: false });
const RawForm = dynamic(() => import('../raw/RawForm'), { ssr: false });

export default function RawList() {
  // Redux - Global state
  const { user, isAuthenticated }: any = useSelector((state: RootState) => state.auth);
  const isAdmin = isAuthenticated && user?.isAdmin;

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
  const [deleteRaw, { isLoading: isDeleting }] = useDeleteRawMutation();
  const [updateRaw, { isLoading: isUpdating }] = useUpdateRawMutation();

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
      await updateRaw({ id, rawData }).unwrap();
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
        await deleteRaw(id).unwrap();
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
        await updateRaw({ id, rawData: { content, pinned, tags } }).unwrap();
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
          <Tooltip title="Add Raw">
            <IconButton
              onClick={handleAddClick}
              sx={{
                color: addRaw ? 'error.main' : 'primary.main',
                '&:hover': {
                  color: addRaw ? 'error.dark' : 'primary.dark',
                },
                transition: 'transform 0.2s',
                transform: 'scale(1.0)',
                '&:active': {
                  transform: 'scale(0.95)',
                }
              }}
            >
              {addRaw ? (
                <RemoveCircleRounded fontSize="large" />
              ) : (
                <AddCircleRounded fontSize="large" />
              )}
            </IconButton>
          </Tooltip>
        )}
      </div>

      {isAdmin && addRaw && <RawForm identifier="RAW" handleFormClose={() => setAddRaw(false)} />}

      {isLoading ? (<Loader loadingText="Loading Raws..." />)
        : error ? (
          <div className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100 p-6 rounded-lg shadow-md transition-colors duration-300">
            Error loading RAWs. Please try again.
          </div>
        ) : raws.length === 0 ? (
          <div className="text-center py-16 text-gray-500 dark:text-gray-400 transition-colors duration-300">
            {searchParams.query
              ? `No RAWs found matching "${searchParams.query}"`
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
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
import RawForm from "./RawForm";
import RawItem from "./RawItem";
import Pagination from "../ui/Pagination";
import RawEditForm from "./RawEditForm";
import RawDelete from "./RawDelete";
import RawPin from "./RawPin"
import {AddCircleRounded,RemoveCircleRounded} from "@mui/icons-material"
import { PaginationParams, Raw } from "@/app/types/Raw";
import { Loader } from "../ui/Loader";

export default function RawList() {
  const [searchParams, setSearchParams] = useState<PaginationParams>({
    query: "",
    page: 1,
    limit: 10,
  });

  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );
  const isAdmin = isAuthenticated && user?.isAdmin;
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [pinConfirm,setPinConfirm] = useState<string | null>(null)
  const [edit, setEdit] = useState<string | null>(null);
  const [deleteRaw, { isLoading: isDeleting }] = useDeleteRawMutation();
  const [addRaw, setAddRaw] = useState<boolean>(false);
  const { data, isLoading, error } = useGetRawsQuery(searchParams);
  const raws = data?.data || [];
  const totalPages = data?.pagination?.pages || 1;

  // Handle search query update
  const handleSearch = (query: string) => {
    setSearchParams((prev: any) => ({
      ...prev,
      query,
      page: 1, // Reset to first page when a new search is performed
    }));
    setAddRaw(false)
  };

  // Handle page change for pagination
  const handlePageChange = (page: number) => {
    setSearchParams((prev: any) => ({
      ...prev,
      page,
    }));
    setAddRaw(false)
  };

  const [updateRaw, { isLoading: isUpdating }] = useUpdateRawMutation();

  // Handle saving updates to RAW content
  const handleSave = async (id: string, raw: Raw) => {
    const {content,pinned,tags} = raw
    if (!content.trim()) return;
    const rawData = {
      content,
      pinned,
      tags
    }
    try {
      await updateRaw({ id, rawData }).unwrap();
      setEdit(null); // Clear edit mode after saving
    } catch (err) {
      console.error("Failed to update RAW:", err);
    }
    setAddRaw(false)
  };

  // Handle delete action with confirmation
  const handleDelete = async (id: string) => {
    if (deleteConfirm === id) {
      try {
        await deleteRaw(id).unwrap();
        setDeleteConfirm(null); // Reset delete confirmation after deletion
      } catch (error) {
        console.error("Failed to delete RAW:", error);
      }
    } else {
      setDeleteConfirm(id); // Set the ID for the delete confirmation prompt
    }
    setAddRaw(false)
  };

  const handlePin = async (id:string,pinned:boolean,content:string,tags:string[]) =>{
    if(pinConfirm === id){
      try {
        await updateRaw({ id, rawData: { content,pinned,tags } }).unwrap();
      } catch (err) {
        console.error("Failed to update RAW:", err);
      }
      setPinConfirm(null)
    }
    else{
      setPinConfirm(id)
    }
    setAddRaw(false)
  }

  const handleEditClick =(raw:Raw) =>{
    setAddRaw(false)
    setEdit(raw._id)
    setDeleteConfirm(null)
  }

  const handleDeleteClick = (id:string) => {
    setDeleteConfirm(id)
    setAddRaw(false)
    setEdit(null)
  }

  return (
    <div className="container mx-auto">
      <div className="mb-6 flex gap-2 sm:gap-4">
        <SearchBar placeholder="Search by Content/Tags..." onSearch={handleSearch} />
        {isAdmin && (
          <button
            className="active:scale-95 duration-300"
            onClick={() => setAddRaw((prev: boolean) => !prev)}
          >
            {addRaw ? (
              <RemoveCircleRounded className="text-red-500" fontSize="large" />
            ) : (
              <AddCircleRounded className="text-blue-500" fontSize="large" />
            )}
          </button>
        )}
      </div>

      {isAdmin && addRaw && <RawForm handleFormClose={()=>setAddRaw(false)} />}

      {isLoading ? (<Loader loadingText="Loading Raws..." />) 
      : error ? (
        <div className="bg-red-100 text-red-700 p-4 rounded-lg">
          Error loading RAWs. Please try again.
        </div>
      ) : raws.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          {searchParams.query
            ? `No RAWs found matching "${searchParams.query}"`
            : "No RAWs available"}
        </div>
      ) : (
        <div className="w-full flex gap-4 flex-col">
          {raws.map((raw) => (
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
                  // content={content}
                  raw={raw}
                  handleSave={handleSave}
                  isUpdating={isUpdating}
                  // setContent={setContent}
                  handleCancel={() => setEdit(null)}
                />
              )}
              {
                pinConfirm === raw._id && isAdmin &&(
                  <RawPin
                    handleCancel={()=>setPinConfirm(null)}
                    isPinning={isUpdating}
                    handlePin={()=>handlePin(raw._id,!raw.pinned,raw.content,raw.tags)}
                    pinned={raw.pinned}
                  />
                )
              }
              {edit !== raw._id &&  (
                <RawItem
                  key={raw._id}
                  raw={raw}
                  isAdmin={isAdmin ? true : false}
                  onEdit={
                    isAdmin
                      ? () => handleEditClick(raw) : undefined
                  }
                  onDelete={isAdmin ? () => handleDeleteClick(raw._id) : undefined}
                  onPin={isAdmin ? () => setPinConfirm(raw._id) : undefined}
                />)}
            </div>
          ))}

          {totalPages > 1 && (
            <div className="mt-8">
              <Pagination
                currentPage={searchParams.page || 1}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

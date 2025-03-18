"use client";

import { useState, useEffect } from "react";
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
import { IoIosAddCircle, IoIosRemoveCircle } from "react-icons/io";
import { Raw } from "@/app/types/Raw";

export default function RawList() {
  const [searchParams, setSearchParams] = useState<any>({
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
  const [content, setContent] = useState<string>("");
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
  const handleSave = async (id: string, content: string,pinned:boolean) => {
    try {
      await updateRaw({ id, rawData: { content,pinned } }).unwrap();
      setEdit(null); // Clear edit mode after saving
      setContent(""); // Clear the content textarea
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

  const handlePin = async (id:string,pinned:boolean,content:string) =>{
    if(pinConfirm === id){
      try {
        await updateRaw({ id, rawData: { content,pinned } }).unwrap();
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

  const handleEdit =(raw:Raw) =>{
    setAddRaw(false)
    setEdit(raw._id)
    setContent(raw.content)
  }

  return (
    <div className="container mx-auto">
      <div className="mb-6 flex gap-2 sm:gap-4">
        <SearchBar onSearch={handleSearch} />
        {isAdmin && (
          <button
            className="text-5xl  active:scale-95 duration-300"
            onClick={() => setAddRaw((prev: boolean) => !prev)}
          >
            {addRaw ? (
              <IoIosRemoveCircle className="fill-red-500" />
            ) : (
              <IoIosAddCircle className="fill-blue-500" />
            )}
          </button>
        )}
      </div>

      {isAdmin && addRaw && <RawForm handleFormClose={()=>setAddRaw(false)} />}

      {isLoading ? (
        <div className="text-center py-8">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      ) : error ? (
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
        <div className="space-y-4">
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
                  content={content}
                  handleSave={() => handleSave(raw._id, content,raw.pinned)}
                  isUpdating={isUpdating}
                  setContent={setContent}
                  handleCancel={() => setEdit(null)}
                />
              )}
              {
                pinConfirm === raw._id && isAdmin &&(
                  <RawPin
                    handleCancel={()=>setPinConfirm(null)}
                    isPinning={isUpdating}
                    handlePin={()=>handlePin(raw._id,!raw.pinned,raw.content)}
                    pinned={raw.pinned}
                  />
                )
              }
              <RawItem
                key={raw._id}
                raw={raw}
                isAdmin={isAdmin ? true : false}
                onEdit={
                  isAdmin
                    ? () => handleEdit(raw) : undefined
                }
                onDelete={isAdmin ? () => setDeleteConfirm(raw._id) : undefined}
                onPin= {isAdmin? () => setPinConfirm(raw._id):undefined}
                pinned = {isAdmin?raw.pinned:undefined}
              />
            </div>
          ))}

          {totalPages > 1 && (
            <div className="mt-8">
              <Pagination
                currentPage={searchParams.page}
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

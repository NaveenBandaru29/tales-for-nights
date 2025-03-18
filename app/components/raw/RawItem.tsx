// components/raw/RawItem.tsx
"use client";

import { Raw } from "@/app/types/Raw";
import { TiPi, TiPin } from "react-icons/ti";

interface RawItemProps {
  raw: Raw;
  isAdmin: boolean;
  onEdit?:()=>void,
  onDelete?:()=>void
  onPin?:()=>void,
  pinned?:boolean
}

export default function RawItem({ raw, isAdmin,onDelete,onEdit,onPin,pinned }: RawItemProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg transition-all transform hover:scale-105 hover:shadow-xl">
        <div className="p-6">
          <div className="flex justify-between gap-4">
          <pre className="whitespace-pre-wrap text-gray-700 font-sans">{raw.content}</pre>
          {raw.pinned && <span className="text-2xl"><TiPin className="fill-blue-500 " /></span>}
          </div>
          <div className="mt-4 flex items-center justify-end text-sm text-gray-600">
            <span>{formatDate(raw.createdAt)}</span>
          </div>
        </div>
          {isAdmin && (
            <div className="px-6 py-3 bg-gray-50 flex justify-end space-x-2 rounded-b-xl">
              {onEdit && (
            <button
              onClick={(e) => {
                e.preventDefault();
                onEdit();
              }}
              className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors duration-200"
              aria-label="Edit Raw"
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
              aria-label="Delete Raw"
            >
              Delete
            </button>
          )}
          {onPin && (
            <button
              onClick={(e) => {
                e.preventDefault();
                onPin();
              }}
              className="px-3 py-1 bg-slate-600 text-white text-sm rounded hover:bg-slate-700 transition-colors duration-200"
              aria-label="Delete Raw"
            >
              {pinned === true?"Unpin" : pinned === false ? "Pin" :""}
            </button>
          )}
            </div>
          )}
    </div>
  );
}

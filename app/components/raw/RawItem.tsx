// components/raw/RawItem.tsx
"use client";

import { Raw } from "@/app/types/Raw";

interface RawItemProps {
  raw: Raw;
  isAdmin: boolean;
  onEdit?:()=>void,
  onDelete?:()=>void
}

export default function RawItem({ raw, isAdmin,onDelete,onEdit }: RawItemProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg transition-all transform hover:scale-105 hover:shadow-xl">
        <div className="p-6">
          <p className="whitespace-pre-wrap text-gray-700">{raw.content}</p>
          <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
            <span>Created : {formatDate(raw.createdAt)}</span>
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
            </div>
          )}
    </div>
  );
}

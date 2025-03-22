import { formatDate } from "@/app/utils/helpers";
import Link from "next/link";
import React from "react";

interface AdminManageCardProps {
  item: any;
  openDeleteModal: () => void;
}

const AdminManageCard = ({ item, openDeleteModal }: AdminManageCardProps) => {
  return (
    <li key={item._id}>
      <div className="px-6 py-4 flex items-center justify-between gap-2 sm:gap-4">
        <div className="flex-1 min-w-0">
          {item?.title && (
            <div className="flex items-center">
              <h3 className="text-lg font-medium text-gray-900 truncate">
                {item.title}
              </h3>
            </div>
          )}
          <p className="mt-1 text-sm text-gray-500 truncate">
            {item?.description ? item?.description : item?.content}
          </p>
          {item?.createdAt && (
            <p className="mt-1 text-xs text-gray-400">
              Created on: {formatDate(item?.createdAt)}
            </p>
          )}
        </div>
        <div className="flex space-x-2 flex-col gap-2 sm:flex-row">
          {item?.title && (
            <>
              <Link
                href={`/tales/${item._id}`}
                className="w-20 text-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                View
              </Link>
              <Link
                href={`/admin/edit/${item._id}`}
                className="w-20 text-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Edit
              </Link>
            </>
          )}
          <button
            onClick={openDeleteModal}
            className="w-20 text-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Delete
          </button>
        </div>
      </div>
    </li>
  );
};

export default AdminManageCard;

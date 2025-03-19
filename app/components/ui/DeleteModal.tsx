import React from "react";

interface DeleteModalProps {
  title: string;
  description: string;
  onClose: () => void;
  onDelete: () => void;
  isDeleting: boolean;
}

const DeleteModal = ({
  description,
  onClose,
  onDelete,
  title,
  isDeleting,
}: DeleteModalProps) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-xs bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">{title}</h3>
        <p className="text-sm text-gray-500 mb-6">{description}</p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            onClick={onDelete}
            disabled={isDeleting}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;

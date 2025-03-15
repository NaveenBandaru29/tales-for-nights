import React from "react";

interface RawEditFormProps {
  content: string;
  setContent: (content: string) => void;
  isUpdating: boolean;
  handleSave: () => void;
  handleCancel: () => void;
}

const RawEditForm = ({
  content,
  handleSave,
  isUpdating,
  setContent,
  handleCancel,
}: RawEditFormProps) => {
  return (
    <div className="absolute p-6 inset-0 bg-white bg-opacity-90 flex flex-col items-start justify-center gap-4 z-10 rounded-lg shadow-md">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition duration-200"
        rows={4}
        disabled={isUpdating}
      />
      <div className="flex space-x-3">
        <button
          onClick={handleSave}
          disabled={isUpdating}
          className="px-3 py-1 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none disabled:opacity-50 transition"
        >
          {isUpdating ? "Saving..." : "Save"}
        </button>
        <button
          onClick={handleCancel}
          className="px-3 py-1 text-sm bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 focus:outline-none transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default RawEditForm;

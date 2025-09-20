"use client";

import { Raw } from "@/app/types/Raw";
import PinIcon from "@/public/Icons/PinIcon";
import HashTagIcon from "@/public/Icons/HashTagIcon";
import { Button, Chip } from "@mui/material";
import { formatDate } from "@/app/utils/helpers";
import EditorTextReadOnly from "../common/CustomEditor/EditorTextReadOnly";

interface RawItemProps {
  raw: Raw;
  isAdmin: boolean;
  onEdit?: () => void,
  onDelete?: () => void
  onPin?: () => void,
}

export default function RawItem({ raw, isAdmin, onDelete, onEdit, onPin }: RawItemProps) {

  return (
    <div className={`w-full bg-white dark:bg-gray-800 rounded-2xl shadow-lg transition-all transform hover:scale-102 hover:shadow-xl ${!isAdmin && "select-none"}`}>
      <div className="p-6">
        <div className="flex justify-between gap-4 text-gray-700 dark:text-gray-200">
          <EditorTextReadOnly content={raw.content} />
          {raw.pinned && <span className="text-2xl"><PinIcon className="fill-blue-500 dark:fill-blue-400" /></span>}
        </div>
        <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-2 sm:gap-4">
            {raw.tags.length > 0 && <span className="text-blue-500 dark:text-blue-400 text-xl"><HashTagIcon /> </span>}
            <div className="flex gap-2 sm:gap-4 flex-wrap">
              {raw.tags.map((tagLabel: string, index: number) => (
                <Chip
                  label={tagLabel}
                  key={tagLabel + index}
                  onClick={() => { }}
                  size="small"
                  sx={{
                    bgcolor: 'rgba(29, 78, 216, 0.1) !important',
                    color: '#1d4ed8 !important',
                    '.dark &': {
                      bgcolor: 'rgba(59, 130, 246, 0.1) !important',
                      color: '#3b82f6 !important',
                    },
                  }}
                />
              ))}
            </div>
          </div>
          <span className="self-end">{formatDate(raw.createdAt)}</span>
        </div>
      </div>
      {isAdmin && (
        <div className="px-6 py-3 bg-gray-50 dark:bg-gray-900/50 flex justify-end rounded-b-2xl gap-2">
          {onEdit && (
            <Button
              onClick={(e) => {
                e.preventDefault();
                onEdit();
              }}
              aria-label="Edit Raw"
              variant="outlined"
              color="primary"
            >
              Edit
            </Button>
          )}
          {onDelete && (
            <Button
              onClick={(e) => {
                e.preventDefault();
                onDelete();
              }}
              aria-label="Delete Raw"
              variant="outlined"
              color="error"
            >
              Delete
            </Button>
          )}
          {onPin && (
            <Button
              onClick={(e) => {
                e.preventDefault();
                onPin();
              }}
              aria-label="Pin/Unpin Raw"
              variant="outlined"
              color="secondary"
            >
              {raw.pinned ? "Unpin" : "Pin"}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
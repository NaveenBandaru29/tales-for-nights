import React, { useState } from "react";
import { Tag, tags } from "./RawForm";
import dynamic from "next/dynamic";
import { Raw } from "@/app/types/Raw";
import { MultiValue } from "react-select";
import { Button, useTheme } from "@mui/material";
import SelectField from "../ui/SelectField";
import { Loader } from "../ui/Loader";
const CustomEditor = dynamic(() => import('../common/CustomEditor'), { ssr: false, loading: () => <Loader loadingText='Loading Editor...' /> })

interface RawEditFormProps {
  raw: Raw;
  isUpdating: boolean;
  handleSave: (id: string, updatedRaw: Raw) => void;
  handleCancel: () => void;
  identifier: 'RAW' | 'CHARM'
}

const RawEditForm = ({ handleSave, isUpdating, raw, handleCancel, identifier }: RawEditFormProps) => {
  const [rawContent, setRawContent] = useState<string>(raw.content || "");
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  const [selectedRawTags, setSelectedRawTags] = useState<MultiValue<Tag>>(
    raw.tags.map((tagLabel: string) => {
      const existingTag = tags.find((tag: Tag) => tag.label === tagLabel);
      return existingTag ? existingTag : { label: tagLabel, value: tagLabel.toLowerCase() };
    })
  );

  const handleTagsChange = (newValues: MultiValue<Tag>) => {
    setSelectedRawTags(newValues);
  };

  const onSubmit = () => {
    const updatedTags = selectedRawTags.map(tag => tag.label);
    handleSave(raw._id, { ...raw, content: rawContent, tags: updatedTags });
  };

  return (
    <div className="relative p-6 inset-0 flex flex-col gap-4 z-10 rounded-lg shadow-md transition-colors duration-300
                    bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100">

      <CustomEditor
        placeholder="Enter content..."
        showPreview
        content={rawContent}
        setContent={setRawContent}
      />

      {identifier === "RAW" && (
        <SelectField
          isMulti
          isClearable
          options={tags}
          value={selectedRawTags}
          onChange={handleTagsChange}
          getOptionLabel={(tag: Tag) => tag.label}
          getOptionValue={(tag: Tag) => tag.value}
          placeholder="Select or create a tag..."
          className="w-full"
        />
      )}

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onSubmit}
          disabled={isUpdating}
          className="px-6 py-2.5 rounded-xl font-medium text-sm transition-all duration-200
                     bg-emerald-600 hover:bg-emerald-700 text-white
                     shadow-lg shadow-emerald-600/30 hover:shadow-emerald-600/50
                     disabled:opacity-50 disabled:cursor-not-allowed
                     flex items-center gap-2"
        >
          {isUpdating ? "Saving..." : "Save"}
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="px-6 py-2.5 rounded-xl font-medium text-sm transition-all duration-200
                     bg-gray-100 hover:bg-gray-200 text-gray-700
                     dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-gray-200
                     border border-gray-200 dark:border-slate-700"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default RawEditForm;
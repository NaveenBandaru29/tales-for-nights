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
        <Button
          onClick={onSubmit}
          disabled={isUpdating}
          variant="contained"
          sx={{
            '&.Mui-disabled': {
              backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)',
              color: isDarkMode ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)',
            },
          }}
        >
          {isUpdating ? "Saving..." : "Save"}
        </Button>
        <Button
          onClick={handleCancel}
          variant="contained"
          color="error"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default RawEditForm;
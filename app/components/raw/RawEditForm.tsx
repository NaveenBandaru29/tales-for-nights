import React, { useState } from "react";
import { Tag, tags } from "./RawForm";
import dynamic from "next/dynamic";
import { Raw } from "@/app/types/Raw";
import { MultiValue } from "react-select";
import { Button } from "@mui/material";
import SelectField from "../ui/SelectField";
const CustomEditor = dynamic(()=>import('../common/CustomEditor'),{ssr:false})

interface RawEditFormProps {
  raw: Raw;
  isUpdating: boolean;
  handleSave: (id: string, updatedRaw: Raw) => void;
  handleCancel: () => void;
}

const RawEditForm = ({ handleSave, isUpdating, raw, handleCancel }: RawEditFormProps) => {
  const [rawContent, setRawContent] = useState<string>(raw.content || "");
  
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
    const updatedTags = selectedRawTags.map(tag => tag.label); // Extract only label values
    handleSave(raw._id, { ...raw, content: rawContent, tags: updatedTags });
  };

  return (
    <div className="relative p-6 inset-0 bg-white bg-opacity-90 flex flex-col items-start justify-center gap-4 z-10 rounded-lg shadow-md">
      {/* <textarea
        value={rawContent}
        onChange={(e) => setRawContent(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition duration-200"
        rows={4}
        disabled={isUpdating}
        placeholder="Enter RAW content..."
      /> */}
        <CustomEditor
          placeholder="Enter RAW content..."
          showPreview
          content={rawContent}
          setContent={setRawContent}
          
        />

      <SelectField
        isMulti
        isClearable
        options={tags}
        value={selectedRawTags}
        onChange={handleTagsChange}
        getOptionLabel={(tag:Tag) => tag.label} // Ensure label is shown correctly
        getOptionValue={(tag:Tag) => tag.value} // Ensure value is properly assigned
        placeholder="Select or create a tag..."
        className="w-full"
      />

      <div className="flex gap-3">
        <Button
          onClick={onSubmit}
          disabled={isUpdating}
          variant="contained"
          // className="px-3 py-1 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none disabled:opacity-50 transition"
        >
          {isUpdating ? "Saving..." : "Save"}
        </Button>
        <Button
          onClick={handleCancel}
          color="error"
          variant="contained"
          // className="px-3 py-1 text-sm bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 focus:outline-none transition"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default RawEditForm;

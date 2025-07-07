// components/raw/RawForm.tsx
'use client';
import dynamic from 'next/dynamic';
import { useCreateRawMutation } from '@/app/store/apis/rawApi';
import { useState } from 'react';
import { MultiValue } from "react-select"
import SelectField from '../ui/SelectField';
import { Loader } from '../ui/Loader';
import { useCreateCharmMutation } from '@/app/store/apis/charmApi';
import { Button } from '@mui/material';
const CustomEditor = dynamic(() => import('../common/CustomEditor'), { ssr: false, loading: () => <Loader loadingText='Loading Editor...' /> })

export interface Tag {
  value: string;
  label: string;
}

export const tags: Tag[] = [
  { value: "in love", label: "In Love" },
  { value: "life sucks", label: "Life Sucks" },
  { value: "feel pain", label: "Feel Pain" },
  { value: "mother earth", label: "Mother Earth" },
  { value: "sad truth", label: "Sad Truth" },
  { value: "brotherhood", label: "Brotherhood" },
  { value: "be young", label: "Be Young" },
  { value: "corporate coolie", label: "Corporate Coolie" },
  { value: "isn't it funny", label: "Isn't It Funny" },
  { value: "socho zara", label: "Socho Zara" },
  { value: "anime", label: "Anime" },

];

export interface RawFormPorps {
  handleFormClose: () => void;
  identifier: "RAW" | "CHARM"
}

export default function RawForm({ handleFormClose, identifier }: RawFormPorps) {
  const [content, setContent] = useState('');
  const [selectedTags, setSelectedTags] = useState<MultiValue<Tag>>([])
  const [createRaw, { isLoading }] = useCreateRawMutation();
  const [createCharm, { isLoading: isAdding }] = useCreateCharmMutation();

  const handleTagsChange = (newValues: MultiValue<Tag>) => {
    setSelectedTags(newValues)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    const allTags = selectedTags.map((tag: Tag) => tag.label) || []
    const data = {
      content,
      pinned: false,
      tags: allTags
    }
    try {
      if (identifier === "RAW") {
        await createRaw(data).unwrap();
      }
      else {
        await createCharm(data).unwrap()
      }
      setContent(''); // Clear form after successful submission
      setSelectedTags([])
    } catch (err) {
      console.error(`Failed to create ${identifier}:`, err);
    }
    handleFormClose()
  };

  return (

    <form onSubmit={handleSubmit} className="space-y-6 max-w-full mx-auto bg-white p-8 rounded-xl shadow-lg transition-all hover:shadow-2xl mb-4">
      <div className="relative flex flex-col gap-4">
        {/* <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter RAW content..."
          className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all ease-in-out duration-300"
          rows={3}
          required
          /> */}
        <CustomEditor
          placeholder="Enter content..."
          showPreview
          content={content}
          setContent={setContent}

        />
        {identifier === "RAW" && <SelectField
          isMulti
          isClearable
          options={tags}
          value={selectedTags}
          onChange={handleTagsChange}
          placeholder="Select or Create a tag..."
        />}
      </div>

      <div className="flex gap-3">
        <Button
          type='submit'
          disabled={isLoading || isAdding || !content.trim()}
          variant="contained"
        // className="px-3 py-1 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none disabled:opacity-50 transition"
        >
          {(isLoading || isAdding) ? 'Adding...' : 'Add'}
        </Button>
        <Button
          onClick={handleFormClose}
          color="error"
          variant="contained"
        // className="px-3 py-1 text-sm bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 focus:outline-none transition"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}

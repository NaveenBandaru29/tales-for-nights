// components/raw/RawForm.tsx
'use client';
import dynamic from 'next/dynamic';
import { useCreateRawMutation } from '@/app/store/apis/rawApi';
import { useState } from 'react';
import { MultiValue } from "react-select"
import SelectField from '../ui/SelectField';
import { Loader } from '../ui/Loader';
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

export default function RawForm({ handleFormClose }: { handleFormClose: () => void }) {
  const [content, setContent] = useState('');
  const [selectedTags, setSelectedTags] = useState<MultiValue<Tag>>([])
  const [createRaw, { isLoading }] = useCreateRawMutation();

  const handleTagsChange = (newValues: MultiValue<Tag>) => {
    setSelectedTags(newValues)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    const allTags = selectedTags.map((tag: Tag) => tag.label) || []
    const rawData = {
      content,
      pinned: false,
      tags: allTags
    }
    try {
      await createRaw(rawData).unwrap();
      setContent(''); // Clear form after successful submission
      setSelectedTags([])
    } catch (err) {
      console.error('Failed to create RAW:', err);
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
          placeholder="Enter RAW content..."
          showPreview
          content={content}
          setContent={setContent}

        />
        <SelectField
          isMulti
          isClearable
          options={tags}
          value={selectedTags}
          onChange={handleTagsChange}
          placeholder="Select or Create a tag..."
        />
      </div>


      <button
        type="submit"
        disabled={isLoading || !content.trim()}
        className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-all ease-in-out duration-300"
      >
        {isLoading ? 'Adding...' : 'Add RAW'}
      </button>
    </form>
  );
}

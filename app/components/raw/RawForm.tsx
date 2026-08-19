// components/raw/RawForm.tsx
'use client';
import dynamic from 'next/dynamic';
import { useCreateRawMutation } from '@/app/hooks/mutations/useRawMutation';
import { useState } from 'react';
import { MultiValue } from "react-select"
import SelectField from '../ui/SelectField';
import { Loader } from '../ui/Loader';
import { useCreateCharmMutation } from '@/app/hooks/mutations/useCharmMutation';
import { Button } from '@mui/material';
import { useTheme } from '@/app/context/ThemeContext';
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
	const { mutateAsync: createRaw, isPending: isLoading } = useCreateRawMutation();
	const { mutateAsync: createCharm, isPending: isAdding } = useCreateCharmMutation();
	const { isDarkMode } = useTheme()
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
				await createRaw(data);
			}
			else {
				await createCharm(data);
			}
			setContent(''); // Clear form after successful submission
			setSelectedTags([])
		} catch (err) {
			console.error(`Failed to create ${identifier}:`, err);
		}
		handleFormClose()
	};

	return (

		<form
			onSubmit={handleSubmit}
			className={`space-y-6 max-w-full mx-auto p-8 rounded-xl shadow-lg transition-all hover:shadow-2xl mb-4
            ${isDarkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'}`}
		>
			<div className="relative flex flex-col gap-4">
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
				<button
					type="submit"
					disabled={isLoading || isAdding || !content.trim()}
					className="px-6 py-2.5 rounded-xl font-medium text-sm transition-all duration-200
                               bg-blue-600 hover:bg-blue-700 text-white
                               shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50
                               disabled:opacity-50 disabled:cursor-not-allowed
                               flex items-center gap-2"
				>
					{(isLoading || isAdding) ? 'Adding...' : 'Add'}
				</button>
				<button
					type="button"
					onClick={handleFormClose}
					className="px-6 py-2.5 rounded-xl font-medium text-sm transition-all duration-200
                               bg-gray-100 hover:bg-gray-200 text-gray-700
                               dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-gray-200
                               border border-gray-200 dark:border-slate-700"
				>
					Cancel
				</button>
			</div>
		</form>
	);
}
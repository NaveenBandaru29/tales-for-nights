
// components/tales/TaleForm.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Tag, TaleFormData } from '../../types';
import { useCreateTaleMutation, useUpdateTaleMutation, useGetTaleByIdQuery } from '../../store/apis/talesApi';
import { Loader } from '../ui/Loader';
import TaleEditor from './TaleEditor';
import { MultiValue } from 'react-select';
import SelectField from '../ui/SelectField';


interface TaleFormProps {
  id?: string;
  isEdit?: boolean;
}

export const tags: Tag[] = [
  { value: "Sad Before Bed", label: "Sad Before Bed" },
  { value: "Alone Together", label: "Alone Together" },
  { value: "Lost Letter", label: "Lost Letter" },
  { value: "Secret Diary", label: "Secret Diary" },
  { value: "Grief & Growth", label: "Grief & Growth" },
  { value: "Love — Soft Chaos", label: "Love — Soft Chaos" },
  { value: "Thought Threads", label: "Thought Threads" },
  { value: "Slice of Life", label: "Slice of Life" },
  { value: "Life between Lines", label: "Life between Lines" },

];

export default function TaleForm({ id, isEdit = false }: TaleFormProps) {
  const [formData, setFormData] = useState<TaleFormData>({
    title: '',
    description: '',
    content: '',
    tags: []
  });

  const [formErrors, setFormErrors] = useState({
    title: '',
    description: '',
    content: ''
  });

  const router = useRouter();
  const [createTale, { isLoading: isCreating, error: createError }] = useCreateTaleMutation();
  const [updateTale, { isLoading: isUpdating, error: updateError }] = useUpdateTaleMutation();

  const { data, isLoading: isFetching } = useGetTaleByIdQuery(id || '', {
    skip: !id || !isEdit
  });
  const [, tale,] =
    data && data?.length > 0 ? data : [null, null, null];
  const [selectedTags, setSelectedTags] = useState<MultiValue<Tag>>([])
  const isLoading = isCreating || isUpdating || isFetching;
  const error = createError || updateError;

  const handleTagsChange = (newValues: MultiValue<Tag>) => {
    setFormData((prev) => ({
      ...prev,
    }));
    setSelectedTags(newValues)
  }

  useEffect(() => {
    if (tale && isEdit) {
      setFormData({
        title: tale.title,
        description: tale.description,
        content: tale.content,
        tags: tale.tags
      });
      console.log(tale?.tags/* .map(tag => ({ value: tag, label: tag })) */)
      setSelectedTags(tale?.tags?.map(tag => ({ value: tag, label: tag })) || [])
    }
  }, [tale, isEdit]);

  const validateForm = (): boolean => {
    let valid = true;
    const newErrors = {
      title: '',
      description: '',
      content: ''
    };

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
      valid = false;
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
      valid = false;
    }

    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
      valid = false;
    }

    setFormErrors(newErrors);
    return valid;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when typing
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const setContent = (value: string) => {

    setFormData((prev) => ({
      ...prev,
      content: value
    }))
    if (formErrors["content"]) {
      setFormErrors((prev) => ({
        ...prev,
        content: ''
      }));
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }
    const taleData = { ...formData, tags: selectedTags.map(tag => tag.label) }
    console.log(taleData)
    try {
      if (isEdit && id) {
        await updateTale({ id, taleData }).unwrap();
      } else {
        await createTale(taleData).unwrap();
      }
      router.push('/admin');
    } catch (err) {
      console.error('Failed to save tale:', err);
    }
  };

  if (isFetching) {
    return (
      <Loader loadingText='Loading Tale...' />
    );
  }

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6 sm:p-8">
        <h2 className="text-2xl font-bold mb-6">
          {isEdit ? 'Edit Tale' : 'Create New Tale'}
        </h2>

        {error && (
          <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-md">
            Failed to {isEdit ? 'update' : 'create'} tale. Please try again.
          </div>
        )}

        <form onSubmit={handleSubmit} className='flex flex-col gap-6'>
          <div>
            <label htmlFor="title" className="block text-gray-700 mb-2">
              Title <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${formErrors.title ? 'border-red-500' : 'border-gray-300'
                }`}
              placeholder="Enter tale title"
            />
            {formErrors.title && (
              <p className="mt-1 text-red-600 text-sm">{formErrors.title}</p>
            )}
          </div>

          <div>
            <label htmlFor="description" className="block text-gray-700 mb-2">
              Description <span className="text-red-600">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${formErrors.description ? 'border-red-500' : 'border-gray-300'
                }`}
              placeholder="Enter a brief description"
            />
            {formErrors.description && (
              <p className="mt-1 text-red-600 text-sm">{formErrors.description}</p>
            )}
          </div>
          <div >
            <label htmlFor="description" className="block text-gray-700 mb-2">
              Tags {/* <span className="text-red-600">*</span> */}
            </label>
            <SelectField
              isMulti
              isClearable
              options={tags}
              value={selectedTags}
              onChange={handleTagsChange}
              placeholder="Select or Create a tag..."
            />
          </div>

          <div>
            {/* <label htmlFor="content" className="block text-gray-700 mb-2">
              Content <span className="text-red-600">*</span>
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows={10}
              className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${formErrors.content ? 'border-red-500' : 'border-gray-300'
                }`}
              placeholder="Enter the tale content"
            /> */}

            {/* <CustomEditor content={formData.content} setContent={setContent} /> */}
            {formData.content && <TaleEditor content={formData.content} setContent={setContent} />}
            {formErrors.content && (
              <p className="mt-1 text-red-600 text-sm">{formErrors.content}</p>
            )}
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300"
            >
              {isLoading
                ? isEdit
                  ? 'Updating...'
                  : 'Creating...'
                : isEdit
                  ? 'Update Tale'
                  : 'Create Tale'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
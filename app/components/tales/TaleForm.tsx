'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Tag, TaleFormData } from '../../types';
import { useCreateTaleMutation, useUpdateTaleMutation } from '@/app/hooks/mutations/useTalesMutation';
import { useGetTaleByIdQuery } from '@/app/hooks/queries/useTalesQuery';
import { Loader } from '../ui/Loader';
import { MultiValue } from 'react-select';
import SelectField from '../ui/SelectField';
import CustomEditor from '../common/CustomEditor';
import { Button } from '@mui/material';
import { ArrowBackRounded } from '@mui/icons-material';
import HashTagIcon from '@/public/Icons/HashTagIcon';

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
  const { mutateAsync: createTale, isPending: isCreating, error: createError } = useCreateTaleMutation();
  const { mutateAsync: updateTale, isPending: isUpdating, error: updateError } = useUpdateTaleMutation();

  const { data, isLoading: isFetching } = useGetTaleByIdQuery(id || '', {
    skip: !id || !isEdit
  });
  const isNewFormat = Array.isArray(data) && data.length === 3;
  const tale = isNewFormat ? data[1] : (data && (Array.isArray(data) ? data[0] : data)) || null;
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
      // console.log(tale?.tags/* .map(tag => ({ value: tag, label: tag })) */)
      setSelectedTags(tale?.tags?.map((tag: string) => ({ value: tag, label: tag })) || [])
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
    // console.log(taleData)
    try {
      if (isEdit && id) {
        await updateTale({ id, taleData });
      } else {
        await createTale(taleData);
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
    <div className="mx-auto mt-4 sm:mt-10 relative max-w-7xl px-10 sm:px-14 lg:px-20 pb-10 group">
      <div className="relative bg-white/60 dark:bg-slate-900/40 backdrop-blur-3xl rounded-[2rem] sm:rounded-[2.5rem] shadow-2xl border border-white/60 dark:border-slate-700/50 overflow-visible transition-all duration-300 z-10">
        
        {/* Subtle inner glow for premium glass effect */}
        <div className="absolute inset-0 rounded-[2rem] sm:rounded-[2.5rem] border border-white/20 dark:border-white/5 pointer-events-none z-0"></div>

        <div className="relative p-6 sm:p-10 md:p-14 z-10">
          
          <div className="mb-10 flex justify-between items-center">
            <button
              type="button"
              onClick={() => router.back()}
              className="cursor-pointer inline-flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-semibold text-gray-600 dark:text-gray-300 bg-white/40 dark:bg-slate-800/40 hover:bg-white/80 dark:hover:bg-slate-800/80 border border-gray-200/60 dark:border-gray-700/60 rounded-full shadow-sm hover:shadow-md transition-all duration-300 backdrop-blur-md group/btn"
            >
              <span className="transform transition-transform duration-300 group-hover/btn:-translate-x-1.5 opacity-80 group-hover/btn:opacity-100 group-hover/btn:text-red-500">
                <ArrowBackRounded sx={{ height: '18px', width: '18px' }} />
              </span>
              <span className="group-hover/btn:text-gray-900 dark:group-hover/btn:text-white transition-colors">Cancel</span>
            </button>
            <h2 className="text-sm font-bold tracking-widest uppercase text-blue-600 dark:text-blue-400 opacity-80">
              {isEdit ? 'Editing Tale' : 'New Tale'}
            </h2>
          </div>

          {error && (
            <div className="mb-8 p-4 bg-red-100/80 dark:bg-red-900/50 border border-red-200 dark:border-red-800/50 text-red-700 dark:text-red-200 rounded-xl backdrop-blur-sm shadow-sm">
              Failed to {isEdit ? 'update' : 'create'} tale. Please try again.
            </div>
          )}

          <form onSubmit={handleSubmit} className='flex flex-col'>
            {/* Title Input matching H1 */}
            <div className="mb-8 sm:mb-12 group/input relative">
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={`w-full bg-transparent border-b-2 border-transparent hover:border-gray-200 dark:hover:border-gray-700 focus:border-blue-500 focus:outline-none focus:ring-0 text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white pb-2 drop-shadow-sm break-words leading-tight transition-colors duration-300 placeholder:text-gray-300 dark:placeholder:text-gray-700 ${formErrors.title ? 'border-red-500' : ''}`}
                placeholder="Tale Title..."
              />
              {formErrors.title && <p className="absolute -bottom-6 left-0 text-red-500 text-sm font-medium">{formErrors.title}</p>}
            </div>

            {/* Tags matching the Tag section */}
            <div className="mb-8 sm:mb-12 relative z-20 flex items-start sm:items-center gap-3 flex-col sm:flex-row">
              <span className="text-blue-500 dark:text-blue-400 text-lg sm:text-xl opacity-80 mt-2 sm:mt-0">
                <HashTagIcon />
              </span>
              <div className="w-full sm:w-96">
                <SelectField
                  isMulti
                  isClearable
                  options={tags}
                  value={selectedTags}
                  onChange={handleTagsChange}
                  placeholder="Select tags..."
                />
              </div>
            </div>

            {/* Description matching Overview box */}
            <div className="bg-white/40 dark:bg-slate-800/30 border border-white/60 dark:border-slate-700/50 p-6 sm:p-8 rounded-[1.5rem] sm:rounded-[2rem] mb-8 sm:mb-12 backdrop-blur-md shadow-sm relative group/textarea">
              <h2 className="text-[11px] sm:text-xs uppercase tracking-widest font-bold text-blue-600 dark:text-blue-400 mb-3 opacity-90">
                Overview
              </h2>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className={`w-full bg-transparent border-0 p-0 text-gray-800 dark:text-gray-200 leading-relaxed text-sm sm:text-base break-words font-medium focus:ring-0 resize-none placeholder:text-gray-400 dark:placeholder:text-gray-500 ${formErrors.description ? 'ring-2 ring-red-500 rounded-lg p-2' : ''}`}
                placeholder="Write a brief overview..."
              />
              {formErrors.description && <p className="absolute -bottom-6 left-0 text-red-500 text-sm font-medium">{formErrors.description}</p>}
            </div>

            {/* Content matching Body */}
            <div className="relative z-10 mb-8 sm:mb-12">
              <h2 className="text-[11px] sm:text-xs uppercase tracking-widest font-bold text-gray-400 dark:text-gray-500 mb-4 opacity-90 ml-1">
                Content
              </h2>
              <div className={`rounded-xl overflow-hidden transition-all duration-300 ${formErrors.content ? 'ring-2 ring-red-500/50' : ''}`}>
                {isEdit ? formData && formData.content &&
                  <CustomEditor content={formData.content} setContent={setContent} showPreview /> :
                  <CustomEditor content={formData.content} setContent={setContent} showPreview />}
              </div>
              {formErrors.content && <p className="mt-2 text-red-500 text-sm font-medium">{formErrors.content}</p>}
            </div>

            {/* Save Button */}
            <div className="flex justify-end mt-4">
              <Button
                type="submit"
                disabled={isLoading}
                variant='contained'
                sx={{
                  textTransform: 'none',
                  fontWeight: 600,
                  borderRadius: '0.75rem',
                  padding: '0.8rem 3rem',
                  fontSize: '1rem',
                  boxShadow: '0 4px 14px 0 rgba(59, 130, 246, 0.39)',
                  background: 'linear-gradient(135deg, #3b82f6 0%, #4f46e5 100%)',
                  '&:hover': {
                    boxShadow: '0 6px 20px rgba(59, 130, 246, 0.23)',
                    transform: 'translateY(-2px)'
                  },
                  '&:disabled': {
                    background: 'rgba(148, 163, 184, 0.2)',
                    color: 'rgba(148, 163, 184, 0.7)'
                  },
                  transition: 'all 0.2s ease'
                }}
              >
                {isLoading ? (isEdit ? 'Saving...' : 'Publishing...') : (isEdit ? 'Save Changes' : 'Publish Tale')}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
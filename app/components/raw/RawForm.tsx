// components/raw/RawForm.tsx
'use client';

import { useCreateRawMutation } from '@/app/store/apis/rawApi';
import { useState } from 'react';

export default function RawForm({handleFormClose}:{handleFormClose:()=>void}) {
  const [content, setContent] = useState('');
  const [createRaw, { isLoading }] = useCreateRawMutation();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    
    try {
      await createRaw({ content,pinned:false }).unwrap();
      setContent(''); // Clear form after successful submission
    } catch (err) {
      console.error('Failed to create RAW:', err);
    }
    handleFormClose()
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-full mx-auto bg-white p-8 rounded-xl shadow-lg transition-all hover:shadow-2xl mb-4">
      <div className="relative">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter RAW content..."
          className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all ease-in-out duration-300"
          rows={3}
          required
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

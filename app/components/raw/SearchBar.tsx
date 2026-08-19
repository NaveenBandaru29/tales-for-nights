'use client';

import SearchIcon from '@/public/Icons/SearchIcon';
import { useState, useEffect } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string
}

export default function SearchBar({ onSearch, placeholder }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  // Use useEffect to update the debounced query after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500); // Delay in ms (500ms)

    // Clear the timeout if the query changes before the timer is complete
    return () => clearTimeout(timer);
  }, [query]);

  // Trigger the search when the debounced query changes
  useEffect(() => {
    if (debouncedQuery) {
      onSearch(debouncedQuery);
    }
    else {
      onSearch("")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuery]);

  return (
    <div className="relative w-full group flex-grow">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder || "Search..."}
        className="w-full py-3 pl-12 pr-5 rounded-full border border-white/60 dark:border-slate-700/50 bg-white/60 dark:bg-slate-900/40 backdrop-blur-3xl text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/50 transition-all duration-300 shadow-sm hover:shadow-md dark:shadow-none hover:bg-white/90 dark:hover:bg-slate-900/60"
      />
      <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center text-gray-400 dark:text-gray-500 pointer-events-none transition-colors duration-300 group-focus-within:text-blue-500">
        <SearchIcon className="text-xl" />
      </div>
    </div>
  );
}
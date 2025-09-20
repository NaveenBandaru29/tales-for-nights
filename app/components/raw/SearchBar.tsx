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
    <div className="relative w-full">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder || "Search..."}
        className="w-full py-3 pl-10 pr-4 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300 shadow-sm"
      />
      <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center text-gray-500 dark:text-gray-400">
        <SearchIcon className="text-xl" />
      </div>
    </div>
  );
}
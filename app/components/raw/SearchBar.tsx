'use client';

import SearchIcon from '@/public/Icons/SearchIcon';
import { useState, useEffect } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?:string
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
    else{
      onSearch("")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuery]);

  return (
    <div className="relative w-full max-w-lg mx-auto">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder || "Search..."}
        className="w-full py-3 pl-10 pr-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out shadow-md hover:shadow-lg outline-none"
      />
      <div className="absolute left-0 top-0 flex items-center justify-center h-full w-10 text-gray-500">
        <SearchIcon className="text-xl" />
      </div>
    </div>
  );
}

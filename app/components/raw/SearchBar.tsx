'use client';

import { useState, useEffect } from 'react';
import { FiSearch } from "react-icons/fi";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
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
  }, [debouncedQuery]);

  return (
    <div className="relative w-full max-w-lg mx-auto">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
        className="w-full py-3 pl-10 pr-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out shadow-md hover:shadow-lg outline-none"
      />
      <div className="absolute left-0 top-0 flex items-center justify-center h-full w-10 text-gray-500">
        <FiSearch className="text-xl" />
      </div>
    </div>
  );
}

// components/ui/Pagination.tsx
'use client';

import NextIcon from "@/public/Icons/NextIcon";
import PreviousIcon from "@/public/Icons/PreviousIcon";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  // Create array of page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5; // Default for large screens

    // Determine the page numbers to show based on the screen size
    const mobileMaxPagesToShow = 3; // For mobile, show 2 or 3 pages

    let maxPages = maxPagesToShow;
    if (window.innerWidth <= 640) { // Tailwind's 'sm' breakpoint, i.e., mobile screens
      maxPages = mobileMaxPagesToShow;
    }

    if (totalPages <= maxPages) {
      // Show all pages if total is less than or equal to max
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      // Determine start and end of page numbers to show
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);

      // Adjust if at the start or end
      if (currentPage <= 3) {
        endPage = 4;
      } else if (currentPage >= totalPages - 2) {
        startPage = totalPages - 3;
      }

      // Add ellipsis after first page if needed
      if (startPage > 2) {
        pages.push(-1); // Use -1 to represent ellipsis
      }

      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      // Add ellipsis before last page if needed
      if (endPage < totalPages - 1) {
        pages.push(-2); // Use -2 to represent ellipsis
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex justify-center mt-8">
      <nav className="inline-flex items-center space-x-1 sm:space-x-2 rounded-full shadow-md bg-white py-2 px-2 sm:px-4">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 sm:p-3 rounded-full cursor-pointer bg-gray-200 text-gray-600 hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed transition duration-200 ease-in-out"
        >
          <span className="text-lg font-semibold"><PreviousIcon /></span>
        </button>

        {getPageNumbers().map((pageNum, index) =>
          pageNum < 0 ? (
            // Render ellipsis
            <span key={`ellipsis-${index}`} className=" text-gray-500">
              ...
            </span>
          ) : (
            // Render page number
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              className={`px-4 py-2 rounded-full cursor-pointer text-sm font-medium transition-colors duration-300 ease-in-out ${
                currentPage === pageNum
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-blue-100 hover:text-blue-600'
              }`}
            >
              {pageNum}
            </button>
          )
        )}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 sm:p-3 rounded-full cursor-pointer bg-gray-200 text-gray-600 hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed transition duration-200 ease-in-out"
        >
          <span className="text-lg font-semibold"><NextIcon /></span>
        </button>
      </nav>
    </div>
  );
}

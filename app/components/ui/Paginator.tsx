'use client';

import { useState, useEffect } from 'react';
import { Pagination } from "@mui/material";

interface PaginatorProps {
  count: number;
  page: number;
  onChange: (e: any, page: number) => void;
}

const Paginator = ({ count, page, onChange }: PaginatorProps) => {
  const [windowWidth, setWindowWidth] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 1024);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup on unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getSize = () => {
    if (windowWidth < 300) return 'small';
    if (windowWidth < 600) return 'medium';
    return 'large';
  };

  return (
    <Pagination
      sx={{
        '& .MuiPaginationItem-root:hover': {
          backgroundColor: '#e0e0e0',
        },
        '& .MuiPaginationItem-previousNext': {
          backgroundColor: '#d0e4ff',
          color: '#2b7fff',
          '&:hover': {
            backgroundColor: '#2b7fff',
            color: 'white',
          },
        },
        '& .MuiPaginationItem-previousNext.Mui-disabled': {
          backgroundColor: '#f0f0f0',
          color: '#aaa',
        },
        '& .Mui-selected': {
          backgroundColor: '#2b7fff',
          color: 'white',
        },
        backgroundColor: '#fff',
        boxShadow: 3,
        borderRadius: 20,
        padding: 1,
      }}
      count={count}
      page={page || 1}
      onChange={onChange}
      boundaryCount={1}
      siblingCount={1}
      size={getSize()}
      color="primary"
    />
  );
};

export default Paginator;

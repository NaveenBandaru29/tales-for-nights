'use client';

import { useState, useEffect } from 'react';
import { Pagination } from "@mui/material";
import { useTheme } from '@/app/context/ThemeContext';

interface PaginatorProps {
  count: number;
  page: number;
  onChange: (e: any, page: number) => void;
}

const Paginator = ({ count, page, onChange }: PaginatorProps) => {
  const [windowWidth, setWindowWidth] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 1024);
  const { isDarkMode } = useTheme();
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

  // Define colors based on the theme
  const backgroundColor = isDarkMode ? '#1e1e1e' : '#ffffff';
  const selectedColor = isDarkMode ? '#3f51b5' : '#1e88e5';
  const hoverColor = isDarkMode ? '#2c2c2c' : '#f0f0f0';
  const disabledColor = isDarkMode ? '#242424' : '#fafafa';
  const disabledTextColor = isDarkMode ? '#5c5c5c' : '#cccccc';
  const nextPrevColor = isDarkMode ? '#333333' : '#e0e0e0';
  const nextPrevHoverColor = isDarkMode ? '#444444' : '#c0c0c0';

  // Define text color based on theme
  const textColor = isDarkMode ? '#ffffff' : '#333333';

  return (
    <Pagination
      sx={{
        '& .MuiPaginationItem-root': {
          color: textColor,
          '&:hover': {
            backgroundColor: hoverColor,
          },
        },
        '& .MuiPaginationItem-previousNext': {
          backgroundColor: nextPrevColor,
          color: textColor, // Use the new theme-aware text color
          '&:hover': {
            backgroundColor: nextPrevHoverColor,
            color: textColor,
          },
        },
        '& .MuiPaginationItem-previousNext.Mui-disabled': {
          backgroundColor: disabledColor,
          color: disabledTextColor,
        },
        '& .Mui-selected': {
          backgroundColor: selectedColor,
          color: '#ffffff',
        },
        backgroundColor: backgroundColor,
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
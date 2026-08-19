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

  // Define colors and styles based on the theme
  const backgroundColor = isDarkMode ? 'rgba(15, 23, 42, 0.6)' : 'rgba(255, 255, 255, 0.7)';
  const borderColor = isDarkMode ? 'rgba(51, 65, 85, 0.5)' : 'rgba(229, 231, 235, 0.8)';
  const shadow = isDarkMode ? '0 8px 30px rgba(0, 0, 0, 0.2)' : '0 8px 30px rgba(0, 0, 0, 0.08)';
  const selectedColor = '#3b82f6'; // Tailwind blue-500
  const hoverColor = isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)';
  const disabledColor = 'transparent';
  const disabledTextColor = isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.25)';
  const nextPrevHoverColor = isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.06)';
  const textColor = isDarkMode ? '#f1f5f9' : '#334155'; // slate-100 or slate-700

  return (
    <Pagination
      sx={{
        backgroundColor,
        backdropFilter: 'blur(24px)',
        border: `1px solid ${borderColor}`,
        boxShadow: shadow,
        borderRadius: '100px',
        padding: '8px 16px',
        display: 'inline-flex',
        '& .MuiPaginationItem-root': {
          color: textColor,
          fontWeight: 600,
          transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
          '&:hover': {
            backgroundColor: hoverColor,
            transform: 'translateY(-1px)',
          },
        },
        '& .MuiPaginationItem-previousNext': {
          color: textColor,
          '&:hover': {
            backgroundColor: nextPrevHoverColor,
            transform: 'translateY(-1px)',
          },
        },
        '& .MuiPaginationItem-previousNext.Mui-disabled': {
          backgroundColor: disabledColor,
          color: disabledTextColor,
          transform: 'none',
        },
        '& .Mui-selected': {
          backgroundColor: `${selectedColor} !important`,
          color: '#ffffff',
          boxShadow: `0 4px 12px ${selectedColor}66`,
          '&:hover': {
            backgroundColor: `${selectedColor} !important`,
            transform: 'scale(1.05) translateY(-1px)',
            boxShadow: `0 6px 16px ${selectedColor}88`,
          },
        },
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
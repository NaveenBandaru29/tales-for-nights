import { Button, useTheme } from '@mui/material';
import React from 'react';

interface RawDeleteProps {
    handleDelete: () => void;
    isDeleting: boolean;
    handleCancel: () => void;
}

const RawDelete = ({ handleCancel, handleDelete, isDeleting }: RawDeleteProps) => {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    return (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 rounded-lg shadow-md transition-colors duration-300
                    bg-gray-100 dark:bg-gray-900 bg-opacity-90 dark:bg-opacity-90">
            <p className="text-center mb-4 font-semibold
                      text-gray-800 dark:text-gray-200">
                Are you sure you want to delete this?
            </p>
            <div className="flex gap-4 items-center">
                <Button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    color='error'
                    variant='contained'
                    sx={{
                        '&.Mui-disabled': {
                            backgroundColor: isDarkMode ? '#444' : '#ccc',
                            color: isDarkMode ? '#aaa' : '#888',
                        },
                    }}
                >
                    {isDeleting ? "Deleting..." : "Yes, Delete"}
                </Button>
                <Button
                    onClick={handleCancel}
                    color='inherit'
                    variant='contained'
                    sx={{
                        backgroundColor: isDarkMode ? '#555' : '#e0e0e0',
                        color: isDarkMode ? '#fff' : '#333',
                        '&:hover': {
                            backgroundColor: isDarkMode ? '#666' : '#d5d5d5',
                        },
                    }}
                >
                    Cancel
                </Button>
            </div>
        </div>
    );
};

export default RawDelete;
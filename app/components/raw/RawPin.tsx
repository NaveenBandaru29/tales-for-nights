import React from 'react';
import { Button, useTheme } from '@mui/material';

interface RawPinProps {
    handlePin: () => void;
    isPinning: boolean;
    handleCancel: () => void;
    pinned: boolean;
}

const RawPin = ({ handleCancel, handlePin, isPinning, pinned }: RawPinProps) => {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    const btnText = isPinning
        ? (pinned ? "Unpinning..." : "Pinning...")
        : (pinned ? "Yes, Unpin" : "Yes, Pin");

    return (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 rounded-lg shadow-md transition-colors duration-300
                    bg-gray-100 dark:bg-gray-900 bg-opacity-90 dark:bg-opacity-90">
            <p className="text-center mb-4 font-semibold
                      text-gray-800 dark:text-gray-200">
                Are you sure you want to {pinned ? "unpin" : "pin"} this?
            </p>
            <div className="flex gap-4 items-center">
                <Button
                    onClick={handlePin}
                    disabled={isPinning}
                    variant='contained'
                    color="primary"
                    sx={{
                        backgroundColor: isDarkMode ? theme.palette.primary.dark : theme.palette.info.main,
                        color: isDarkMode ? '#fff' : '#000',
                        '&:hover': {
                            backgroundColor: isDarkMode ? theme.palette.primary.light : theme.palette.info.dark,
                        },
                        '&.Mui-disabled': {
                            backgroundColor: isDarkMode ? '#444' : '#ccc',
                            color: isDarkMode ? '#aaa' : '#888',
                        },
                    }}
                >
                    {btnText}
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

export default RawPin;
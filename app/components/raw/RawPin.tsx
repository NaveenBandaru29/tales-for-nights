import React from 'react';
import { motion } from 'framer-motion';
import { PushPinOutlined } from '@mui/icons-material';

interface RawPinProps {
    handlePin: () => void;
    isPinning: boolean;
    handleCancel: () => void;
    pinned: boolean;
}

const RawPin = ({ handleCancel, handlePin, isPinning, pinned }: RawPinProps) => {
    const btnText = isPinning
        ? (pinned ? "Unpinning..." : "Pinning...")
        : (pinned ? "Yes, Unpin" : "Yes, Pin");

    return (
        <motion.div 
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(8px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            className="absolute inset-0 z-30 flex flex-col items-center justify-center rounded-[2rem] bg-white/70 dark:bg-slate-900/80 transition-all duration-300"
        >
            <motion.div 
                initial={{ scale: 0.9, y: 10, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="flex flex-col items-center"
            >
                <div className="mb-4 p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full text-purple-500 dark:text-purple-400">
                    <PushPinOutlined fontSize="large" />
                </div>
                <p className="text-center mb-6 font-semibold text-gray-800 dark:text-gray-100 text-lg">
                    {pinned ? "Unpin this item?" : "Pin this item?"}
                </p>
                <div className="flex gap-3 items-center">
                    <button
                        onClick={handleCancel}
                        disabled={isPinning}
                        className="px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200
                                   bg-gray-100 hover:bg-gray-200 text-gray-700
                                   dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-gray-200
                                   border border-gray-200 dark:border-slate-700
                                   disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handlePin}
                        disabled={isPinning}
                        className="px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200
                                   bg-purple-500 hover:bg-purple-600 text-white
                                   shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50
                                   disabled:opacity-50 disabled:cursor-not-allowed
                                   flex items-center gap-2"
                    >
                        {btnText}
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default RawPin;
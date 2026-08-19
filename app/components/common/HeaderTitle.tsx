'use client';

import dynamic from 'next/dynamic';
import React from 'react';
import { motion } from 'framer-motion';

const AudioPlayer = dynamic(() => import('./AudioPlayer/AudioPlayer'), { ssr: false });

interface HeaderTitleProps {
  title: string;
  subTitle: string;
  showAudioPlayer?: boolean;
}

const HeaderTitle = ({ title, subTitle, showAudioPlayer = true }: HeaderTitleProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="flex flex-row justify-between items-center mb-6 sm:mb-8"
    >
      <div className="flex flex-col">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 dark:from-white dark:via-blue-300 dark:to-white pb-1 drop-shadow-sm">
          {title}
        </h1>
        <p className="text-sm sm:text-base font-medium tracking-wide text-gray-500 dark:text-gray-400 mt-2">
          {subTitle}
        </p>
      </div>
      {showAudioPlayer && (
        <div className="pl-4">
          <AudioPlayer source={"/theme.mp3"} />
        </div>
      )}
    </motion.div>
  );
};

export default HeaderTitle;

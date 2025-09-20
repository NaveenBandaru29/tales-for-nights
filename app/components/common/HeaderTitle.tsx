import dynamic from 'next/dynamic';
import React from 'react'
const AudioPlayer = dynamic(() => import('./AudioPlayer/AudioPlayer'));


interface HeaderTitleProps {
    title: string;
    subTitle: string;
    showAudioPlayer?: boolean;
}

const HeaderTitle = ({ title, subTitle, showAudioPlayer = true }: HeaderTitleProps) => {
    return (
        <div className="flex flex-row justify-between items-center mb-2 sm:mb-4">
            <div className="flex flex-col mb-4 sm:mb-0">
                <h1 className="text-3xl font-extrabold tracking-tight dark:text-gray-100">
                    {title}
                </h1>
                <p className="text-sm font-mono text-gray-500 dark:text-gray-400 mt-1">
                    {subTitle}
                </p>
            </div>
            {showAudioPlayer && <AudioPlayer source={"/theme.mp3"} />}
        </div>
    )
}

export default HeaderTitle
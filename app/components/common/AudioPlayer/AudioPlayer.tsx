'use client'
import React, { useState, useRef, useEffect } from 'react';
import { PlayCircleRounded, PauseCircleRounded } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";

interface AudioPlayerProps {
  source: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ source }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(source);
      audioRef.current.loop = true;
      audioRef.current.muted = true; // Add this line
      audioRef.current.play().catch(() => { });
    }

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audioRef.current.addEventListener('play', handlePlay);
    audioRef.current.addEventListener('pause', handlePause);

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('play', handlePlay);
        audioRef.current.removeEventListener('pause', handlePause);
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [source]);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(error => {
          console.log('User interaction required to play audio:', error);
          setIsPlaying(false);
        });
      }
    }
  };

  return (
    <div className="flex items-center gap-2 transition-colors duration-500">
      <Tooltip title="Theme music">
        <IconButton
          onClick={togglePlayPause}
          className="transition-transform duration-300 transform hover:scale-105 active:scale-95"
        >
          {isPlaying ? (
            <PauseCircleRounded className='text-red-400' fontSize='large' />
          ) : (
            <PlayCircleRounded className='text-green-500' fontSize='large' />
          )}
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default AudioPlayer;
'use client'
import React, { useState, useRef, useEffect } from 'react';
import { FaCirclePause, FaCirclePlay } from 'react-icons/fa6';
const AudioPlayer: React.FC = () => {
  // State to track if the audio is playing or paused
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  
  // Ref to hold the audio element
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const playAudio = async () => {
      try {
        if (audioRef.current) {
          await audioRef.current.play();
          setIsPlaying(true); // Update the state to reflect that the audio is playing
        }
      } catch (error) {
        console.log('Error playing audio. Please check the file format or your browser settings.');
      }
    };

    playAudio();
  }, []);
  // Function to toggle play/pause
  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause(); // Pause the audio
      } else {
        audioRef.current.play(); // Play the audio
      }
      setIsPlaying(!isPlaying); // Toggle play state
    }
  };

  return (
    <div className="flex items-center gap-2">
      <audio ref={audioRef} loop>
        <source src={"/theme.mp3"} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
      <span>Music</span>
      <button 
        onClick={togglePlayPause} 
        className="rounded font-bold text-4xl text-white active:scale-90 duration-300"
      >
        {isPlaying ? <FaCirclePause className='fill-red-400' /> : <FaCirclePlay className='fill-green-500' />}
      </button>
    </div>
  );
};

export default AudioPlayer;

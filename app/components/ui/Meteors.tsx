"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const Meteors = ({ number = 20 }: { number?: number }) => {
  const [meteors, setMeteors] = useState<
    { id: number; x: number; y: number; delay: number; duration: number }[]
  >([]);

  useEffect(() => {
    // Safely get screen width, fallback to large default for SSR
    const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1600;
    
    // Generate meteors with random starting positions
    const newMeteors = Array.from({ length: number }).map((_, i) => ({
      id: i,
      // Since they travel DOWN-LEFT, they need to spawn from the TOP-RIGHT or far RIGHT.
      // We spawn them from x=0 up to x=screenWidth+1500
      x: Math.floor(Math.random() * (screenWidth + 1500)), 
      // Spawn them slightly above the screen up to way above the screen
      y: Math.floor(Math.random() * -1000) - 100,  
      delay: Math.random() * 12, // Random stagger spread out more
      duration: Math.random() * 10 + 8, // Fall duration between 8s and 18s for a slower, calmer effect
    }));
    setMeteors(newMeteors);
  }, [number]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {meteors.map((meteor) => (
        <motion.span
          key={meteor.id}
          initial={{ opacity: 0, x: meteor.x, y: meteor.y }}
          animate={{
            opacity: [0, 1, 1, 0], // Stay visible longer, fade out at the end
            x: meteor.x - 3000, // Move far left
            y: meteor.y + 3000, // Move far down
          }}
          transition={{
            duration: meteor.duration,
            delay: meteor.delay,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute h-[2px] w-[2px] rounded-full bg-slate-600 dark:bg-slate-300 shadow-[0_0_0_1px_#00000020] dark:shadow-[0_0_0_1px_#ffffff10]"
        >
          {/* Meteor Tail - Rotated -45deg to point up-right as the meteor falls down-left */}
          <div className="absolute top-1/2 left-0 -z-10 h-[1px] w-[150px] origin-left -rotate-45 -translate-y-1/2 bg-gradient-to-r from-slate-600 dark:from-slate-300 to-transparent opacity-30 dark:opacity-40" />
        </motion.span>
      ))}
    </div>
  );
};

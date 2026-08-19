"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

const navLinks = [
  { label: "Scars", path: "/", show: true },
  { label: "Charm", path: "/charm", show: true, hot: true },
  { label: "Venom ☠️", path: "/raw", show: true },
];

const NavTags = () => {
  const pathname = usePathname();

  return (
    <div className="pb-6 pt-2 flex items-center justify-center md:justify-start space-x-2">
      {navLinks.map((link) => (
        link.show && (
          <Link
            key={link.path}
            href={link.path}
            className="relative px-5 py-2.5 rounded-full text-sm sm:text-base font-medium transition-colors group"
          >
            <span className={`relative z-10 flex items-center ${pathname === link.path ? "text-blue-600 dark:text-blue-400 font-semibold" : "text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white"}`}>
              {link.label}
              {link.hot && (
                <span className="ml-2 flex size-2 relative">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex size-2 rounded-full bg-red-500"></span>
                </span>
              )}
            </span>
            {pathname === link.path && (
              <motion.div
                layoutId="navtags-active-pill"
                className="absolute inset-0 bg-blue-50 dark:bg-blue-900/30 rounded-full shadow-sm"
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              />
            )}
          </Link>
        )
      ))}
    </div>
  );
};

export default NavTags;

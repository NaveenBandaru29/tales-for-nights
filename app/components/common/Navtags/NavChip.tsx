'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

export interface NavChipProps {
    path: string,
    name: string;
    hot?: boolean
}

const NavChip = ({ path, name, hot }: NavChipProps) => {
    const pathname = usePathname()
    const isActive = (pathname === path)

    return (
        <Link
            href={path}
            className={`
                relative 
                text-sm sm:text-base 
                px-4 py-2 
                rounded-full 
                font-medium
                transition-colors duration-300
                ${isActive
                    ? "bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900"
                    : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                }
                hover:bg-gray-300 dark:hover:bg-gray-600
            `}
        >
            {name}
            {
                hot && (
                    <span className="absolute top-1 right-1 flex size-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex size-2 rounded-full bg-red-500"></span>
                    </span>
                )
            }
        </Link>
    )
}

export default NavChip
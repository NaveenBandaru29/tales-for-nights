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
        <Link href={path} className={`relative text-white text-[16px] sm:text-md px-3 sm:px-4 py-1 rounded-full hover:bg-blue-400 duration-300 ${isActive ? "bg-blue-500" : "bg-gray-400"} `}>
            {name}
            {
                hot &&
                <div className='absolute top-[2px] right-[2px]'>
                    <span className="relative flex size-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex size-2 rounded-full bg-red-500"></span>
                    </span>
                </div>
            }
        </Link>
    )
}

export default NavChip

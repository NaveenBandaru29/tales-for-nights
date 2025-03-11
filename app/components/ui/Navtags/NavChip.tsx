'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

export interface NavChipProps{
    path:string,
    name:string
}

const NavChip = ({path,name}:NavChipProps) => {
    const pathname = usePathname()
    const isActive = (pathname === path)
    // console.log("path",pathname,path,isActive)
    
  return (
        <Link href={path} className={`text-white px-4 py-1 rounded-full hover:bg-blue-400 duration-300 ${isActive? "bg-blue-500" :"bg-gray-400"}`}>
            {name}
        </Link>
  )
}

export default NavChip

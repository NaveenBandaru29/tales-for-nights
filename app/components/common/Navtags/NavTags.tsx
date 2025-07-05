import React from 'react'
import NavChip, { NavChipProps } from './NavChip'


const navChips: NavChipProps[] = [
  {
    name: "Scars",
    path: "/"
  },
  // {
  //   name: "Charm",
  //   path: "/quotes"
  // },
  {
    name: "Venom ☠️",
    path: "/raw"
  },
  // {
  //   name:"Lyrics",
  //   path:'/lyrics'
  // },

]

const NavTags = () => {
  return (
    <div className='pb-4 flex gap-2 sm:gap-4 flex-wrap'>
      {
        navChips?.map(({ name, path }: NavChipProps, index) => (
          <NavChip key={path + index} name={name} path={path} />
        ))
      }
    </div>
  )
}

export default NavTags

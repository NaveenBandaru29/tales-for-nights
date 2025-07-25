import React from 'react'
import NavChip, { NavChipProps } from './NavChip'


const navChips: NavChipProps[] = [
  {
    name: "Scars",
    path: "/",
    hot: false
  },
  {
    name: "Charm",
    path: "/charm",
    hot: true
  },
  {
    name: "Venom ☠️",
    path: "/raw",
    hot: false
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
        navChips?.map(({ name, path, hot }: NavChipProps, index) => (
          <NavChip key={path + index} name={name} path={path} hot={hot} />
        ))
      }
    </div>
  )
}

export default NavTags

import CharmList from '@/app/components/charm/CharmList'
import HeaderTitle from '@/app/components/common/HeaderTitle'
import React from 'react'

const CharmPage = () => {
  return (
    <div className="relative w-full transition-all duration-300">
      {/* <div className='flex gap-4 justify-between items-center mb-2 md:mb-4'>
        <div className='flex flex-col'>
          <h1 className="text-3xl font-extrabold tracking-tight dark:text-gray-100">Charm</h1>
          <p className='text-sm font-mono text-gray-500 dark:text-gray-400 mt-1'>
            Playful words and sweet nothings — little lines to win her heart.
          </p>
        </div>
        <AudioPlayer source={"/theme.mp3"} />
      </div> */}
      <HeaderTitle
        title='Charm'
        subTitle='Playful words and sweet nothings — little lines to win her heart.'
      />
      <CharmList />
    </div>
  )
}

export default CharmPage

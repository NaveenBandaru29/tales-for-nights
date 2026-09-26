import CharmList from '@/app/components/charm/CharmList'
import HeaderTitle from '@/app/components/common/HeaderTitle'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Charm - Playful Words & Sweet Nothings',
  description: 'Playful words and sweet nothings — little lines to win her heart. Discover charming, romantic phrases.',
  keywords: ['charm', 'romantic', 'pickup lines', 'flirt', 'sweet nothings', 'love lines'],
  openGraph: {
    title: 'Charm - Playful Words & Sweet Nothings',
    description: 'Playful words and sweet nothings — little lines to win her heart.',
    type: 'website',
  },
};

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

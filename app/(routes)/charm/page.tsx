import CharmList from '@/app/components/charm/CharmList'
import AudioPlayer from '@/app/components/common/AudioPlayer/AudioPlayer'
import React from 'react'

const CharmPage = () => {
  return (
    <main className='mx-auto'>
      <div className='flex gap-4 justify-between items-center mb-4'>
        <div className='flex flex-col'>
          <h1 className="text-2xl sm:text-3xl font-bold mb-1">Charm</h1>
          <p className='text-sm font-bold font-mono'>Playful words and sweet nothings — little lines to win her heart.</p>
        </div>
        <AudioPlayer source={"/theme.mp3"} />
      </div>
      <CharmList />
    </main>
  )
}

export default CharmPage

import NavTags from '@/app/components/common/Navtags/NavTags'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Lyrics - Original Poetry & Song Verses',
  description: 'Explore original lyrics and poetic verses. Coming soon — a new dimension of Tales For Nights.',
  robots: {
    index: false,
    follow: false,
  },
};

const LyricsPage = () => {
  return (
    <main className='container mx-auto px-4 py-4'>
        <NavTags />
        <p className='text-2xl font-semibold text-orange-400'>Lyrics Page under development</p>
    </main>
  )
}

export default LyricsPage

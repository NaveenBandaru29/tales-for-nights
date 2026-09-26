import HeaderTitle from '@/app/components/common/HeaderTitle';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';

const RawList = dynamic(() => import('@/app/components/raw/RawList'))

export const metadata: Metadata = {
  title: 'Venom - Unfiltered Emotions & Bold Outbursts',
  description: 'Unfiltered emotions, bitter truths, and sharp outbursts. Raw thoughts that resonate with the soul.',
  keywords: ['venom', 'raw emotions', 'unfiltered', 'outbursts', 'emotions', 'bitter truths'],
  openGraph: {
    title: 'Venom - Unfiltered Emotions & Bold Outbursts',
    description: 'Unfiltered emotions, bitter truths, and sharp outbursts.',
    type: 'website',
  },
};

export default function RawPage() {
  return (
    <div className="relative w-full transition-all duration-300">
      {/* <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-8">
        <div className="sm:mb-0">
          <h1 className="text-3xl font-extrabold tracking-tight dark:text-gray-100">
            RAW
          </h1>
          <p className="text-sm font-mono text-gray-500 dark:text-gray-400 mt-1">
            Unfiltered emotions, bitter truths, and sharp outbursts.
          </p>
        </div>
      </div> */}
      <HeaderTitle
        title='RAW'
        subTitle='Unfiltered emotions, bitter truths, and sharp outbursts.'
        showAudioPlayer={false}
      />
      <RawList />
    </div>
  );
}
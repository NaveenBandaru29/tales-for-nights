// app/page.tsx
import dynamic from 'next/dynamic';
import { Fragment } from 'react';
import HeaderTitle from './components/common/HeaderTitle';

const TalesList = dynamic(() => import('./components/tales/TalesList'));

export default function HomePage() {
  return (
    <Fragment>
      {/* <div className="flex flex-row justify-between items-center mb-2 sm:mb-4">
        <div className="flex flex-col mb-4 sm:mb-0">
          <h1 className="text-3xl font-extrabold tracking-tight dark:text-gray-100">
            Tales
          </h1>
          <p className="text-sm font-mono text-gray-500 dark:text-gray-400 mt-1">
            Stories of love, loss, and the pain that never really fades.
          </p>
        </div>
        <AudioPlayer source={"/theme.mp3"} />
      </div> */}
      <HeaderTitle
        title='Tales'
        subTitle='Stories of love, loss, and the pain that never really fades.'
      />
      <TalesList />
    </Fragment>
  );
}
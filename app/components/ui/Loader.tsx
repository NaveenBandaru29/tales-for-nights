import { Backdrop, CircularProgress, Skeleton } from '@mui/material';
import React from 'react';

export const Loader = ({ loadingText }: { loadingText?: string }) => {
  return (
    <div className="text-center py-8">
      <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
      <p className="mt-2 text-gray-600 dark:text-gray-400 font-medium">{loadingText || "Loading..."}</p>
    </div>
  );
};

export const TaleCardSkeleton = () => (
  <div className="relative bg-white/60 dark:bg-slate-900/40 backdrop-blur-3xl rounded-[2rem] p-6 sm:p-8 border border-white/60 dark:border-slate-700/50 shadow-xl shadow-blue-900/5 dark:shadow-none flex flex-col h-[320px] justify-between transition-all overflow-hidden">
    {/* Subtle inner glow for premium glass effect */}
    <div className="absolute inset-0 rounded-[2rem] border border-white/20 dark:border-white/5 pointer-events-none"></div>
    
    <div className="relative z-10 space-y-4">
      <Skeleton animation="wave" variant="text" sx={{ fontSize: '2rem', width: '85%', borderRadius: '8px' }} />
      <div className="space-y-2 mt-4">
        <Skeleton animation="wave" variant="text" sx={{ fontSize: '1rem', width: '100%', borderRadius: '4px' }} />
        <Skeleton animation="wave" variant="text" sx={{ fontSize: '1rem', width: '90%', borderRadius: '4px' }} />
        <Skeleton animation="wave" variant="text" sx={{ fontSize: '1rem', width: '70%', borderRadius: '4px' }} />
      </div>
    </div>
    
    <div className="relative z-10 space-y-4 pt-6 border-t border-gray-200/50 dark:border-gray-700/50">
      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          <Skeleton animation="wave" variant="rounded" width={70} height={28} sx={{ borderRadius: '8px' }} />
          <Skeleton animation="wave" variant="rounded" width={90} height={28} sx={{ borderRadius: '8px' }} />
        </div>
        <Skeleton animation="wave" variant="text" sx={{ fontSize: '0.9rem', width: '80px', borderRadius: '4px' }} />
      </div>
    </div>
  </div>
);

export const TalesListSkeleton = ({ count = 6 }: { count?: number }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
    {Array.from({ length: count }).map((_, index) => (
      <TaleCardSkeleton key={index} />
    ))}
  </div>
);

export const TaleDetailSkeleton = () => (
  <div className="mx-auto mt-4 sm:mt-10 max-w-5xl relative rounded-[2rem] sm:rounded-[2.5rem] shadow-2xl shadow-blue-900/5 dark:shadow-none overflow-hidden bg-white/60 dark:bg-slate-900/40 backdrop-blur-3xl border border-white/60 dark:border-slate-700/50 p-6 sm:p-10 md:p-14 space-y-8">
    {/* Subtle inner glow */}
    <div className="absolute inset-0 rounded-[2rem] sm:rounded-[2.5rem] border border-white/20 dark:border-white/5 pointer-events-none z-0"></div>

    <div className="relative z-10 space-y-4 mb-8 sm:mb-12">
      <Skeleton animation="wave" variant="text" sx={{ fontSize: '4rem', width: '75%', borderRadius: '12px' }} />
      <Skeleton animation="wave" variant="text" sx={{ fontSize: '1rem', width: '200px', borderRadius: '6px' }} />
    </div>

    <div className="relative z-10 bg-white/40 dark:bg-slate-800/30 border border-white/60 dark:border-slate-700/50 p-6 sm:p-8 rounded-[1.5rem] sm:rounded-[2rem] backdrop-blur-md shadow-sm space-y-3 mb-8 sm:mb-12">
      <Skeleton animation="wave" variant="text" sx={{ fontSize: '1.2rem', width: '120px', borderRadius: '6px' }} />
      <Skeleton animation="wave" variant="text" sx={{ fontSize: '1.1rem', width: '95%', borderRadius: '6px' }} />
      <Skeleton animation="wave" variant="text" sx={{ fontSize: '1.1rem', width: '85%', borderRadius: '6px' }} />
    </div>

    <div className="relative z-10 flex items-center gap-3 mb-8 sm:mb-12">
      <Skeleton animation="wave" variant="rounded" width={32} height={32} sx={{ borderRadius: '8px' }} />
      <div className="flex gap-2">
        <Skeleton animation="wave" variant="rounded" width={80} height={28} sx={{ borderRadius: '8px' }} />
        <Skeleton animation="wave" variant="rounded" width={110} height={28} sx={{ borderRadius: '8px' }} />
        <Skeleton animation="wave" variant="rounded" width={75} height={28} sx={{ borderRadius: '8px' }} />
      </div>
    </div>

    <div className="relative z-10 space-y-4 pt-4">
      <Skeleton animation="wave" variant="text" sx={{ fontSize: '1.15rem', width: '100%', borderRadius: '6px' }} />
      <Skeleton animation="wave" variant="text" sx={{ fontSize: '1.15rem', width: '98%', borderRadius: '6px' }} />
      <Skeleton animation="wave" variant="text" sx={{ fontSize: '1.15rem', width: '92%', borderRadius: '6px' }} />
      <Skeleton animation="wave" variant="text" sx={{ fontSize: '1.15rem', width: '96%', borderRadius: '6px' }} />
      <Skeleton animation="wave" variant="text" sx={{ fontSize: '1.15rem', width: '88%', borderRadius: '6px' }} />
      <Skeleton animation="wave" variant="text" sx={{ fontSize: '1.15rem', width: '60%', borderRadius: '6px' }} />
    </div>
  </div>
);

export const LazyLoader: React.FC = () => {
  return (
    <Backdrop
      sx={{
        color: '#fff',
        zIndex: 1300,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      open={true}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export const RawItemSkeleton = () => (
  <div className="relative w-full bg-white/60 dark:bg-slate-900/40 backdrop-blur-3xl rounded-[2rem] shadow-xl shadow-blue-900/5 dark:shadow-none border border-white/60 dark:border-slate-700/50 p-6 sm:p-8 flex flex-col gap-4 overflow-hidden mb-4">
    <div className="absolute inset-0 rounded-[2rem] border border-white/20 dark:border-white/5 pointer-events-none z-0"></div>
    <div className="relative z-10 space-y-3">
      <Skeleton animation="wave" variant="text" sx={{ fontSize: '1.2rem', width: '90%', borderRadius: '6px' }} />
      <Skeleton animation="wave" variant="text" sx={{ fontSize: '1.2rem', width: '70%', borderRadius: '6px' }} />
      <Skeleton animation="wave" variant="text" sx={{ fontSize: '1.2rem', width: '85%', borderRadius: '6px' }} />
    </div>
    <div className="relative z-10 mt-2 pt-4 border-t border-gray-200/50 dark:border-gray-700/50 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
      <div className="flex gap-2">
        <Skeleton animation="wave" variant="rounded" width={60} height={26} sx={{ borderRadius: '8px' }} />
        <Skeleton animation="wave" variant="rounded" width={85} height={26} sx={{ borderRadius: '8px' }} />
      </div>
      <Skeleton animation="wave" variant="text" sx={{ fontSize: '0.9rem', width: '100px', borderRadius: '4px' }} />
    </div>
  </div>
);

export const RawListSkeleton = ({ count = 3 }: { count?: number }) => (
  <div className="w-full flex gap-4 flex-col">
    {Array.from({ length: count }).map((_, index) => (
      <RawItemSkeleton key={index} />
    ))}
  </div>
);

export default LazyLoader;

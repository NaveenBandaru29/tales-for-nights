import { Backdrop, CircularProgress } from '@mui/material';
import React from 'react'

export const Loader = ({loadingText}:{loadingText?:string}) => {
  return (
    <div className="text-center py-8">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
        <p className="mt-2 text-gray-600">{loadingText || "Loading..."}</p>
    </div>
  )
}


export const LazyLoader: React.FC = () => {
  return (
    <Backdrop
      sx={{
        color: '#fff',
        zIndex: 1300,  // Static value
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

export default LazyLoader;

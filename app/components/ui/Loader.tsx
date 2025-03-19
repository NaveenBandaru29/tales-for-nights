import React from 'react'

const Loader = ({loadingText}:{loadingText?:string}) => {
  return (
    <div className="text-center py-8">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
        <p className="mt-2 text-gray-600">{loadingText || "Loading..."}</p>
    </div>
  )
}

export default Loader


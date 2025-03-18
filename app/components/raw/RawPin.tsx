import React from 'react'

interface RawPinProps{
    handlePin:()=> void
    isPinning:boolean
    handleCancel:()=>void
    pinned:boolean
}

const RawPin = ({handleCancel,handlePin,isPinning,pinned}:RawPinProps) => {
    let btnText = ""
    if(pinned === true){
        btnText = "Yes, Unpin"
    }
    else{
        btnText = "Yes, Pin"
    }
    if(isPinning){
        if(pinned){
            btnText = "Unpinning..."
        }
        else{
            btnText = "Pinning..."
        }
    }
  return (
        <div className="absolute inset-0 bg-white bg-opacity-90 flex flex-col items-center justify-center z-10 rounded-lg shadow-md">
            <p className="text-center mb-4">
            Are you sure you want to {pinned?"Unpin":"Pin"} this RAW?
            </p>
            <div className="flex space-x-4">
            <button
                onClick={handlePin}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                disabled={isPinning}
            >
                {btnText}
            </button>
            <button
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
            >
                Cancel
            </button>
            </div>
        </div>
  )
}

export default RawPin

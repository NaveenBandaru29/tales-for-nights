import { Button } from '@mui/material'
import React from 'react'

interface RawDeleteProps{
    handleDelete:()=> void
    isDeleting:boolean
    handleCancel:()=>void
}

const RawDelete = ({handleCancel,handleDelete,isDeleting}:RawDeleteProps) => {
  return (
        <div className="absolute inset-0 bg-white bg-opacity-90 flex flex-col items-center justify-center z-10 rounded-lg shadow-md">
            <p className="text-center mb-4">
            Are you sure you want to delete this RAW?
            </p>
            <div className="flex gap-4 items-center">
            <Button
                onClick={handleDelete}
                // className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                  disabled={isDeleting}
                  color='error'
                  variant='contained'
            >
                {isDeleting ? "Deleting..." : "Yes, Delete"}
            </Button>
            <Button
                  onClick={handleCancel}
                  color='inherit'
                  variant='contained'
                // className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
            >
                Cancel
            </Button>
            </div>
        </div>
  )
}

export default RawDelete

import React from 'react'
import AdminManageCard from './AdminManageCard'
import Link from 'next/link'
import Loader from '../ui/Loader'

interface AdminManageSectionProps{
    isLoading:boolean,
    loadingText?:string,
    isError:boolean,
    errorText?:string,
    items:any,
    openDeleteModal:(id:string)=>void
    seeMoreLink?:string,
    manageItemsTitle?:string
}

const AdminManageSection = ({isError,isLoading,errorText,loadingText,items,openDeleteModal,seeMoreLink,manageItemsTitle}:AdminManageSectionProps) => {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-xl font-semibold text-gray-900">
        Manage {manageItemsTitle || ""}
      </h2>
        {
            items?.[0]?.title && 
            <Link
                href="/admin/create"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
                Add New Tale
            </Link>
        }

    </div>

    {isLoading ? (
      <Loader loadingText={loadingText || `Loading ${manageItemsTitle}`} />
    ) : isError ? (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
        {errorText || "Something went wrong. Please try again."}
      </div>
    ) : items && items.length > 0 && (
      <>
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {items.slice(0, 2).map((item:any) => (
              <AdminManageCard
                key={item._id}
                item={item}
                openDeleteModal={() => openDeleteModal(item._id)}
              />
            ))}
          </ul>
        </div>
        <div className="text-right p-2">
          <Link
            href={seeMoreLink || "/"}
            className="text-blue-600 font-semibold hover:text-blue-400"
          >
            See More {manageItemsTitle}
          </Link>
        </div>
      </>
    ) 
    // : (
    //   <div className="bg-white shadow overflow-hidden sm:rounded-md p-6 text-center">
    //     <p className="text-gray-500">
    //       No {manageItemsTitle?.toLocaleLowerCase()} available. Create your first tale!
    //     </p>
    //   </div>
    // )
    }
  </main>
  )
}

export default AdminManageSection

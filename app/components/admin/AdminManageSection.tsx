import React from 'react';
import AdminManageCard from './AdminManageCard';
import Link from 'next/link';
import { Loader } from '../ui/Loader';
import { Button } from '@mui/material';

interface AdminManageSectionProps {
	isLoading: boolean;
	loadingText?: string;
	isError: boolean;
	errorText?: string;
	items: any;
	openDeleteModal: (id: string) => void;
	seeMoreLink?: string;
	manageItemsTitle?: string;
}

const AdminManageSection = ({ isError, isLoading, errorText, loadingText, items, openDeleteModal, seeMoreLink, manageItemsTitle }: AdminManageSectionProps) => {

	const isTaleSection = manageItemsTitle === "Tales";
	const addItemLink = isTaleSection ? "/admin/create" : "/admin/createCharm";
	const addItemButtonText = isTaleSection ? "Add New Tale" : "Add New Charm";
	const noItemsText = `No ${manageItemsTitle?.toLocaleLowerCase()} available. Create your first ${isTaleSection ? "tale" : "charm"}!`;

	return (
		<>
			<div className="flex justify-between items-center mb-6">
				<h2 className={`text-xl font-semibold transition-colors duration-300 ${isTaleSection ? 'text-gray-900 dark:text-gray-100' : 'text-gray-900 dark:text-gray-100'}`}>
					Manage {manageItemsTitle || ""}
				</h2>
				<Button
					LinkComponent={Link}
					href={addItemLink}
					variant='contained'
				>
					{addItemButtonText}
				</Button>
			</div>

			{isLoading ? (
				<Loader loadingText={loadingText || `Loading ${manageItemsTitle}`} />
			) : isError ? (
				<div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700
                                text-red-700 dark:text-red-300 px-4 py-3 rounded relative">
					{errorText || "Something went wrong. Please try again."}
				</div>
			) : items && items.length > 0 ? (
				<div className='mb-4'>
					<div className="shadow overflow-hidden sm:rounded-md transition-colors duration-300
                                    bg-white dark:bg-gray-800">
						<ul className="divide-y divide-gray-200 dark:divide-gray-700">
							{items.slice(0, 2).map((item: any) => (
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
							className="font-semibold transition-colors duration-300
                                       text-blue-600 hover:text-blue-400 dark:text-blue-400 dark:hover:text-blue-200"
						>
							See More {manageItemsTitle}
						</Link>
					</div>
				</div>
			) : (
				<div className="shadow overflow-hidden sm:rounded-md p-6 text-center transition-colors duration-300
                                bg-white dark:bg-gray-800">
					<p className="transition-colors duration-300
                                  text-gray-500 dark:text-gray-400">
						{noItemsText}
					</p>
				</div>
			)}
		</>
	);
};

export default AdminManageSection;
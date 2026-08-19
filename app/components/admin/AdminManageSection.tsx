import React from 'react';
import AdminManageCard from './AdminManageCard';
import Link from 'next/link';
import { Loader } from '../ui/Loader';
import { Button } from '@mui/material';
import { ArrowForwardRounded, ArrowRightRounded } from '@mui/icons-material';

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
	const addItemLink = isTaleSection ? "/admin/create" : "/charm";
	const addItemButtonText = isTaleSection ? "Add New Tale" : "Add New Charm";
	const noItemsText = `No ${manageItemsTitle?.toLocaleLowerCase()} available. Create your first ${isTaleSection ? "tale" : "charm"}!`;

	return (
		<>
			<div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6 mt-4">
				<h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100 flex items-center gap-2">
					<span className="w-2 h-8 rounded-full bg-gradient-to-b from-blue-500 to-indigo-600"></span>
					Manage {manageItemsTitle || ""}
				</h2>
				<Button
					LinkComponent={Link}
					href={addItemLink}
					variant='contained'
					sx={{
						textTransform: 'none',
						fontWeight: 600,
						borderRadius: '0.75rem',
						padding: '0.5rem 1.25rem',
						boxShadow: '0 4px 14px 0 rgba(59, 130, 246, 0.39)',
						background: 'linear-gradient(135deg, #3b82f6 0%, #4f46e5 100%)',
						'&:hover': {
							boxShadow: '0 6px 20px rgba(59, 130, 246, 0.23)',
							transform: 'translateY(-1px)'
						},
						transition: 'all 0.2s ease'
					}}
				>
					{addItemButtonText}
				</Button>
			</div>

			{isLoading ? (
				<Loader loadingText={loadingText || `Loading ${manageItemsTitle}`} />
			) : isError ? (
				<div className="bg-red-100 dark:bg-red-900/50 border border-red-400 dark:border-red-700/50
                                text-red-700 dark:text-red-300 px-6 py-4 rounded-2xl relative backdrop-blur-md">
					{errorText || "Something went wrong. Please try again."}
				</div>
			) : items && items.length > 0 ? (
				<div className='mb-8'>
					<div className="overflow-hidden rounded-[2rem] border border-white/60 dark:border-slate-700/50 bg-white/60 dark:bg-slate-900/40 backdrop-blur-3xl shadow-xl shadow-blue-900/5 transition-all duration-300">
						<ul className="divide-y divide-gray-200/50 dark:divide-slate-700/50">
							{items.slice(0, 2).map((item: any) => (
								<AdminManageCard
									key={item._id}
									item={item}
									openDeleteModal={() => openDeleteModal(item._id)}
								/>
							))}
						</ul>
					</div>
					<div className="text-right p-4 mt-2">
						<Link
							href={seeMoreLink || "/"}
							className="inline-flex items-center gap-1 font-semibold transition-all duration-300
                                       text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 hover:translate-x-1"
						>
							See All {manageItemsTitle} <span aria-hidden="true"><ArrowForwardRounded sx={{ height: "18px", width: "18px" }} /></span>
						</Link>
					</div>
				</div>
			) : (
				<div className="overflow-hidden rounded-[2rem] border border-white/60 dark:border-slate-700/50 bg-white/60 dark:bg-slate-900/40 backdrop-blur-3xl shadow-xl shadow-blue-900/5 p-8 text-center transition-all duration-300">
					<p className="text-gray-500 dark:text-gray-400 text-lg">
						{noItemsText}
					</p>
				</div>
			)}
		</>
	);
};

export default AdminManageSection;
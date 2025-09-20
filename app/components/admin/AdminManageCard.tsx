import { formatDate } from "@/app/utils/helpers";
import Link from "next/link";
import React from "react";
import EditorTextReadOnly from "../common/CustomEditor/EditorTextReadOnly";

interface AdminManageCardProps {
	item: any;
	openDeleteModal: () => void;
}

const AdminManageCard = ({ item, openDeleteModal }: AdminManageCardProps) => {
	const isTale = !!item?.title;
	// const itemType = isTale ? 'tales' : 'raws';
	const viewLink = isTale ? `/tales/${item._id}` : `/raw/${item._id}`;
	const editLink = isTale ? `/admin/edit/${item._id}` : `/admin/edit-raw/${item._id}`;

	return (
		<li key={item._id} className="transition-colors duration-300">
			<div className="px-6 py-4 flex items-center justify-between gap-2 sm:gap-4
                            bg-white dark:bg-gray-800">
				<div className="flex-1 min-w-0">
					{item?.title && (
						<div className="flex items-center">
							<h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 truncate">
								{item.title}
							</h3>
						</div>
					)}
					{item?.description ?
						<p className={`mt-1 text-sm text-gray-500 dark:text-gray-400 truncate`}>{item?.description}</p>
						:
						<EditorTextReadOnly content={item?.content} />
					}

					{item?.createdAt && (
						<p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
							Created on: {formatDate(item?.createdAt)}
						</p>
					)}
				</div>
				<div className="flex space-x-2 flex-col gap-2 sm:flex-row">
					<Link
						href={viewLink}
						className="w-20 text-center px-3 py-1.5 border border-transparent text-xs font-medium rounded
                                   text-indigo-700 bg-indigo-100 hover:bg-indigo-200
                                   dark:text-indigo-200 dark:bg-indigo-900 dark:hover:bg-indigo-800
                                   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
					>
						View
					</Link>
					<Link
						href={editLink}
						className="w-20 text-center px-3 py-1.5 border border-transparent text-xs font-medium rounded
                                   text-green-700 bg-green-100 hover:bg-green-200
                                   dark:text-green-200 dark:bg-green-900 dark:hover:bg-green-800
                                   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
					>
						Edit
					</Link>
					<button
						onClick={openDeleteModal}
						className="w-20 text-center px-3 py-1.5 border border-transparent text-xs font-medium rounded
                                   text-red-700 bg-red-100 hover:bg-red-200
                                   dark:text-red-200 dark:bg-red-900 dark:hover:bg-red-800
                                   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
					>
						Delete
					</button>
				</div>
			</div>
		</li>
	);
};

export default AdminManageCard;
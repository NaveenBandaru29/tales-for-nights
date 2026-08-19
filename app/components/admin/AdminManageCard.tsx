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
	const viewLink = isTale ? `/tales/${item._id}` : `/raw`;
	const editLink = isTale ? `/admin/edit/${item._id}` : `/raw`;

	return (
		<li key={item._id} className="transition-all duration-300 hover:bg-white/40 dark:hover:bg-slate-800/40 relative group">
			<div className="px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6">
				<div className="flex-1 min-w-0">
					{item?.title && (
						<div className="flex items-center mb-1">
							<h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
								{item.title}
							</h3>
						</div>
					)}
					{item?.description ? (
						<p className="mt-1 text-sm text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
							{item?.description}
						</p>
					) : (
						<div className="opacity-80 scale-95 origin-left">
							<EditorTextReadOnly content={item?.content} />
						</div>
					)}

					{item?.createdAt && (
						<p className="mt-3 text-[11px] font-medium tracking-wider uppercase text-gray-400 dark:text-gray-500">
							{formatDate(item?.createdAt)}
						</p>
					)}
				</div>
				<div className="flex space-x-3 w-full sm:w-auto mt-2 sm:mt-0">
					<Link
						href={viewLink}
						className="flex-1 sm:flex-none w-auto sm:w-20 text-center px-4 py-2 text-xs font-semibold rounded-xl
                                   text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-100/50
                                   dark:text-blue-400 dark:bg-blue-900/20 dark:hover:bg-blue-900/40 dark:border-blue-800/30
                                   transition-all duration-300 shadow-sm"
					>
						View
					</Link>
					<Link
						href={editLink}
						className="flex-1 sm:flex-none w-auto sm:w-20 text-center px-4 py-2 text-xs font-semibold rounded-xl
                                   text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-100/50
                                   dark:text-emerald-400 dark:bg-emerald-900/20 dark:hover:bg-emerald-900/40 dark:border-emerald-800/30
                                   transition-all duration-300 shadow-sm"
					>
						Edit
					</Link>
					<button
						onClick={openDeleteModal}
						className="flex-1 sm:flex-none w-auto sm:w-20 text-center px-4 py-2 text-xs font-semibold rounded-xl
                                   text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-100/50
                                   dark:text-rose-400 dark:bg-rose-900/20 dark:hover:bg-rose-900/40 dark:border-rose-800/30
                                   transition-all duration-300 shadow-sm"
					>
						Delete
					</button>
				</div>
			</div>
		</li>
	);
};

export default AdminManageCard;
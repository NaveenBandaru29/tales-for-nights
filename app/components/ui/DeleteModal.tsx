import React from "react";

interface DeleteModalProps {
	title: string;
	description: string;
	onClose: () => void;
	onDelete: () => void;
	isDeleting: boolean;
}

const DeleteModal = ({
	description,
	onClose,
	onDelete,
	title,
	isDeleting,
}: DeleteModalProps) => {
	return (
		<div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50">
			<div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6 transition-colors duration-300">
				<h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4 transition-colors duration-300">{title}</h3>
				<p className="text-sm text-gray-500 dark:text-gray-400 mb-6 transition-colors duration-300">{description}</p>
				<div className="flex justify-end space-x-3">
					<button
						onClick={onClose}
						className="inline-flex items-center px-4 py-2 border text-sm font-medium rounded-md
                                   border-gray-300 dark:border-gray-600
                                   text-gray-700 dark:text-gray-200
                                   bg-white dark:bg-gray-700
                                   hover:bg-gray-50 dark:hover:bg-gray-600
                                   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-blue-400"
					>
						Cancel
					</button>
					<button
						onClick={onDelete}
						disabled={isDeleting}
						className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md
                                   text-white
                                   bg-red-600 hover:bg-red-700
                                   dark:bg-red-800 dark:hover:bg-red-700
                                   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
					>
						{isDeleting ? "Deleting..." : "Delete"}
					</button>
				</div>
			</div>
		</div>
	);
};

export default DeleteModal;
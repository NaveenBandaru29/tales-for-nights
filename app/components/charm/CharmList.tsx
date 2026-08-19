'use client'
import { RootState } from '@/app/store';
import dynamic from 'next/dynamic';
import { useDeleteCharmMutation, useUpdateCharmMutation } from '@/app/hooks/mutations/useCharmMutation';
import { useGetCharmsQuery } from '@/app/hooks/queries/useCharmQuery';
import { Charm, PaginationParams } from '@/app/types/Charm';
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Loader, RawListSkeleton } from '../ui/Loader';
const Paginator = dynamic(() => import('../ui/Paginator'), { ssr: false });
const RawDelete = dynamic(() => import('../raw/RawDelete'), { ssr: false });
const RawItem = dynamic(() => import('../raw/RawItem'), { ssr: false });
const RawEditForm = dynamic(() => import('../raw/RawEditForm'), { ssr: false });
const RawPin = dynamic(() => import('../raw/RawPin'), { ssr: false });
const RawForm = dynamic(() => import('../raw/RawForm'), { ssr: false });
import { Add, Close } from '@mui/icons-material';

const CharmList = () => {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    // Redux
    const { user, isAuthenticated }: any = useSelector((state: RootState) => state.auth);
    const isAdmin = mounted && isAuthenticated && user?.isAdmin;

    // Pagination State
    const [searchParams, setSearchParams] = useState<PaginationParams>({
        query: "",
        page: 1,
        limit: 10,
    });

    // Modal / UI States
    const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
    const [pinId, setPinId] = useState<string | null>(null);
    const [edit, setEdit] = useState<string | null>(null);
    const [addCharm, setAddCharm] = useState<boolean>(false);

    // Data fetching
    const { data, isLoading, isFetching, error } = useGetCharmsQuery(searchParams);
    const charms = data?.data || [];
    const totalPages = data?.pagination?.pages || 1;

    // Mutations
    const { mutateAsync: deleteCharm, isPending: isDeleting } = useDeleteCharmMutation();
    const { mutateAsync: updateCharm, isPending: isUpdating } = useUpdateCharmMutation();


    // Handlers

    // Handle page change for pagination
    const handlePageChange = (e: any, page: number) => {
        setSearchParams((prev: any) => ({
            ...prev,
            page,
        }));
        setAddCharm(false);
    };

    // Handle saving updates to Charm content
    const handleSave = async (id: string, charm: Charm) => {
        const { content, pinned, tags } = charm;
        if (!content.trim()) return;

        const charmData = { content, pinned, tags };

        try {
            await updateCharm({ id, charmData });
            setEdit(null);
        } catch (err) {
            console.error("Failed to update Charm:", err);
        }
        setAddCharm(false);
    };

    // Handle delete action with confirmation
    const handleDelete = async (id: string) => {
        if (deleteConfirm === id) {
            try {
                await deleteCharm(id);
                setDeleteConfirm(null);
            } catch (error) {
                console.error("Failed to delete Charm:", error);
            }
        } else {
            setDeleteConfirm(id);
        }
        setAddCharm(false);
    };

    // Handle pin toggle with confirmation
    const handlePin = async (id: string, pinned: boolean, content: string, tags: string[]) => {
        if (pinId === id) {
            try {
                await updateCharm({ id, charmData: { content, pinned, tags } });
            } catch (err) {
                console.error("Failed to update Charm:", err);
            }
            setPinId(null);
        } else {
            setPinId(id);
        }
        setAddCharm(false);
    };

    // Shared reset function to clear other UI states
    const resetUIState = () => {
        setAddCharm(false);
        setDeleteConfirm(null);
        setEdit(null);
        setPinId(null);
    };

    // Handle edit click
    const handleEditClick = (id: string) => {
        resetUIState();
        setEdit(id);
    };

    // Handle delete click
    const handleDeleteClick = (id: string) => {
        resetUIState();
        setDeleteConfirm(id);
    };

    // Handle add toggle
    const handleAddClick = () => {
        const toggle = !addCharm;
        resetUIState();
        setAddCharm(toggle);
    };

    // Handle pin click
    const handlePinClick = (id: string) => {
        resetUIState();
        setPinId(id);
    };


    return (
        <div className="mx-auto w-full">
            <div className="mb-6 flex gap-2 sm:gap-4">
                {isAdmin && (
                    <button
                        onClick={handleAddClick}
                        className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center gap-2 shadow-lg ${
                            addCharm 
                            ? 'bg-red-500 hover:bg-red-600 text-white shadow-red-500/30 hover:shadow-red-500/50' 
                            : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/30 hover:shadow-blue-600/50'
                        }`}
                    >
                        {addCharm ? (
                            <>
                                <Close fontSize="small" />
                                Cancel
                            </>
                        ) : (
                            <>
                                <Add fontSize="small" />
                                Add Charm
                            </>
                        )}
                    </button>
                )}
            </div>

            {isAdmin && addCharm && <RawForm identifier="CHARM" handleFormClose={() => setAddCharm(false)} />}

            {(isLoading || isFetching) ? (<RawListSkeleton count={3} />)
                : error ? (
                    <div className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100 p-6 rounded-lg shadow-md transition-colors duration-300">
                        Error loading Charms. Please try again.
                    </div>
                ) : charms.length === 0 ? (
                    <div className="text-center py-16 text-gray-500 dark:text-gray-400 transition-colors duration-300">
                        {searchParams.query
                            ? `No Charms found matching "${searchParams.query}"`
                            : "No Charms available"}
                    </div>
                ) : (
                    <div className="w-full flex gap-4 flex-col">
                        {charms.map((charm: Charm) => (
                            <div key={charm._id} className="relative">
                                {deleteConfirm === charm._id && (
                                    <RawDelete
                                        handleCancel={() => setDeleteConfirm(null)}
                                        handleDelete={() => handleDelete(charm._id)}
                                        isDeleting={isDeleting}
                                    />
                                )}
                                {edit === charm._id && isAdmin && (
                                    <RawEditForm
                                        identifier="CHARM"
                                        raw={charm}
                                        handleSave={handleSave}
                                        isUpdating={isUpdating}
                                        handleCancel={() => setEdit(null)}
                                    />
                                )}
                                {
                                    pinId === charm._id && isAdmin && (
                                        <RawPin
                                            handleCancel={() => setPinId(null)}
                                            isPinning={isUpdating}
                                            handlePin={() => handlePin(charm._id, !charm.pinned, charm.content, charm.tags)}
                                            pinned={charm.pinned}
                                        />
                                    )
                                }
                                {edit !== charm._id && (
                                    <RawItem
                                        key={charm._id}
                                        raw={charm}
                                        isAdmin={isAdmin ? true : false}
                                        onEdit={isAdmin ? () => handleEditClick(charm._id) : undefined}
                                        onDelete={isAdmin ? () => handleDeleteClick(charm._id) : undefined}
                                        onPin={isAdmin ? () => handlePinClick(charm._id) : undefined}
                                    />)}
                            </div>
                        ))}

                        {totalPages > 1 && (
                            <div className="mt-8 flex justify-center">
                                <Paginator count={totalPages} onChange={handlePageChange} page={searchParams.page || 1} />
                            </div>
                        )}
                    </div>
                )}
        </div>
    )
}

export default CharmList

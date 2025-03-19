// app/admin/page.tsx

// Use client-side rendering with React hooks
"use client";

// Import necessary hooks and components
import { useEffect, useState } from "react"; // React hooks for managing state and side effects
import AuthGuard from "../components/auth/AuthGuard"; // Component that checks if user is authenticated and authorized as an admin
import {
  useGetTalesQuery, // API hook for fetching tales data
  useDeleteTaleMutation, // API hook for deleting a tale
} from "../store/apis/talesApi"; 
import { useDeleteRawMutation, useGetRawsQuery } from "../store/apis/rawApi"; // API hooks for fetching and deleting raw items
import DeleteModal from "../components/ui/DeleteModal"; // Modal component to confirm deletion
import AdminManageSection from "../components/admin/AdminManageSection"; // Section component to manage tales and raws

export default function AdminPage() {
  // Fetch tales data using the API query hook
  const { data: tales, isLoading, isError, refetch } = useGetTalesQuery();

  // Fetch raw data using the API query hook
  const {
    data: raws,
    isLoading: israwLoading,
    isError: isRawError,
    refetch: rawRefetch,
  } = useGetRawsQuery({ limit: 2, page: 1 });

  // API mutation hooks for deleting a tale and raw
  const [deleteTale, { isLoading: isDeleting }] = useDeleteTaleMutation();
  const [deleteRaw, { isLoading: isRawDeleing }] = useDeleteRawMutation();

  // State variables for managing the selected tale, raw, and modal visibility
  const [selectedTale, setSelectedTale] = useState<string | null>(null); // Stores the ID of the selected tale to be deleted
  const [selectedRaw, setSelectedRaw] = useState<string | null>(null); // Stores the ID of the selected raw to be deleted
  const [showDeleteTaleModal, setShowDeleteTaleModal] = useState(false); // Controls visibility of the tale deletion confirmation modal
  const [showDeleteRawModal, setShowDeleteRawModal] = useState(false); // Controls visibility of the raw deletion confirmation modal

  // Refetch data when the component is mounted or when the dependency changes
  useEffect(() => {
    refetch(); // Refetch tales data
    rawRefetch(); // Refetch raw data
  }, [refetch, rawRefetch]);

  // Handler to delete a selected tale
  const handleTaleDelete = async () => {
    if (selectedTale) {
      try {
        await deleteTale(selectedTale).unwrap(); // Call the deleteTale mutation
        setShowDeleteTaleModal(false); // Close the deletion modal
        setSelectedTale(null); // Clear the selected tale
      } catch (error) {
        console.error("Failed to delete tale:", error); // Log error if deletion fails
      }
    }
  };

  // Handler to delete a selected raw item
  const handleRawDelete = async () => {
    if (selectedRaw) {
      try {
        await deleteRaw(selectedRaw).unwrap(); // Call the deleteRaw mutation
        setShowDeleteRawModal(false); // Close the deletion modal
        setSelectedRaw(null); // Clear the selected raw
      } catch (error) {
        console.error("Failed to delete RAW:", error); // Log error if deletion fails
      }
    }
  };

  // Open the tale deletion modal with the selected tale ID
  const openDeleteTaleModal = (id: string) => {
    setSelectedTale(id); // Set the selected tale ID
    setShowDeleteTaleModal(true); // Show the modal
  };

  // Open the raw deletion modal with the selected raw ID
  const openDeleteRawModal = (id: string) => {
    setSelectedRaw(id); // Set the selected raw ID
    setShowDeleteRawModal(true); // Show the modal
  };

  return (
    // AuthGuard ensures the page is accessible only to admin users
    <AuthGuard requireAdmin>
      <div className="min-h-screen bg-gray-50">
        {/* AdminManageSection to display and manage tales */}
        <AdminManageSection
          isError={isError} // Show error if tales data fetching fails
          errorText="Error loading tales. Please try again." // Error message
          isLoading={isLoading} // Show loading state while fetching data
          loadingText="Loading Tales..." // Loading message
          items={tales} // Pass the tales data
          openDeleteModal={(id) => openDeleteTaleModal(id)} // Function to open delete modal for a tale
          manageItemsTitle="Tales" // Title for the section
          seeMoreLink="/" // Link to view more tales
        />

        {/* AdminManageSection to display and manage raws */}
        <AdminManageSection
          isError={isRawError} // Show error if raws data fetching fails
          errorText="Error loading raws. Please try again." // Error message
          isLoading={israwLoading} // Show loading state while fetching data
          loadingText="Loading Raws..." // Loading message
          items={raws?.data} // Pass the raws data
          openDeleteModal={(id) => openDeleteRawModal(id)} // Function to open delete modal for a raw
          manageItemsTitle="Raws" // Title for the section
          seeMoreLink="/raw" // Link to view more raws
        />

        {/* Delete Confirmation Modal for tales */}
        {showDeleteTaleModal && (
          <DeleteModal
            title="Confirm Delete" // Modal title
            description="Are you sure you want to delete this tale? This action cannot be undone." // Description of the action
            isDeleting={isDeleting} // Show loading state while deleting
            onClose={() => setShowDeleteTaleModal(false)} // Close the modal
            onDelete={handleTaleDelete} // Function to execute on deletion
          />
        )}

        {/* Delete Confirmation Modal for raws */}
        {showDeleteRawModal && (
          <DeleteModal
            title="Confirm Delete" // Modal title
            description="Are you sure you want to delete this RAW? This action cannot be undone." // Description of the action
            isDeleting={isRawDeleing} // Show loading state while deleting
            onClose={() => setShowDeleteRawModal(false)} // Close the modal
            onDelete={handleRawDelete} // Function to execute on deletion
          />
        )}
      </div>
    </AuthGuard>
  );
}

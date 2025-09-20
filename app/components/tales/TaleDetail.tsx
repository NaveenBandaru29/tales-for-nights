"use client";

import { useGetTaleByIdQuery } from "../../store/apis/talesApi";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { Loader } from "../ui/Loader";
import { formatDate } from "@/app/utils/helpers";
import EditorTextReadOnly from "../common/CustomEditor/EditorTextReadOnly";
import { Chip, IconButton } from "@mui/material";
import HashTagIcon from "@/public/Icons/HashTagIcon";

interface TaleDetailProps {
  id: string;
}

export default function TaleDetail({ id }: TaleDetailProps) {
  const { data, isLoading, error } = useGetTaleByIdQuery(id);
  const { user } = useSelector((state: RootState) => state.auth);
  const router = useRouter();
  const isAdmin = user?.isAdmin;
  const [prevTale, tale, nextTale] = data && data?.length > 0 ? data : [null, null, null];

  if (isLoading || !(data?.length)) {
    return <Loader loadingText="Loading Tale..." />;
  }

  if (error) {
    return (
      <div className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100 p-6 rounded-lg shadow-md">
        <p>Failed to load the tale. Please try again later.</p>
        <Link href="/" className="mt-4 text-blue-600 dark:text-blue-400 hover:underline block">
          Return to homepage
        </Link>
      </div>
    );
  }

  if (!tale) {
    return (
      <div className="text-center py-16 px-4">
        <p className="text-xl font-semibold text-gray-500 dark:text-gray-400">Tale not found.</p>
        <Link href="/" className="mt-4 text-blue-600 dark:text-blue-400 hover:underline block">
          Return to homepage
        </Link>
      </div>
    );
  }

  const navigateToTaleById = (taleId: string | undefined) => {
    if (taleId) {
      router.push(`/tales/${taleId}`);
    } else {
      return;
    }
  };

  return (
    <div className={`relative max-w-5xl mx-auto rounded-lg shadow-xl overflow-hidden transition-all duration-300 bg-white dark:bg-gray-800 ${!isAdmin && "select-none"}`}>
      {/* Navigation Buttons */}
      <div>
        <IconButton
          sx={{
            position: 'fixed',
            top: '50%',
            left: { xs: '2px', sm: '1%', md: '2%', lg: '3%' },
            transform: 'translateY(-50%)',
            transition: 'opacity 0.3s, background-color 0.3s, color 0.3s',
            opacity: prevTale?._id ? 1 : 0.5,
            cursor: prevTale?._id ? 'pointer' : 'not-allowed',
            bgcolor: 'rgba(255, 255, 255, 0.9)',
            color: 'primary.main',
            boxShadow: 2,
            '&:hover': {
              bgcolor: 'rgba(255, 255, 255, 1)',
            },
            '&.Mui-disabled': {
              bgcolor: 'rgba(229, 231, 235, 0.5)',
              color: 'rgba(156, 163, 175, 0.8)',
            },
            '.dark &': {
              bgcolor: 'rgba(55, 65, 81, 0.9)',
              color: 'primary.main',
              '&:hover': {
                bgcolor: 'rgba(55, 65, 81, 1)',
              },
              '&.Mui-disabled': {
                bgcolor: 'rgba(75, 85, 99, 0.5)',
                color: 'rgba(107, 114, 128, 0.8)',
              },
            }
          }}
          disabled={!prevTale?._id}
          onClick={() => navigateToTaleById(prevTale?._id)}
        >
          <ChevronLeft fontSize="large" />
        </IconButton>
        <IconButton
          sx={{
            position: 'fixed',
            top: '50%',
            right: { xs: '2px', sm: '1%', md: '2%', lg: '3%' },
            transform: 'translateY(-50%)',
            transition: 'opacity 0.3s, background-color 0.3s, color 0.3s',
            opacity: nextTale?._id ? 1 : 0.5,
            cursor: nextTale?._id ? 'pointer' : 'not-allowed',
            bgcolor: 'rgba(255, 255, 255, 0.9)',
            color: 'primary.main',
            boxShadow: 2,
            '&:hover': {
              bgcolor: 'rgba(255, 255, 255, 1)',
            },
            '&.Mui-disabled': {
              bgcolor: 'rgba(229, 231, 235, 0.5)',
              color: 'rgba(156, 163, 175, 0.8)',
            },
            '.dark &': {
              bgcolor: 'rgba(55, 65, 81, 0.9)',
              color: 'primary.main',
              '&:hover': {
                bgcolor: 'rgba(55, 65, 81, 1)',
              },
              '&.Mui-disabled': {
                bgcolor: 'rgba(75, 85, 99, 0.5)',
                color: 'rgba(107, 114, 128, 0.8)',
              },
            }
          }}
          disabled={!nextTale?._id}
          onClick={() => navigateToTaleById(nextTale?._id)}
        >
          <ChevronRight fontSize="large" />
        </IconButton>
      </div>

      <div className="p-6 sm:p-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-gray-100 leading-tight mb-2">
          {tale.title}
        </h1>

        <div className="text-sm font-light text-gray-500 dark:text-gray-400 mb-6">
          Created on: {formatDate(tale.createdAt)}
        </div>

        <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg mb-6 shadow-sm">
          <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">
            Description
          </h2>
          <p className="text-gray-700 dark:text-gray-300">{tale.description}</p>
        </div>
        <div className="flex items-center gap-2 sm:gap-4 mb-8">
          {tale.tags.length > 0 && <span className="text-blue-600 dark:text-blue-400 text-xl"><HashTagIcon /> </span>}
          <div className="flex gap-2 sm:gap-4 flex-wrap">
            {tale.tags.map((tagLabel: string, index: number) => (
              <Chip
                label={tagLabel}
                key={tagLabel + index}
                onClick={() => { }}
                size="small"
                sx={{
                  bgcolor: 'rgba(29, 78, 216, 0.1) !important',
                  color: '#1d4ed8 !important',
                  '.dark &': {
                    bgcolor: 'rgba(59, 130, 246, 0.1) !important',
                    color: '#3b82f6 !important',
                  },
                }}
              />
            ))}
          </div>
        </div>
        <EditorTextReadOnly content={tale.content} />
      </div>
      <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900 flex flex-wrap justify-between items-center space-y-2 sm:space-y-0 border-t border-gray-200 dark:border-gray-700">
        <Link href="/" className="text-blue-600 dark:text-blue-400 hover:underline">
          &larr; Back to all tales
        </Link>

        {isAdmin && (
          <Link
            href={`/admin/edit/${tale._id}`}
            className="px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-200"
          >
            Edit Tale
          </Link>
        )}
      </div>
    </div>
  );
}
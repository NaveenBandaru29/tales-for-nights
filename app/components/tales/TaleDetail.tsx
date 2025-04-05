// components/tales/TaleDetail.tsx
"use client";

import { useGetTaleByIdQuery } from "../../store/apis/talesApi";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { Loader } from "../ui/Loader";
import { formatDate } from "@/app/utils/helpers";

interface TaleDetailProps {
  id: string;
}

export default function TaleDetail({ id }: TaleDetailProps) {
  const { data, isLoading, error } = useGetTaleByIdQuery(id);
  const { user } = useSelector((state: RootState) => state.auth);
  const router = useRouter();
  const isAdmin = user?.isAdmin;
  const [prevTale, tale, nextTale] =
    data && data?.length > 0 ? data : [null, null, null];

  if (isLoading) {
    return (
      <Loader loadingText="Loading Tale..." />
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 text-red-700 p-4 rounded-md">
        Failed to load the tale. Please try again later.
      </div>
    );
  }

  if (!tale) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Tale not found.</p>
        <Link href="/" className="mt-4 text-blue-600 hover:underline block">
          Return to homepage
        </Link>
      </div>
    );
  }

  // const formattedDate = new Date(tale.createdAt).toLocaleDateString();

  const navigateToTaleById = (taleId: string | undefined) => {
    if (taleId) {
      router.push(`/tales/${taleId}`);
    } else {
      return;
    }
  };

  return (
    <div className={`max-w-4xl sm:mx-auto bg-white rounded-lg shadow-md overflow-hidden mx-2 ${!isAdmin && "select-none"}`}>
      <button
        className={`${
          prevTale?._id
            ? "bg-blue-200/50 text-blue-500/50 active:bg-blue-400 duration-300"
            : "bg-gray-200/50 text-gray-500/50 "
        } rounded-full p-1 fixed top-[50%] left-[2px] sm:left-[1%] md:left-[2%] lg:left-[3%] cursor-pointer`}
        disabled={!prevTale?._id}
        onClick={() => navigateToTaleById(prevTale?._id)}
      >
        <ChevronLeft fontSize="large" />
      </button>
      <button
        className={`${
          nextTale?._id
            ? "bg-blue-200/50 text-blue-500/50 active:bg-blue-400 duration-300"
            : "bg-gray-200/50 text-gray-500/50 "
        } rounded-full p-1 fixed top-[50%] right-[2px] sm:right-[1%] md:right-[2%] lg:right-[3%] cursor-pointer`}
        disabled={!nextTale?._id}
        onClick={() => navigateToTaleById(nextTale?._id)}
      >
        <ChevronRight fontSize="large" />
      </button>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-4 text-gray-900">{tale.title}</h1>

        <div className="text-sm text-gray-500 mb-6">
          Created on: {formatDate(tale.createdAt)}
        </div>

        <div className="bg-gray-200 p-4 rounded-md mb-4">
          <h2 className="text-xl font-semibold mb-2 text-gray-800">
            Description
          </h2>
          <p className="text-gray-700">{tale.description}</p>
        </div>

        <div className="prose max-w-none">
          <h2 className="text-xl font-semibold mb-2 text-gray-800">Tale</h2>
          <pre className="whitespace-pre-line text-gray-700 font-sans mt-0 pt-0">
            {tale.content}
          </pre>
        </div>
      </div>

      <div className="px-8 py-4 bg-gray-50 flex justify-between">
        <Link href="/" className="text-blue-600 hover:underline">
          Back to all tales
        </Link>

        {isAdmin && (
          <Link
            href={`/admin/edit/${tale._id}`}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Edit Tale
          </Link>
        )}
      </div>
    </div>
  );
}

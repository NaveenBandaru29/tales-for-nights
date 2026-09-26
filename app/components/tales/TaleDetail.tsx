"use client";

import { useState, useEffect } from "react";
import { useGetTaleByIdQuery } from "@/app/hooks/queries/useTalesQuery";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowBackRounded, EditOutlined } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { TaleDetailSkeleton } from "../ui/Loader";
import { formatDate } from "@/app/utils/helpers";
import EditorTextReadOnly from "../common/CustomEditor/EditorTextReadOnly";
import { Chip, IconButton } from '@mui/material';
import CustomTooltip from '@/app/components/ui/CustomTooltip';
import HashTagIcon from "@/public/Icons/HashTagIcon";
import { motion } from "framer-motion";

interface TaleDetailProps {
  id: string;
}

export default function TaleDetail({ id }: TaleDetailProps) {
  const { data, isLoading, isFetching, isRefetching, error } = useGetTaleByIdQuery(id);
  const { user } = useSelector((state: RootState) => state.auth);
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  const isAdmin = user?.isAdmin;
  const isNewFormat = Array.isArray(data) && data.length === 3;
  const tale = isNewFormat ? data[1] : (data && (Array.isArray(data) ? data[0] : data)) || null;
  const prevTale = isNewFormat ? data[0] : tale?.prevTale;
  const nextTale = isNewFormat ? data[2] : tale?.nextTale;

  if (!mounted || isLoading || isFetching || isRefetching || !(data?.length)) {
    return <TaleDetailSkeleton />;
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/60 text-red-700 dark:text-red-200 p-6 sm:p-8 rounded-2xl shadow-sm text-center my-8">
        <p className="font-semibold text-lg">Failed to load the tale.</p>
        <p className="mt-1 text-sm text-red-500 dark:text-red-400 mb-6">Please try again later.</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-all shadow-md group"
        >
          <ArrowBackRounded fontSize="small" className="transition-transform duration-300 ease-out group-hover:-translate-x-1" /> Return to Homepage
        </Link>
      </div>
    );
  }

  if (!tale) {
    return (
      <div className="text-center py-16 sm:py-20 px-4">
        <p className="text-xl sm:text-2xl font-bold text-gray-600 dark:text-gray-400">Tale not found.</p>
        <Link
          href="/"
          className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl shadow hover:bg-blue-700 transition-colors group"
        >
          <ArrowBackRounded fontSize="small" className="transition-transform duration-300 ease-out group-hover:-translate-x-1" /> Return to homepage
        </Link>
      </div>
    );
  }

  const navigateToTaleById = (taleId: string | undefined) => {
    if (taleId) {
      router.push(`/tales/${taleId}`);
    }
  };

  return (
    <div className="mx-auto mt-4 sm:mt-10 relative max-w-7xl px-2 sm:px-14 lg:px-20 pb-10">
      {/* Floating Side Navigation Buttons (Visible on all devices, sticky relative to the card) */}
      <div className="sticky top-[50vh] z-50 w-full h-0 pointer-events-none">
        <div className="absolute left-0 sm:-left-16 lg:-left-20 pointer-events-auto -translate-y-1/2">
          <CustomTooltip title={prevTale?.title ? `Previous: ${prevTale.title}` : "Previous Tale"} placement="right">
            <span>
              <IconButton
                sx={{
                  zIndex: 50,
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  opacity: prevTale?._id ? 1 : 0.35,
                  cursor: prevTale?._id ? 'pointer' : 'not-allowed',
                  bgcolor: 'rgba(255, 255, 255, 0.7)',
                  color: 'primary.main',
                  backdropFilter: 'blur(16px)',
                  boxShadow: '0 10px 40px -10px rgba(0, 0, 0, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.8)',
                  width: { xs: 32, sm: 40, lg: 48 },
                  height: { xs: 32, sm: 40, lg: 48 },
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 1)',
                    transform: 'scale(1.08)',
                  },
                  '&:active': {
                    transform: 'scale(0.92)',
                  },
                  '&.Mui-disabled': {
                    bgcolor: 'rgba(241, 245, 249, 0.3)',
                    color: 'rgba(148, 163, 184, 0.4)',
                  },
                  '.dark &': {
                    bgcolor: 'rgba(15, 23, 42, 0.5)',
                    color: '#60a5fa',
                    borderColor: 'rgba(51, 65, 85, 0.5)',
                    boxShadow: '0 10px 40px -10px rgba(0, 0, 0, 0.3)',
                    '&:hover': {
                      bgcolor: 'rgba(30, 41, 59, 0.8)',
                      transform: 'scale(1.08)',
                    },
                    '&:active': {
                      transform: 'scale(0.92)',
                    },
                    '&.Mui-disabled': {
                      bgcolor: 'rgba(30, 41, 59, 0.2)',
                      color: 'rgba(100, 116, 139, 0.3)',
                    },
                  }
                }}
                disabled={!prevTale?._id}
                onClick={() => navigateToTaleById(prevTale?._id)}
                aria-label="Previous tale"
              >
                <ChevronLeft fontSize="inherit" />
              </IconButton>
            </span>
          </CustomTooltip>
        </div>

        <div className="absolute right-0 sm:-right-16 lg:-right-20 pointer-events-auto -translate-y-1/2">
          <CustomTooltip title={nextTale?.title ? `Next: ${nextTale.title}` : "Next Tale"} placement="left">
            <span>
              <IconButton
                sx={{
                  zIndex: 50,
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  opacity: nextTale?._id ? 1 : 0.35,
                  cursor: nextTale?._id ? 'pointer' : 'not-allowed',
                  bgcolor: 'rgba(255, 255, 255, 0.7)',
                  color: 'primary.main',
                  backdropFilter: 'blur(16px)',
                  boxShadow: '0 10px 40px -10px rgba(0, 0, 0, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.8)',
                  width: { xs: 32, sm: 40, lg: 48 },
                  height: { xs: 32, sm: 40, lg: 48 },
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 1)',
                    transform: 'scale(1.08)',
                  },
                  '&:active': {
                    transform: 'scale(0.92)',
                  },
                  '&.Mui-disabled': {
                    bgcolor: 'rgba(241, 245, 249, 0.3)',
                    color: 'rgba(148, 163, 184, 0.4)',
                  },
                  '.dark &': {
                    bgcolor: 'rgba(15, 23, 42, 0.5)',
                    color: '#60a5fa',
                    borderColor: 'rgba(51, 65, 85, 0.5)',
                    boxShadow: '0 10px 40px -10px rgba(0, 0, 0, 0.3)',
                    '&:hover': {
                      bgcolor: 'rgba(30, 41, 59, 0.8)',
                      transform: 'scale(1.08)',
                    },
                    '&:active': {
                      transform: 'scale(0.92)',
                    },
                    '&.Mui-disabled': {
                      bgcolor: 'rgba(30, 41, 59, 0.2)',
                      color: 'rgba(100, 116, 139, 0.3)',
                    },
                  }
                }}
                disabled={!nextTale?._id}
                onClick={() => navigateToTaleById(nextTale?._id)}
                aria-label="Next tale"
              >
                <ChevronRight fontSize="inherit" />
              </IconButton>
            </span>
          </CustomTooltip>
        </div>
      </div>

      <motion.article
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className={`relative rounded-[2rem] sm:rounded-[2.5rem] shadow-2xl shadow-blue-900/5 dark:shadow-none overflow-hidden transition-all duration-300 bg-white/60 dark:bg-slate-900/40 backdrop-blur-3xl border border-white/60 dark:border-slate-700/50 ${!isAdmin && "select-none"}`}
      >
        {/* Subtle inner glow for premium glass effect */}
        <div className="absolute inset-0 rounded-[2rem] sm:rounded-[2.5rem] border border-white/20 dark:border-white/5 pointer-events-none z-0"></div>

        {/* Main Content Body */}
        <div className="relative p-6 sm:p-10 md:p-14 z-10">
          {/* Top Navigation for mobile/desktop */}
          <div className="mb-10 justify-start">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-semibold text-gray-600 dark:text-gray-300 bg-white/40 dark:bg-slate-800/40 hover:bg-white/80 dark:hover:bg-slate-800/80 border border-gray-200/60 dark:border-gray-700/60 rounded-full shadow-sm hover:shadow-md transition-all duration-300 backdrop-blur-md group cursor-pointer"
            >
              <span className="transform transition-transform duration-300 group-hover:-translate-x-1.5 opacity-80 group-hover:opacity-100 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                <ArrowBackRounded sx={{ height: '18px', width: '18px' }} />
              </span>
              <span className="group-hover:text-gray-900 dark:group-hover:text-white transition-colors">Back to all tales</span>
            </Link>
          </div>

          {/* Header */}
          <header className="mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 dark:from-white dark:via-blue-300 dark:to-white pb-2 drop-shadow-sm mb-4 break-words leading-tight">
              {tale.title}
            </h1>

            <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wide uppercase text-gray-400 dark:text-gray-500">
              <span>Published on {formatDate(tale.createdAt)}</span>
            </div>
          </header>

          {/* Description Box */}
          {tale.description && (
            <div className="bg-white/40 dark:bg-slate-800/30 border border-white/60 dark:border-slate-700/50 p-6 sm:p-8 rounded-[1.5rem] sm:rounded-[2rem] mb-8 sm:mb-12 backdrop-blur-md shadow-sm">
              <h2 className="text-[11px] sm:text-xs uppercase tracking-widest font-bold text-blue-600 dark:text-blue-400 mb-3 opacity-90">
                Overview
              </h2>
              <p className="text-gray-800 dark:text-gray-200 leading-relaxed text-sm sm:text-base break-words font-medium">
                "{tale.description}"
              </p>
            </div>
          )}

          {/* Tags */}
          {tale.tags && tale.tags.length > 0 && (
            <div className="flex items-center gap-3 mb-8 sm:mb-12 flex-wrap">
              <span className="text-blue-500 dark:text-blue-400 text-lg sm:text-xl opacity-80">
                <HashTagIcon />
              </span>
              <div className="flex gap-2 flex-wrap">
                {tale.tags.map((tagLabel: string, index: number) => (
                  <Chip
                    label={tagLabel}
                    key={tagLabel + index}
                    size="small"
                    sx={{
                      fontSize: '0.75rem',
                      height: '28px',
                      borderRadius: '8px',
                      bgcolor: 'rgba(59, 130, 246, 0.08) !important',
                      color: '#2563eb !important',
                      border: '1px solid rgba(59, 130, 246, 0.15)',
                      fontWeight: 600,
                      px: 0.5,
                      '.dark &': {
                        bgcolor: 'rgba(96, 165, 250, 0.08) !important',
                        color: '#60a5fa !important',
                        border: '1px solid rgba(96, 165, 250, 0.15)',
                      },
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Rich Tale Content */}
          <div className="prose dark:prose-invert max-w-none text-gray-800 dark:text-gray-100 leading-relaxed sm:leading-loose text-base sm:text-lg break-words overflow-hidden font-medium">
            <EditorTextReadOnly content={tale.content} />
          </div>

          {/* In-Content Previous / Next Navigation Cards (Especially helpful on Mobile) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-16 pt-10 border-t border-gray-200/50 dark:border-gray-700/50">
            {prevTale?._id ? (
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigateToTaleById(prevTale._id)}
                className="cursor-pointer flex items-center gap-4 p-4 sm:p-5 rounded-2xl sm:rounded-[1.5rem] text-left bg-white/40 hover:bg-white/80 dark:bg-slate-800/30 dark:hover:bg-slate-800/60 border border-white/60 dark:border-slate-700/50 transition-colors duration-300 shadow-sm hover:shadow-lg backdrop-blur-md group w-full"
              >
                <div className="p-2 rounded-xl bg-white/80 dark:bg-slate-700/80 border border-gray-200/60 dark:border-gray-600 group-hover:border-blue-300 dark:group-hover:border-blue-600 transition-colors shadow-xs shrink-0">
                  <ChevronLeft className="text-gray-600 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[10px] uppercase tracking-widest text-gray-500 dark:text-gray-400 font-bold mb-1">Previous</span>
                  <span className="text-xs sm:text-sm font-extrabold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 truncate transition-colors">
                    {prevTale.title || "Previous Tale"}
                  </span>
                </div>
              </motion.button>
            ) : <div />}

            {nextTale?._id ? (
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigateToTaleById(nextTale._id)}
                className="cursor-pointer flex items-center justify-end gap-4 p-4 sm:p-5 rounded-2xl sm:rounded-[1.5rem] text-right bg-white/40 hover:bg-white/80 dark:bg-slate-800/30 dark:hover:bg-slate-800/60 border border-white/60 dark:border-slate-700/50 transition-colors duration-300 shadow-sm hover:shadow-lg backdrop-blur-md group w-full"
              >
                <div className="flex flex-col min-w-0">
                  <span className="text-[10px] uppercase tracking-widest text-gray-500 dark:text-gray-400 font-bold mb-1">Next</span>
                  <span className="text-xs sm:text-sm font-extrabold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 truncate transition-colors">
                    {nextTale.title || "Next Tale"}
                  </span>
                </div>
                <div className="p-2 rounded-xl bg-white/80 dark:bg-slate-700/80 border border-gray-200/60 dark:border-gray-600 group-hover:border-blue-300 dark:group-hover:border-blue-600 transition-colors shadow-xs shrink-0">
                  <ChevronRight className="text-gray-600 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                </div>
              </motion.button>
            ) : <div />}
          </div>
        </div>

        {/* Footer Navigation Bar */}
        <footer className="relative z-10 px-6 sm:px-10 py-6 bg-white/40 dark:bg-slate-900/40 backdrop-blur-2xl flex flex-col sm:flex-row justify-between items-center gap-5 border-t border-white/60 dark:border-slate-700/50 transition-colors">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-7 py-3 text-sm font-semibold text-gray-700 dark:text-gray-200 bg-white/50 dark:bg-slate-800/50 hover:bg-white/90 dark:hover:bg-slate-700/80 border border-white/60 dark:border-slate-600/50 rounded-full shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_15px_rgba(0,0,0,0.05)] dark:shadow-none transition-all duration-300 backdrop-blur-md group w-full sm:w-auto cursor-pointer"
          >
            <span className="transform transition-transform duration-300 group-hover:-translate-x-1.5 opacity-80 group-hover:opacity-100 group-hover:text-blue-600 dark:group-hover:text-blue-400">
              <ArrowBackRounded sx={{ height: '20px', width: '20px' }} />
            </span>
            <span className="group-hover:text-gray-900 dark:group-hover:text-white transition-colors">Back to all tales</span>
          </Link>

          {isAdmin && (
            <Link
              href={`/admin/edit/${tale._id}`}
              className="relative inline-flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-sm font-bold tracking-wide rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_25px_rgba(37,99,235,0.5)] active:scale-[0.98] w-full sm:w-auto group overflow-hidden cursor-pointer"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
              <EditOutlined fontSize="small" className="opacity-90 group-hover:opacity-100 transition-opacity relative z-10" />
              <span className="relative z-10">Edit Tale</span>
            </Link>
          )}
        </footer>
      </motion.article >
    </div >
  );
}

"use client";

import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import LogoutButton from "../auth/LoginButton";
import Image from "next/image";
import { IconButton } from '@mui/material';
import CustomTooltip from '@/app/components/ui/CustomTooltip';
import { MenuRounded, CloseRounded } from "@mui/icons-material";
import ThemeToggle from "./ThemeToggle";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useTheme } from "@/app/context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
	const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
	const [mounted, setMounted] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		setMounted(true);
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 10);
		};
		window.addEventListener("scroll", handleScroll, { passive: true });
		handleScroll();
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const pathname = usePathname();
	const { isDarkMode } = useTheme();

	const navLinks = [
		{ label: "Scars", path: "/", show: true },
		{ label: "Charm", path: "/charm", show: true },
		{ label: "Venom ☠️", path: "/raw", show: true },
	];

	const sideBarLinks = [
		...navLinks,
		{ label: "Admin Dashboard", path: "/admin", show: mounted && isAuthenticated && user?.isAdmin },
	];

	// Disable body scroll when menu is open
	useEffect(() => {
		if (isMenuOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'auto';
		}
		return () => {
			document.body.style.overflow = 'auto';
		};
	}, [isMenuOpen]);

	// Close menu on route change
	useEffect(() => {
		setIsMenuOpen(false);
	}, [pathname]);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	// Animation variants for the mobile sidebar
	const sidebarVariants = {
		open: { x: 0, transition: { type: 'spring' as const, stiffness: 300, damping: 30 } },
		closed: { x: '100%', transition: { type: 'spring' as const, stiffness: 300, damping: 30 } }
	};

	const overlayVariants = {
		open: { opacity: 1, transition: { duration: 0.3 } },
		closed: { opacity: 0, transition: { duration: 0.3 } }
	};

	const itemVariants = {
		open: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 300, damping: 24 } },
		closed: { opacity: 0, y: 20, transition: { duration: 0.2 } }
	};

	return (
		<header className="fixed top-0 inset-x-0 z-50 pointer-events-none flex flex-col items-center">
			{/* Full-width background that fades in when scrolled */}
			<motion.div
				className="absolute top-0 inset-x-0 h-[64px] sm:h-[72px] bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg shadow-sm border-b border-gray-200/50 dark:border-gray-800/50 pointer-events-auto"
				initial={false}
				animate={{ opacity: isScrolled ? 1 : 0 }}
				transition={{ duration: 0.3, ease: "easeInOut" }}
			/>

			{/* Content Container */}
			<motion.div
				className="relative w-full max-w-7xl pointer-events-auto"
				initial={false}
				animate={{ paddingTop: isScrolled ? "0px" : "12px" }}
				transition={{ type: "spring", stiffness: 300, damping: 30 }}
			>
				{/* Floating Pill Background that fades out when scrolled */}
				<motion.div
					className="absolute inset-x-3 sm:inset-x-6 lg:inset-x-8 bottom-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl shadow-md border border-gray-200/50 dark:border-gray-700/50 rounded-2xl -z-10"
					initial={false}
					animate={{
						top: isScrolled ? "0px" : "12px",
						opacity: isScrolled ? 0 : 1,
					}}
					transition={{ duration: 0.3, ease: "easeInOut" }}
				/>

				<nav className="flex justify-between items-center h-[64px] sm:h-[72px] px-6 sm:px-10 lg:px-14">

					{/* Logo */}
					<Link href="/" className="flex items-center space-x-3 group">
						<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
							<Image
								src={"/TFN_LOGO.png"}
								alt="Tales For Nights logo"
								width={36}
								height={36}
								className="rounded-full shadow-md"
							/>
						</motion.div>
						<div className="flex flex-col">
							<span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
								Tales For Nights
							</span>
							<span className="text-[10px] uppercase tracking-wider text-gray-500 dark:text-gray-400 font-medium">
								I walk, I weep, I write
							</span>
						</div>
					</Link>



					{/* Desktop Right Actions */}
					<div className="hidden sm:flex items-center gap-2">
						{mounted && isAuthenticated && user?.isAdmin && (
							<CustomTooltip title="Admin Dashboard">
								<IconButton LinkComponent={Link} href="/admin" size="small">
									<DashboardIcon sx={{ color: isDarkMode ? "#e2e8f0" : "#334155" }} />
								</IconButton>
							</CustomTooltip>
						)}

						<ThemeToggle />

						{mounted && isAuthenticated && (
							<div className="flex items-center gap-2 ml-2 pl-2 border-l border-gray-300 dark:border-gray-700">
								<LogoutButton />
								<CustomTooltip title={user?.isAdmin ? `Admin: ${user?.username}` : user?.username} arrow>
									<motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
										<AccountCircleIcon sx={{ fontSize: 32, color: isDarkMode ? "#e2e8f0" : "#334155" }} />
									</motion.div>
								</CustomTooltip>
							</div>
						)}
					</div>

					{/* Mobile Menu Toggle & Theme Toggle */}
					<div className="sm:hidden flex items-center space-x-2">
						<ThemeToggle />
						<IconButton onClick={toggleMenu} aria-label="Toggle navigation menu" size="small">
							{isMenuOpen ? (
								<CloseRounded sx={{ color: isDarkMode ? "#f8fafc" : "#0f172a", fontSize: 28 }} />
							) : (
								<MenuRounded sx={{ color: isDarkMode ? "#f8fafc" : "#0f172a", fontSize: 28 }} />
							)}
						</IconButton>
					</div>
				</nav>

				{/* Mobile Menu Overlay & Content */}
				<AnimatePresence>
					{isMenuOpen && (
						<>
							{/* Backdrop */}
							<motion.div
								className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm sm:hidden"
								variants={overlayVariants}
								initial="closed"
								animate="open"
								exit="closed"
								onClick={toggleMenu}
							/>

							{/* Sidebar */}
							<motion.div
								className="fixed right-0 top-0 h-[100dvh] w-3/4 max-w-sm z-50 bg-white dark:bg-slate-900 shadow-2xl border-l border-gray-200 dark:border-gray-800 sm:hidden flex flex-col"
								variants={sidebarVariants}
								initial="closed"
								animate="open"
								exit="closed"
							>
								{/* Mobile Header */}
								<div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800">
									<span className="font-bold text-gray-800 dark:text-gray-200">Menu</span>
									<IconButton onClick={toggleMenu} size="small">
										<CloseRounded sx={{ color: isDarkMode ? "#f8fafc" : "#0f172a" }} />
									</IconButton>
								</div>

								{/* Mobile Links */}
								<div className="flex flex-col p-4 space-y-2 overflow-y-auto">
									{sideBarLinks.map((link, i) => (
										link.show && (
											<motion.div
												key={link.path}
												variants={itemVariants}
												initial="closed"
												animate="open"
												transition={{ delay: i * 0.05 }}
											>
												<Link
													href={link.path}
													className={`block px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${pathname === link.path
														? "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
														: "text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-slate-800"
														}`}
													onClick={toggleMenu}
												>
													{link.label}
												</Link>
											</motion.div>
										)
									))}
								</div>

								{/* Mobile Footer (Auth) */}
								{mounted && isAuthenticated && (
									<motion.div
										className="mt-auto p-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-slate-800/50"
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										transition={{ delay: 0.3 }}
									>
										<div className="flex items-center gap-3 mb-4 px-2">
											<AccountCircleIcon sx={{ fontSize: 36, color: isDarkMode ? "#e2e8f0" : "#334155" }} />
											<div className="flex flex-col">
												<span className="text-xs text-gray-500 dark:text-gray-400">Signed in as</span>
												<span className="font-bold text-sm text-gray-900 dark:text-white">
													{user?.isAdmin ? "Admin: " : ""}{user?.username}
												</span>
											</div>
										</div>
										<div className="w-full" onClick={toggleMenu}>
											<LogoutButton />
										</div>
									</motion.div>
								)}
							</motion.div>
						</>
					)}
				</AnimatePresence>
			</motion.div>
		</header>
	);
}

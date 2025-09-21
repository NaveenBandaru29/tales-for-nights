// components/ui/Navbar.tsx

"use client";

import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import LogoutButton from "../auth/LoginButton";
import Image from "next/image";
import { IconButton, Tooltip } from "@mui/material";
import { MenuRounded, CloseRounded } from "@mui/icons-material";
import ThemeToggle from "./ThemeToggle";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useTheme } from "@/app/context/ThemeContext";


export default function Navbar() {

	const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const pathname = usePathname();
	const { isDarkMode } = useTheme()
	const isActive = (path: string) => (pathname === path ? "bg-gray-200 text-gray-900 dark:bg-slate-700 dark:text-white" : "text-gray-900 dark:text-gray-100");
	const sideBarLinks = [
		{ label: "Tales", path: "/", show: true },
		{ label: "Charm", path: "/charm", show: true },
		{ label: "Venom ☠️", path: "/raw", show: true },
		{ label: "Admin Dashboard", path: "/admin", show: isAuthenticated && user?.isAdmin },
	]

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


	return (
		<nav className="bg-slate-50 dark:bg-slate-800 shadow-sm transition-colors duration-500 ease-in-out fixed z-10 min-w-screen">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
				<div className="flex justify-between items-center h-16">

					{/* Logo */}
					<Link href="/" className="flex items-center space-x-2">
						<Image
							src={"/TFN_LOGO.png"}
							alt="Tales For Nights logo"
							width={30}
							height={30}
							style={{ borderRadius: "50%" }}
						/>
						<div className="flex flex-col">
							<span className="text-lg font-bold text-gray-900 dark:text-white">
								Tales For Nights
							</span>
							<span className="text-xs text-gray-500 dark:text-gray-400">
								I walk, I weep, I write
							</span>
						</div>
					</Link>


					{/* Desktop Navigation Links */}
					<div className="hidden sm:flex items-center gap-2">
						{isAuthenticated && user?.isAdmin && (
							<Tooltip title="Admin Dashboard">
								<IconButton
									LinkComponent={Link}
									href="/admin"
								// className={`rounded-md text-sm font-medium transition-colors duration-200 ${isActive("/admin")}`}
								>
									<DashboardIcon sx={{ color: isDarkMode ? "whitesmoke" : "#111" }} />
								</IconButton>
							</Tooltip>
						)}
						<ThemeToggle />
						{isAuthenticated && (
							<>
								<LogoutButton />
								<Tooltip title={user?.isAdmin ? `Admin: ${user?.username}` : user?.username} style={{ cursor: "pointer" }}>
									<AccountCircleIcon sx={{ fontSize: 30, color: isDarkMode ? "whitesmoke" : "#111" }} color="inherit" />
								</Tooltip>
								{/* <span className="text-sm font-medium text-gray-700 dark:text-gray-300">

                  {user?.isAdmin ? "Admin: " : ""}

                  {user?.username}

                </span> */}
							</>
						)}
					</div>

					{/* Mobile Menu & Theme Toggle */}
					<div className="sm:hidden flex items-center space-x-2">
						<ThemeToggle />
						{/* {isAuthenticated && ( */}
						<IconButton onClick={toggleMenu} aria-label="Toggle navigation menu">
							{isMenuOpen ? (
								<CloseRounded sx={{ color: isDarkMode ? "whitesmoke" : "#111", fontSize: 30 }} fontSize="medium" />
							) : (
								<MenuRounded sx={{ color: isDarkMode ? "whitesmoke" : "#111", fontSize: 30 }} fontSize="medium" />
							)}
						</IconButton>
						{/* )} */}
					</div>
				</div>

				{/* Mobile Menu Content */}

				<div className={`fixed inset-0 z-[45] sm:hidden transition-transform duration-500 ease-in-out transform
        ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
				>
					<div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={toggleMenu} />
					<div className="absolute right-0 top-0 h-full w-2/3 max-w-sm bg-white dark:bg-gray-950/90 shadow-lg py-3 px-4 flex flex-col items-start space-y-4">
						<div className="w-full flex justify-end">
							<IconButton onClick={toggleMenu} aria-label="Close navigation menu">
								<CloseRounded sx={{ color: isDarkMode ? "whitesmoke" : "#111", fontSize: 30 }} fontSize="medium" />
							</IconButton>
						</div>
						{
							sideBarLinks?.map((link) => (
								link.show && <Link key={link.path}
									href={link.path}
									className={`w-full px-4 py-3 rounded-md text-base font-medium transition-colors duration-200 text-gray-900 dark:text-gray-100 ${isActive(link.path)}`}
									onClick={toggleMenu}
								>
									{link.label}
								</Link>
							))
						}
						{isAuthenticated && (
							<>
								<div className="w-full px-4 py-2 text-base font-medium text-gray-700 dark:text-gray-300">
									<div className="flex items-center gap-2">
										<AccountCircleIcon sx={{ fontSize: 30, color: isDarkMode ? "whitesmoke" : "#111" }} />
										<span className="font-bold">{user?.isAdmin ? "Admin: " : ""}{user?.username}</span>
									</div>
								</div>
								<LogoutButton />
							</>
						)}
					</div>
				</div>
			</div>
		</nav>
	);

}

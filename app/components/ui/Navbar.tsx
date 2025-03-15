// components/ui/Navbar.tsx
"use client";

import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import LogoutButton from "../auth/LoginButton";
import { IoClose } from "react-icons/io5";
import Image from "next/image";

export default function Navbar() {
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path ? "bg-blue-700" : "";
  };

  // State to toggle the mobile menu visibility
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16 ">
          <div className="flex items-center justify-between md:justify-start w-[100vw]">
            <Link
              href="/"
              className="text-xl font-semibold flex gap-2 items-center"
            >
              <Image
                src={"/TFN_LOGO.png"}
                alt="tfn_logo"
                width={25}
                height={25}
              />
              Tales For <span className="text-[24px] font-bold">Nights</span>
            </Link>

            {/* Mobile Menu Toggle Button */}
            <div className="md:hidden flex">
              {
                isAuthenticated &&
              <button
                onClick={toggleMenu}
                className="text-white focus:outline-none"
              >
                {!isMenuOpen ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-8 w-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    ></path>
                  </svg>
                ) : (
                  <IoClose className="text-4xl font-bold" />
                )}
              </button>
              }
            </div>

            {/* Navigation Links (Desktop) */}
            <div className="ml-10 hidden md:flex items-center space-x-4">
              {/* <Link 
                href="/" 
                className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 duration-300 ${isActive('/')}`}
              >
                Home
              </Link> */}
              <div>
                {isAuthenticated && user?.isAdmin && (
                  <div>
                    <Link
                      href="/admin"
                      className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 duration-300 ${isActive(
                        "/admin"
                      )} mr-4`}
                    >
                      Admin Dashboard
                    </Link>
                    {/* <Link 
                    href="/admin/create" 
                    className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 duration-300 ${isActive('/admin/create')}`}
                  >
                    Create Tale
                  </Link> */}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="hidden sm:flex items-center ">
            {
              isAuthenticated && (
                <div className="md:flex items-center space-x-4 hidden ">
                  <span className="text-sm font-medium">
                    {user?.isAdmin ? "Admin: " : ""}
                    {user?.username}
                  </span>
                  <LogoutButton />
                </div>
              )
              // : (
              // You can uncomment the login link here if needed for mobile
              // <Link
              //   href="/login"
              //   className="px-4 py-2 rounded-md text-sm font-medium bg-white text-blue-600 hover:bg-gray-100 duration-300"
              // >
              //   Login
              // </Link>
              // )
            }
          </div>
        </div>

        {/* Mobile Menu (on smaller screens) */}
        <div className={`lg:hidden ${isMenuOpen ? "block" : "hidden"}`}>
          <div className="flex flex-col items-start pb-2 gap-1">
            <Link
              href="/"
              className={`py-4 px-2 w-full rounded-md text-sm font-medium hover:bg-blue-700 duration-300 ${isActive(
                "/"
              )}`}
              onClick={toggleMenu}
            >
              Home
            </Link>

            {isAuthenticated && user?.isAdmin && (
              <Link
                href="/admin"
                className={`py-4 px-2 w-full rounded-md text-sm font-medium hover:bg-blue-700 duration-300 ${isActive(
                  "/admin"
                )}`}
                onClick={toggleMenu}
              >
                Admin Dashboard
              </Link>
            )}

            {/* Mobile Logout */}
            {isAuthenticated && (
              <div className="my-2">
                <LogoutButton />
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

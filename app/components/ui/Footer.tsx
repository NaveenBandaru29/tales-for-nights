import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full py-6 px-4 sm:px-6 bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 transition-colors duration-500">
      <div className="container mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between text-center sm:text-left">
        {/* Copyright Section */}
        <p className="text-sm text-gray-600 dark:text-gray-400">
          &copy; {new Date().getFullYear()} Tales For Nights, All Rights Reserved.
        </p>

        {/* Optional: Add links for a more professional feel */}
        {/* <div className="flex flex-wrap justify-center sm:justify-end gap-x-4 gap-y-2 mt-4 sm:mt-0">
          <Link href="/about" className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors duration-200">
            About Us
          </Link>
          <Link href="/privacy" className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors duration-200">
            Privacy Policy
          </Link>
          <Link href="/contact" className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors duration-200">
            Contact
          </Link>
        </div> */}
      </div>
    </footer>
  );
};

export default Footer;
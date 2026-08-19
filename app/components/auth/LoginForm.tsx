'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLoginMutation } from '@/app/hooks/mutations/useAuthMutation';
import { useDispatch } from 'react-redux';
import { setUser } from '@/app/store/slices/authSlice';
import { Backdrop, CircularProgress } from '@mui/material';
// import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
// import { User } from '@/app/types';


import { motion } from 'framer-motion';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { mutate: login, isPending: isLoading } = useLoginMutation();
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    login({ username, password }, {
      onSuccess: (response: any) => {
        console.log('Login success:', response);
        if (response) {
          const { token, user } = response;
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(user));
          dispatch(setUser({ user, token }));
          router.push('/admin');
          setError("");
        }
      },
      onError: (error: any) => {
        console.log('Login failed:', error?.error);
        setError(error?.error || "Login Failed. Please try again")
      }
    });

    setLoading(false);
    setUsername("");
    setPassword("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full p-8 sm:p-12 bg-white/60 dark:bg-slate-900/50 backdrop-blur-3xl rounded-[2rem] shadow-2xl shadow-blue-900/5 dark:shadow-none border border-white/60 dark:border-slate-700/50 transition-all duration-300"
    >
      {/* Subtle inner glow for premium glass effect */}
      <div className="absolute inset-0 rounded-[2rem] border border-white/20 dark:border-white/5 pointer-events-none"></div>

      {error && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mb-8 p-4 bg-red-50/80 dark:bg-red-900/20 border border-red-100 dark:border-red-800/30 text-red-600 dark:text-red-400 rounded-2xl text-sm text-center font-medium backdrop-blur-md"
        >
          {(error) || "Login failed"}
        </motion.div>
      )}

      <Backdrop open={isLoading || loading} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backdropFilter: 'blur(8px)', backgroundColor: 'rgba(0,0,0,0.1)' }}>
        <CircularProgress sx={{ color: "#3b82f6" }} size={40} thickness={4} />
      </Backdrop>

      <form onSubmit={handleSubmit} className="space-y-7">
        <div className="space-y-2">
          <label className="block text-[11px] uppercase tracking-widest font-bold text-gray-500 dark:text-gray-400 ml-1" htmlFor="username">
            Username
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            className="w-full px-5 py-4 border border-gray-200/80 dark:border-slate-700/80 rounded-2xl bg-white/50 dark:bg-slate-800/50 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/50 transition-all duration-300 shadow-sm hover:bg-white/80 dark:hover:bg-slate-800/80"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-[11px] uppercase tracking-widest font-bold text-gray-500 dark:text-gray-400 ml-1" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full px-5 py-4 border border-gray-200/80 dark:border-slate-700/80 rounded-2xl bg-white/50 dark:bg-slate-800/50 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/50 transition-all duration-300 shadow-sm hover:bg-white/80 dark:hover:bg-slate-800/80"
            required
          />
        </div>

        <motion.button
          type="submit"
          disabled={isLoading || loading}
          whileHover={{ scale: (isLoading || loading) ? 1 : 1.02 }}
          whileTap={{ scale: (isLoading || loading) ? 1 : 0.98 }}
          className={`relative w-full mt-4 py-4 px-4 font-bold text-sm tracking-wide rounded-2xl transition-all duration-300 overflow-hidden group
            ${isLoading || loading
              ? "bg-gray-100 dark:bg-slate-800 text-gray-400 dark:text-gray-500 cursor-not-allowed border border-gray-200 dark:border-gray-700"
              : "bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-xl shadow-gray-900/20 dark:shadow-white/10 hover:shadow-2xl hover:shadow-gray-900/30 dark:hover:shadow-white/20"
            }`}
        >
          {/* Subtle shine effect on hover for the button */}
          {!(isLoading || loading) && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-black/10 to-transparent skew-x-12"
              initial={{ x: '-150%' }}
              whileHover={{ x: '150%' }}
              transition={{ duration: 1, ease: "easeInOut" }}
            />
          )}
          <span className="relative z-10">{isLoading || loading ? 'Authenticating...' : 'Sign In'}</span>
        </motion.button>
      </form>
    </motion.div>
  );
}
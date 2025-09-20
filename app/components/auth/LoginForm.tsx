'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLoginMutation } from '../../store/apis/authApi';
import { useDispatch } from 'react-redux';
import { setUser } from '@/app/store/slices/authSlice';
import { Backdrop, CircularProgress } from '@mui/material';
// import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
// import { User } from '@/app/types';


export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [login, { isLoading, error, }] = useLoginMutation();
  const [loading, setLoading] = useState(false)
  const router = useRouter();
  const dispatch = useDispatch()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true)

    try {
      const res: any = await login({ username, password }).unwrap();
      if (res?.data) {
        const { token, user } = res?.data
        localStorage.setItem("token", token)
        localStorage.setItem("user", JSON.stringify(user))
        dispatch(setUser(user))
        router.push('/admin');
      }
    } catch (err) {
      console.log('Login failed:', err);
    }
    setLoading(false)
    setUsername("")
    setPassword("")
  };

  return (
    <div className="relative max-w-lg self-center mx-auto p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl transition-all duration-300">
      {error && (
        <div className="mb-4 p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100 rounded-lg text-sm text-center">
          {(error as any)?.data.error}
        </div>
      )}
      <Backdrop open={isLoading || loading} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <CircularProgress sx={{ color: "#FAFAFA" }} />
      </Backdrop>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium" htmlFor="username">
            Username
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
            required
          />
        </div>

        <button
          type="submit"
          className={`w-full py-3 px-4 font-semibold rounded-lg transition-all duration-300 transform active:scale-95
            ${isLoading || loading
              ? "bg-gray-300 dark:bg-gray-600 text-gray-500 cursor-not-allowed"
              : "bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600 shadow-md hover:shadow-lg"
            }`}
          disabled={isLoading}
        >
          {isLoading || loading ? 'Logging in...' : 'Log In'}
        </button>
      </form>
    </div>
  );
}
// components/auth/LoginForm.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLoginMutation } from '../../store/apis/authApi';
import { useDispatch } from 'react-redux';
import { setUser } from '@/app/store/slices/authSlice';
// import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
// import { User } from '@/app/types';


export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [login, { isLoading, error }] = useLoginMutation();
  const router = useRouter();
  const dispatch = useDispatch()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const res:any = await login({ username, password }).unwrap();
      if(res?.data){
        const {token,user} = res?.data
        localStorage.setItem("token",token)
        localStorage.setItem("user",JSON.stringify(user))
        dispatch(setUser(user))
        router.push('/admin');
      }
    } catch (err) {
      console.log('Login failed:', err);
    }
    setUsername("")
    setPassword("")
  };

  return (
    <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-md">
      {/* <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2> */}
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {(error as any)?.data.error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="username">
            Username
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 mb-2" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Log In'}
        </button>
      </form>
    </div>
  );
}

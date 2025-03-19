
// components/auth/AuthProvider.tsx
'use client';

import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/slices/authSlice';

interface AuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const dispatch = useDispatch();

  useEffect(() => {
    // Check if user is already logged in (e.g., from a cookie)
    const token = localStorage.getItem('token')
    if(!token){
      return 
    }
    const checkAuth = async () => {
      try {
        const response = await axios.get('/api/auth/me',{
          headers:{
            Authorization:`Bearer ${token}`
          }
        });
        if (response?.data) {
          if(response.data.id){
            dispatch(setUser(response.data))
          }
        }
      } catch (error) {
        console.log('Auth check failed:', error);
      }
    };

    checkAuth();
  }, [dispatch]);

  return <>{children}</>;
}
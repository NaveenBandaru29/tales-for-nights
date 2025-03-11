
// components/auth/LogoutButton.tsx
'use client';

// import { useLogoutMutation } from '../../store/apis/authApi';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import { useRouter } from 'next/navigation';

interface LogoutButtonProps {
  className?: string;
}

export default function LogoutButton({ className = '' }: LogoutButtonProps) {
  // const [logoutApi, { isLoading }] = useLogoutMutation();
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      // await logoutApi().unwrap();
      dispatch(logout());
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
      // Still log the user out from the client side
      dispatch(logout());
      router.push('/');
    }
  };

  return (
    <button
      onClick={handleLogout}
      // disabled={isLoading}
      className={`px-2 py-3 w-[92vw] mb-2 sm:mb-0 text-left sm:flex sm:w-fit text-white bg-red-500 hover:bg-red-600 sm:py-2 sm:px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 disabled:bg-red-300 ${className}`}
    >
      Logout
    </button>
  );
}

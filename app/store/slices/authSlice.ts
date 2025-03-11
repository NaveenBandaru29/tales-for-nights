// store/slices/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authApi } from '../apis/authApi';

interface User {
  id: string;
  username: string;
  isAdmin: boolean;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  error: string | null;
}

// Initialize state from localStorage if available
const loadAuthState = (): AuthState => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    
    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        return {
          user,
          token,
          isAuthenticated: true,
          error: null,
        };
      } catch (e) {
        // Handle parse error
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
  }
  
  return {
    user: null,
    token: null,
    isAuthenticated: false,
    error: null,
  };
};

const initialState: AuthState = loadAuthState();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser:(state,{payload})=>{
      state.user = payload.user;
      state.token = payload.token;
      state.isAuthenticated = true;
      state.error = null;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      
      // Clear localStorage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        authApi.endpoints.login.matchFulfilled,
        (state, { payload }) => {
          state.user = payload.user;
          state.token = payload.token;
          state.isAuthenticated = true;
          state.error = null;
          
          // Save to localStorage
          if (typeof window !== 'undefined') {
            localStorage.setItem('token', payload.token);
            localStorage.setItem('user', JSON.stringify(payload.user));
          }
        }
      )
      .addMatcher(
        authApi.endpoints.login.matchRejected,
        (state, { error }) => {
          state.error = error.message || 'Login failed';
        }
      );
  },
});

export const { logout, clearError,setUser } = authSlice.actions;
export default authSlice.reducer;
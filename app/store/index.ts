import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import { talesApi } from './apis/talesApi';
import { authApi } from './apis/authApi';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [talesApi.reducerPath]: talesApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(talesApi.middleware, authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
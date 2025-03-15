import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import { talesApi } from './apis/talesApi';
import { authApi } from './apis/authApi';
import { rawApi } from './apis/rawApi';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [talesApi.reducerPath]: talesApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [rawApi.reducerPath]: rawApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      talesApi.middleware, 
      authApi.middleware,
      rawApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
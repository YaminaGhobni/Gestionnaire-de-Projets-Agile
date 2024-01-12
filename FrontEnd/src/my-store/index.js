import { configureStore } from '@reduxjs/toolkit';
import exampleReducer from './slices/exampleSlice';
import memberReducer from './slices/users-rolesSlice';

export const store = configureStore({
  reducer: {
    example: exampleReducer,
    members: memberReducer,
  },
  // devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

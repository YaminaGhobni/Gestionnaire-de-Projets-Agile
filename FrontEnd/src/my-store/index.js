import { configureStore } from '@reduxjs/toolkit';
import exampleReducer from './slices/exampleSlice';
import memberReducer from './slices/users-rolesSlice';
import projectReducer from './slices/projectsSlice';

export const store = configureStore({
  reducer: {
    example: exampleReducer,
    members: memberReducer,
    projects: projectReducer,
  },
  // devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

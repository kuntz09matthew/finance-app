import { configureStore } from '@reduxjs/toolkit';

// Example slice (replace with real slices as needed)

import { exampleReducer } from './features/example/exampleSlice';
import dashboardWidgetsReducer from './features/dashboard/dashboardWidgetsSlice';

export const store = configureStore({
  reducer: {
    example: exampleReducer,
    dashboardWidgets: dashboardWidgetsReducer,
  },
  // Add middleware here if needed
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

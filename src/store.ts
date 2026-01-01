import { configureStore } from '@reduxjs/toolkit';

// Example slice (replace with real slices as needed)

import { exampleReducer } from './features/example/exampleSlice';
import dashboardWidgetsReducer from './features/dashboard/dashboardWidgetsSlice';
import incomeReducer from './features/income/incomeSlice';

export const store = configureStore({
  reducer: {
    example: exampleReducer,
    dashboardWidgets: dashboardWidgetsReducer,
    income: incomeReducer,
  },
  // Add middleware here if needed
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

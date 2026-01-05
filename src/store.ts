import { configureStore } from '@reduxjs/toolkit';

// Example slice (replace with real slices as needed)

import { exampleReducer } from './features/example/exampleSlice';
import dashboardWidgetsReducer from './features/dashboard/dashboardWidgetsSlice';
import incomeReducer from './features/income/incomeSlice';
import retirementReducer from './features/retirement/retirementSlice';

export const store = configureStore({
  reducer: {
    example: exampleReducer,
    dashboardWidgets: dashboardWidgetsReducer,
    income: incomeReducer,
    retirement: retirementReducer,
  },
  // Add middleware here if needed
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

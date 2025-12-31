import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type WidgetId = 'balances' | 'income' | 'expenses' | 'savings' | 'goals';

export interface DashboardWidgetsState {
  order: WidgetId[];
  hidden: WidgetId[];
}

const initialState: DashboardWidgetsState = {
  order: ['balances', 'income', 'expenses', 'savings', 'goals'],
  hidden: [],
};

const dashboardWidgetsSlice = createSlice({
  name: 'dashboardWidgets',
  initialState,
  reducers: {
    setOrder(state, action: PayloadAction<WidgetId[]>) {
      state.order = action.payload;
    },
    hideWidget(state, action: PayloadAction<WidgetId>) {
      if (!state.hidden.includes(action.payload)) {
        state.hidden.push(action.payload);
      }
    },
    showWidget(state, action: PayloadAction<WidgetId>) {
      state.hidden = state.hidden.filter((id) => id !== action.payload);
    },
    resetWidgets(state) {
      state.order = initialState.order;
      state.hidden = [];
    },
  },
});

export const { setOrder, hideWidget, showWidget, resetWidgets } = dashboardWidgetsSlice.actions;
export default dashboardWidgetsSlice.reducer;

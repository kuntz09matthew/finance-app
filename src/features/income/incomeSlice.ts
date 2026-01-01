import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IncomeSource {
  id: string;
  source: string;
  amount: number;
  frequency: 'weekly' | 'bi-weekly' | 'monthly' | 'annual';
}

interface IncomeState {
  sources: IncomeSource[];
}

const initialState: IncomeState = {
  sources: [],
};

const incomeSlice = createSlice({
  name: 'income',
  initialState,
  reducers: {
    addIncomeSource(state, action: PayloadAction<IncomeSource>) {
      state.sources.push(action.payload);
    },
    editIncomeSource(state, action: PayloadAction<IncomeSource>) {
      const idx = state.sources.findIndex((s) => s.id === action.payload.id);
      if (idx !== -1) state.sources[idx] = action.payload;
    },
    deleteIncomeSource(state, action: PayloadAction<string>) {
      state.sources = state.sources.filter((s) => s.id !== action.payload);
    },
    setIncomeSources(state, action: PayloadAction<IncomeSource[]>) {
      state.sources = action.payload;
    },
  },
});

export const { addIncomeSource, editIncomeSource, deleteIncomeSource, setIncomeSources } =
  incomeSlice.actions;
export default incomeSlice.reducer;

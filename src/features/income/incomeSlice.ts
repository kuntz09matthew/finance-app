import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IncomeSource {
  id: string;
  source: string;
  expectedAmount: number; // What is expected for this period
  actualAmount: number; // What was actually received for this period
  frequency: 'weekly' | 'bi-weekly' | 'monthly' | 'annual' | 'one-time';
  earner: string; // Name of the household member
  type: string; // e.g. Salary, Freelance, Gift, Bonus, Other
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
    setIncomeSources(state, action: PayloadAction<Partial<IncomeSource>[]>) {
      // Backward compatibility: if data uses 'amount', map to expected/actual
      state.sources = action.payload.map((item) => {
        if (typeof item.expectedAmount === 'number' && typeof item.actualAmount === 'number') {
          return item;
        } else if (typeof item.amount === 'number') {
          return {
            ...item,
            expectedAmount: item.amount,
            actualAmount: item.amount,
          };
        } else {
          return {
            ...item,
            expectedAmount: 0,
            actualAmount: 0,
          };
        }
      });
    },
  },
});

export const { addIncomeSource, editIncomeSource, deleteIncomeSource, setIncomeSources } =
  incomeSlice.actions;
export default incomeSlice.reducer;

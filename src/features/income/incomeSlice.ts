// For legacy support: type with optional amount
type LegacyIncome = {
  amount?: number;
};
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
          return {
            ...item,
            id: item.id ?? '',
            source: item.source ?? '',
            expectedAmount: typeof item.expectedAmount === 'number' ? item.expectedAmount : 0,
            actualAmount: typeof item.actualAmount === 'number' ? item.actualAmount : 0,
            frequency: item.frequency ?? 'monthly',
            earner: item.earner ?? '',
            type: item.type ?? 'Other',
          };
        } else if (typeof (item as LegacyIncome).amount === 'number') {
          return {
            ...item,
            id: item.id ?? '',
            source: item.source ?? '',
            expectedAmount: (item as LegacyIncome).amount ?? 0,
            actualAmount: (item as LegacyIncome).amount ?? 0,
            frequency: item.frequency ?? 'monthly',
            earner: item.earner ?? '',
            type: item.type ?? 'Other',
          };
        } else {
          return {
            ...item,
            id: item.id ?? '',
            source: item.source ?? '',
            expectedAmount: 0,
            actualAmount: 0,
            frequency: item.frequency ?? 'monthly',
            earner: item.earner ?? '',
            type: item.type ?? 'Other',
          };
        }
      });
    },
  },
});

export const { addIncomeSource, editIncomeSource, deleteIncomeSource, setIncomeSources } =
  incomeSlice.actions;
export default incomeSlice.reducer;

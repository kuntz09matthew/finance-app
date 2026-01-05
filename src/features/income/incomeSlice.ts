// For legacy support: type with optional amount
type LegacyIncome = {
  amount?: number;
};
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CustomDeduction {
  name: string;
  amount: number;
}

export interface IncomeSource {
  id: string;
  source: string;
  grossAmount: number; // Income before deductions
  netAmount: number; // Income after deductions
  frequency: 'weekly' | 'bi-weekly' | 'monthly' | 'annual' | 'one-time';
  earner: string; // Name of the household member
  type: string; // e.g. Salary, Freelance, Gift, Bonus, Other
  isTaxed: boolean; // If false, net = gross
  deductions: CustomDeduction[]; // Custom deductions (insurance, child support, etc)
  // New fields for roadmap feature
  date?: string; // For one-time incomes (ISO string)
  startDate?: string; // For recurring incomes (ISO string)
  endDate?: string; // For recurring incomes (ISO string, optional)
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
        // If item has grossAmount and netAmount, treat as IncomeSource
        if (typeof item.grossAmount === 'number' && typeof item.netAmount === 'number') {
          return {
            ...item,
            id: item.id ?? '',
            source: item.source ?? '',
            grossAmount: item.grossAmount ?? 0,
            netAmount: item.netAmount ?? 0,
            frequency: item.frequency ?? 'monthly',
            earner: item.earner ?? '',
            type: item.type ?? 'Other',
            isTaxed: typeof item.isTaxed === 'boolean' ? item.isTaxed : true,
            deductions: Array.isArray(item.deductions) ? item.deductions : [],
            date: item.date,
            startDate: item.startDate,
            endDate: item.endDate,
          };
        } else if (typeof (item as LegacyIncome).amount === 'number') {
          // LegacyIncome type
          return {
            ...item,
            id: item.id ?? '',
            source: item.source ?? '',
            grossAmount: (item as LegacyIncome).amount ?? 0,
            netAmount: (item as LegacyIncome).amount ?? 0,
            frequency: item.frequency ?? 'monthly',
            earner: item.earner ?? '',
            type: item.type ?? 'Other',
            isTaxed: true,
            deductions: [],
            date: item.date,
            startDate: item.startDate,
            endDate: item.endDate,
          };
        } else {
          // Fallback for incomplete data
          return {
            ...item,
            id: item.id ?? '',
            source: item.source ?? '',
            grossAmount: 0,
            netAmount: 0,
            frequency: item.frequency ?? 'monthly',
            earner: item.earner ?? '',
            type: item.type ?? 'Other',
            isTaxed: true,
            deductions: [],
            date: item.date,
            startDate: item.startDate,
            endDate: item.endDate,
          };
        }
      });
    },
  },
});

export const { addIncomeSource, editIncomeSource, deleteIncomeSource, setIncomeSources } =
  incomeSlice.actions;
export default incomeSlice.reducer;

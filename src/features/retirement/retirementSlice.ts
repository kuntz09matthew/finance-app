import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type RetirementAccountType = '401k' | 'IRA' | 'Employer Match' | 'Pension' | 'Annuity';

export interface RetirementAccount {
  id: string;
  type: RetirementAccountType;
  name: string;
  owner: string;
  balance: number;
  contribution: number;
  target: number;
  lastUpdated: string;
}

export interface RetirementState {
  accounts: RetirementAccount[];
}

const initialState: RetirementState = {
  accounts: [],
};

const retirementSlice = createSlice({
  name: 'retirement',
  initialState,
  reducers: {
    addAccount(state, action: PayloadAction<RetirementAccount>) {
      state.accounts.push(action.payload);
    },
    updateAccount(state, action: PayloadAction<RetirementAccount>) {
      const idx = state.accounts.findIndex((a) => a.id === action.payload.id);
      if (idx !== -1) state.accounts[idx] = action.payload;
    },
    removeAccount(state, action: PayloadAction<string>) {
      state.accounts = state.accounts.filter((a) => a.id !== action.payload);
    },
  },
});

export const { addAccount, updateAccount, removeAccount } = retirementSlice.actions;
export default retirementSlice.reducer;

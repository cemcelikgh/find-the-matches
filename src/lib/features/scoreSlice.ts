import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/lib/store';

export const scoreSlice = createSlice({
  name: 'score',
  initialState: {
    score: 50,
    firstOpen: ['name', 'id'],
    matchNumber: 0
  },
  reducers: {
    setScore: (state, action: PayloadAction<number>) => {
      state.score += action.payload;
    },
    setFirstOpen: (state, action: PayloadAction<string[]>) => {
      state.firstOpen = action.payload;
    },
    setMatchNumber: (state, action: PayloadAction<number>) => {
      state.matchNumber = action.payload;
    },
  }
})

export const { setScore, setFirstOpen, setMatchNumber } = scoreSlice.actions;

export const selectScore = (state: RootState) => state.score;

export default scoreSlice.reducer;

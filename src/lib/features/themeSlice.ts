import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Theme } from '@/types/types';

export const themeSlice = createSlice({
  name: 'theme',
  initialState: 'dark' satisfies Theme as Theme,
  reducers: {
    setTheme: (_state, action: PayloadAction<Theme>) => action.payload,
  },
});

export const { setTheme } = themeSlice.actions;
export const selectTheme = (state: RootState) => state.theme;

export default themeSlice.reducer;

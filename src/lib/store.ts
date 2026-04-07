import { configureStore } from '@reduxjs/toolkit';
import carsReducer from './features/game/cardsSlice';
import scoreReducer from './features/scoreSlice';
import themeReducer from './features/themeSlice';

export const store = configureStore({
  reducer: {
    cards: carsReducer,
    score: scoreReducer,
    theme: themeReducer
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

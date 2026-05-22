import { configureStore } from '@reduxjs/toolkit';
import carsReducer from './features/cards-slice/cardsSlice';
import scoreReducer from './features/scoreSlice';
import themeReducer from './features/themeSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      cards: carsReducer,
      score: scoreReducer,
      theme: themeReducer
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

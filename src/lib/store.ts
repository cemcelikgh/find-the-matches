import { configureStore } from '@reduxjs/toolkit';
import gameReducer from './features/game-slice/gameSlice';
import themeReducer from './features/themeSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      game: gameReducer,
      theme: themeReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

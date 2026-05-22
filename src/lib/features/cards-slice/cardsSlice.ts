import fruits from './fruits';
import type { CardObjeType } from '@/types/types';
import {createEntityAdapter, createSlice, nanoid, PayloadAction }
  from "@reduxjs/toolkit";
import type { RootState } from '@/lib/store';

//  Fisher-Yates algorithm
function shuffleFruits(arr: string[]): string[] {
  const array = [...arr, ...arr];
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  };
  return array;
};

function generateCards(shuffledFruits: string[]) {
  return shuffledFruits.reduce<CardObjeType[]>(
    (acc, cur) => {
      acc.push({
        name: cur,
        id: nanoid(),
        status: false,
        match: false,
        color: 'gray-border'
      });
      return acc;
    },
    []
  );
};

const shuffledFruits = shuffleFruits(fruits);
const cards = generateCards(shuffledFruits);

const cardsAdapter = createEntityAdapter<CardObjeType>();
const cardsInitialShape = cardsAdapter.getInitialState();
const initialState = cardsAdapter.setAll(cardsInitialShape, cards);

export const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    toggleStatus: (state, action: PayloadAction<string>) => {
      state.entities[action.payload].status =
        !state.entities[action.payload].status;
    },
    toggleMatch: (state, action: PayloadAction<string>) => {
      state.entities[action.payload].match =
        !state.entities[action.payload].match;
    },
    setColor: (state, action: PayloadAction<[string, string]>) => {
      const [id, color] = action.payload;
      state.entities[id].color = color;
    },
    newGame: (state) => {
      const newShuffledFruits = shuffleFruits(fruits);
      const newCards = generateCards(newShuffledFruits);
      cardsAdapter.setAll(state, newCards);
    },
  },
});

export const { toggleStatus, toggleMatch, setColor, newGame } = cardsSlice.actions;
export const selectCards = (state: RootState) => state.cards;
export default cardsSlice.reducer;

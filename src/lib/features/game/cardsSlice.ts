import eneIcoArr from './energyIconsArray';
import { CardObjectType, CardObjectsType } from '@/types';
import { nanoid, PayloadAction } from '@reduxjs/toolkit';
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import type { RootState } from '@/lib/store';

//  Fisher-Yates algorithm
function shuffle(arr: string[]): string[] {
  const array = [...arr, ...arr];
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function generateCards(shuffledCards: string[]): CardObjectsType {
  return shuffledCards.reduce<CardObjectsType>(
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
  []);
}

const shuffledCards = shuffle(eneIcoArr);
const cards = generateCards(shuffledCards);

const cardAdaptor = createEntityAdapter<CardObjectType>();
const initialState = cardAdaptor.setAll(
  cardAdaptor.getInitialState(), cards
);

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
      const newShuffledCards = shuffle(eneIcoArr);
      const newCards = generateCards(newShuffledCards);
      cardAdaptor.setAll(state, newCards);
    }
  }
})

export const { toggleStatus, toggleMatch, setColor, newGame } = cardsSlice.actions;

export const selectCards = (state: RootState) => state.cards;

export default cardsSlice.reducer;

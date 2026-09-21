import { AppDispatch, RootState } from "@/lib/store";
import { Card } from "@/types/types";
import { CardOpenings, Controls, InitialState, Score } from './types';
import { createSlice, EntityState, PayloadAction } from "@reduxjs/toolkit";
import cardsAdapter from '@/utils/cardsAdapter';

const initialCardOpenings: CardOpenings = {
  cannotOpen: false,
  firstOpenedCard: null,
}

const initialScore: Score = {
  score: 50,
  matchNumber: 0,
}

const initialControls: Controls = {
  resetTrigger: 0,
  isNewGameConModalOpen: false,
}

const initialState: InitialState = {
  cards: cardsAdapter.getInitialState(),
  cardOpenings: initialCardOpenings,
  score: initialScore,
  controls: initialControls,
}

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setCards: (state, action: PayloadAction<EntityState<Card, string>>) => {
      state.cards = action.payload;
    },
    openFirstCard: (state, action: PayloadAction<string>) => {
      const card = state.cards.entities[action.payload];
      card.isOpen = true;
      card.border = 'yellow-border';
      state.cardOpenings.firstOpenedCard = card;
    },
    mismatchCards: (state, action: PayloadAction<string>) => {
      const card = state.cards.entities[action.payload];
      const cardOpenings = state.cardOpenings;
      const firstOpenedCard = state.cards.entities[cardOpenings.firstOpenedCard!.id];
      cardOpenings.cannotOpen = true;
      card.isOpen = true;
      card.border = 'red-border';
      firstOpenedCard.border = 'red-border';
      state.score.score -= 10;
    },
    closeMismatchedCards: (state, action: PayloadAction<string>) => {
      const card = state.cards.entities[action.payload];
      const cardOpenings = state.cardOpenings;
      const firstOpenedCard = state.cards.entities[cardOpenings.firstOpenedCard!.id];
      firstOpenedCard.isOpen = false;
      firstOpenedCard.border = 'gray-border';
      cardOpenings.firstOpenedCard = null;
      card.isOpen = false;
      card.border = 'gray-border';
      cardOpenings.cannotOpen = false;
    },
    matchCards: (state, action: PayloadAction<string>) => {
      const card = state.cards.entities[action.payload];
      const cardOpenings = state.cardOpenings;
      const firstOpenedCard = state.cards.entities[cardOpenings.firstOpenedCard!.id];
      const gameScore = state.score;
      card.isOpen = true;
      card.border = 'green-border';
      firstOpenedCard.border = 'green-border';
      cardOpenings.firstOpenedCard = null;
      gameScore.score += 50;
      gameScore.matchNumber++;
    },
    resetGame: state => {
      state.controls.resetTrigger++;
      state.cardOpenings = initialCardOpenings;
      state.score = initialScore;
      state.controls.isNewGameConModalOpen = false;
    },
    setIsNewGameConModalOpen: (state, action: PayloadAction<boolean>) => {
      state.controls.isNewGameConModalOpen = action.payload;
    },
  },
});

export const {
  setCards,
  openFirstCard,
  mismatchCards,
  closeMismatchedCards,
  matchCards,
  resetGame,
  setIsNewGameConModalOpen,
} = gameSlice.actions;

export function openCard(id: string) {

  return function(dispatch: AppDispatch, getState: () => RootState) {

    const state = getState();
    const card = state.game.cards.entities[id];
    const cardOpenings = state.game.cardOpenings;

    if (card.isOpen || cardOpenings.cannotOpen) return;

    if (cardOpenings.firstOpenedCard === null) {
      dispatch(openFirstCard(id));
    } else if (cardOpenings.firstOpenedCard.fruitName !== card.fruitName) {
      dispatch(mismatchCards(id));
      setTimeout(function() { dispatch(closeMismatchedCards(id)) }, 600);
    } else { // cardOpenings.firstOpenedCard.fruitName === card.fruitName
      dispatch(matchCards(id));
    }

  }

}

export const selectIds = (state: RootState) => state.game.cards.ids;
export const selectCard = (id: string) => ( (state: RootState) => state.game.cards.entities[id] );
export const selectScore = (state: RootState) => state.game.score.score;
export const selectMatchNumber = (state: RootState) => state.game.score.matchNumber;
export const selectResetTrigger = (state: RootState) => state.game.controls.resetTrigger;
export const selectIsNewGameConModalOpen = (state: RootState) => state.game.controls.isNewGameConModalOpen;

export default gameSlice.reducer;

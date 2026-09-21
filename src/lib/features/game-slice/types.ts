import { Card } from "@/types/types";
import cardsAdapter from "@/utils/cardsAdapter";

export interface CardOpenings {
  cannotOpen: boolean;
  firstOpenedCard: null | Card;
}

export  interface Score {
  score: number;
  matchNumber: number;
}

export  interface Controls {
  resetTrigger: number;
  isNewGameConModalOpen: boolean;
}

export  interface InitialState {
  cards: ReturnType<typeof cardsAdapter.getInitialState>;
  cardOpenings: CardOpenings;
  score: Score;
  controls: Controls;
}

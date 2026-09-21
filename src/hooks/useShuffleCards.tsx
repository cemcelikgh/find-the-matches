'use client';

import { Card, Fruits } from "@/types/types";
import { nanoid } from "@reduxjs/toolkit";
import { selectResetTrigger, setCards }
  from "@/lib/features/game-slice/gameSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect } from "react";
import cardsAdapter from "@/utils/cardsAdapter";
import fruits from "@/data/fruits";

// Fisher-Yates algorithm
function shuffleFruits(fruits: Fruits) {
  const fArr = [...fruits, ...fruits];
  for (let i = fArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [fArr[i], fArr[j]] = [fArr[j], fArr[i]];
  }
  return fArr;
}

function generateCards(shuffledFruits: Fruits): Card[] {
  return shuffledFruits.map(fruit => ({
    fruitName: fruit,
    id: nanoid(),
    border: 'gray-border',
    isOpen: false,
  }));
}

function useShuffleCards() {

  const resetTrigger = useAppSelector(selectResetTrigger);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const shuffledFruits = shuffleFruits([...fruits]);
    const cards = generateCards(shuffledFruits);
    const cardsInitialShape = cardsAdapter.getInitialState();
    const cardsState = cardsAdapter.setAll(cardsInitialShape, cards);
    dispatch(setCards(cardsState));
  }, [resetTrigger, dispatch]);

}

export default useShuffleCards;

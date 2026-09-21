'use client';

import {
  resetGame,
  selectIsNewGameConModalOpen,
  selectMatchNumber,
  setIsNewGameConModalOpen
} from '@/lib/features/game-slice/gameSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import styles from './NewGameConfirmationModal.module.css';

function NewGameConfirmationModal() {

  const isNewGameModalOpen = useAppSelector(selectIsNewGameConModalOpen);
  const matchNumber = useAppSelector(selectMatchNumber);
  const dispatch = useAppDispatch();

  function handleStartNewGame() {
    dispatch(resetGame());
    dispatch(setIsNewGameConModalOpen(false));
  }
  function handleCloseModal() {
    dispatch(setIsNewGameConModalOpen(false));
  }

  return (isNewGameModalOpen && matchNumber !== 15 &&
    <div className={styles.confirmation}>
      <div onClick={handleStartNewGame}>
        Start New Game
      </div>
      <div onClick={handleCloseModal}>
        Continue Game
      </div>
    </div>
  );

}

export default NewGameConfirmationModal;

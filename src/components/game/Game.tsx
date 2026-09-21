'use client';

import { selectIds } from '@/lib/features/game-slice/gameSlice';
import { useAppSelector } from '@/lib/hooks';
import Card from './card/Card';
import GameOverModal from './game-over-modal/GameOverModal';
import NewGameConfirmationModal
  from './new-game-confirmation-modal/NewGameConfirmationModal';
import useShuffleCards from '@/hooks/useShuffleCards';
import styles from './Game.module.css';

function Game() {

  useShuffleCards();

  const ids = useAppSelector(selectIds);

  return (
    <div className={styles.game}>
      <GameOverModal />
      <NewGameConfirmationModal />
      {ids.map(id =>
      <Card id={id} key={id} />)}
    </div>
  );

}

export default Game;

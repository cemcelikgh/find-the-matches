'use client';

import { resetGame, selectMatchNumber, selectScore }
  from '@/lib/features/game-slice/gameSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import styles from './GameOverModal.module.css';

function GameOverModal() {

  const matchNumber = useAppSelector(selectMatchNumber);
  const score = useAppSelector(selectScore);
  const dispatch = useAppDispatch();

  return (matchNumber === 15 &&
    <div className={styles['game-over']}>
      <div>
        Your Score: {score}
      </div>
      <div onClick={ () => dispatch(resetGame()) }>
        Play Again
      </div>
    </div>
  );

}

export default GameOverModal;

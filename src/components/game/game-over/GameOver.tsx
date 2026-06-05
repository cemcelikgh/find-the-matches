import styles from './GameOver.module.css';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { selectScore, setFirstOpen, setMatchNumber, setScore }
  from '@/lib/features/scoreSlice';
import { newGame } from '@/lib/features/cards-slice/cardsSlice';

function GameOver() {

  const dispatch = useAppDispatch();
  const { score } = useAppSelector(selectScore);

  function playAgain() {
    dispatch(setScore(-score + 50));
    dispatch(setFirstOpen(['name', 'id']));
    dispatch(setMatchNumber(0));
    dispatch(newGame());
  };

  return (
    <>
      <div className={styles.transparance}></div>
      <div className={styles['game-over']}>
        <div>
          <div className={styles['finish-score']}>
            Your Score: {score}
          </div>
          <div className={styles['finish-score-bg']}></div>
        </div>
        <div onClick={playAgain}>
          <div className={styles['play-again']}>
            Play Again
          </div>
          <div className={styles['play-again-bg']}></div>
        </div>
      </div>
    </>
  );

}

export default GameOver;

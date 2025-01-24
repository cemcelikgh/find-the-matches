import styles from './game-over.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectScore, setFirstOpen, setMatchNumber, setScore }
  from '@/lib/features/scoreSlice';
import { newGame } from '@/lib/features/game/cardsSlice';

function GameOver() {

const { score } = useSelector(selectScore);
const dispatch = useDispatch();
function playAgain() {
  dispatch(setScore(-score + 50));
  dispatch(setFirstOpen(['name', 'id']));
  dispatch(setMatchNumber(0));
  dispatch(newGame());
}

  return (<>
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
  </>)
}

export default GameOver;

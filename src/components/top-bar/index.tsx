'use client';

import { useDispatch, useSelector } from 'react-redux';
import styles from './top-bar.module.css';
import { selectScore, setFirstOpen, setMatchNumber, setScore }
  from '@/lib/features/scoreSlice';
import { newGame } from '@/lib/features/game/cardsSlice';
import ChangeTheme from './change-theme';

function TopBar() {

  const { score } = useSelector(selectScore);
  const dispatch = useDispatch();
  function handleClick() {
    if (window.confirm("Do you really want to start new game?")) {
        dispatch(setScore(-score + 50));
        dispatch(setFirstOpen(['name', 'id']));
        dispatch(setMatchNumber(0));
        dispatch(newGame());
    }
  }

  return (
    <section className={styles['top-bar']}>
      <ChangeTheme />
      <div className={styles.score}>Score: {score}</div>
      <button className={styles['new-game']}
        onClick={handleClick}
      >New Game</button>
    </section>
  )
}

export default TopBar;

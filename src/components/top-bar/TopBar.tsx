'use client';

import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import styles from './TopBar.module.css';
import { selectScore, setFirstOpen, setMatchNumber, setScore }
  from '@/lib/features/scoreSlice';
import { newGame } from '@/lib/features/cards-slice/cardsSlice';
import ThemeSelector from './theme-selector/ThemeSelector';

function TopBar() {

  const dispatch = useAppDispatch();
  const { score } = useAppSelector(selectScore);

  function handleClick() {
    if (window.confirm("Do you really want to start new game?")) {
      dispatch(setScore(-score + 50));
      dispatch(setFirstOpen(['name', 'id']));
      dispatch(setMatchNumber(0));
      dispatch(newGame());
    };
  };

  return (
    <section className={styles['top-bar']}>
      <ThemeSelector />
      <div className={styles.score}>Score: {score}</div>
      <button className={styles['new-game']}
        onClick={handleClick}
      >New Game</button>
    </section>
  );

}

export default TopBar;

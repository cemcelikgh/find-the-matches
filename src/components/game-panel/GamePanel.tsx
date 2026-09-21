'use client';

import { setIsNewGameConModalOpen }
  from '@/lib/features/game-slice/gameSlice';
import { useAppDispatch } from '@/lib/hooks';
import ThemeSelector from
  '@/utils/theme-selector/ThemeSelector';
import Score from './score/Score';
import styles from './GamePanel.module.css';

function GamePanel() {

  const dispatch = useAppDispatch();

  function handleOpenModal() {
    dispatch(setIsNewGameConModalOpen(true));
  }

  return (
    <section className={styles['game-panel']}>
      <ThemeSelector />
      <Score />
      <button
        className={styles['new-game-btn']}
        onClick={handleOpenModal}
      >
        New Game
      </button>
    </section>
  );

}

export default GamePanel;

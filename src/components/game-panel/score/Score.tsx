'use client';

import { selectScore }
  from '@/lib/features/game-slice/gameSlice';
import { useAppSelector } from '@/lib/hooks';
import styles from './Score.module.css';

function Score() {

  const score = useAppSelector(selectScore);

  return (
    <div className={styles.score}>
      Score: {score}
    </div>
  );

}

export default Score;

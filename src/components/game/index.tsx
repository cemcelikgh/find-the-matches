'use client';

import styles from './game.module.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCards, toggleMatch, toggleStatus, setColor }
  from '@/lib/features/game/cardsSlice';
import type { CardObjeType } from '@/types/CardObjeType';
import { selectScore, setScore, setFirstOpen, setMatchNumber }
  from '@/lib/features/scoreSlice';
import { AppDispatch } from '@/lib/store';
import CardImage from '../../utils/CardImage';
import GameOver from './game-over';

export function Game() {

  // waiting for client side render
  const [isClient, setIsClient] = useState<boolean>(false);
  useEffect(() => { setIsClient(true) }, []);

  const dispatch = useDispatch<AppDispatch>();
  const { ids, entities } = useSelector(selectCards);
  const { firstOpen, matchNumber } = useSelector(selectScore);
  const [isClickable, setIsClickable] = useState<boolean>(true);

  // waiting for client side render
  if (!isClient) return;

  const handleClick = (entity: CardObjeType) => {
    if (entity.status || entity.match || !isClickable) return;
    if (firstOpen[0] === 'name') {
      dispatch(toggleStatus(entity.id));
      dispatch(setColor([entity.id, 'yellow-border']));
      dispatch(setFirstOpen([entity.name, entity.id]));
    } else if (firstOpen[0] !== entity.name) {
      dispatch(toggleStatus(entity.id));
      dispatch(setColor([firstOpen[1], 'red-border']));
      dispatch(setColor([entity.id, 'red-border']));
      setIsClickable(!isClickable);
      setTimeout(() => {
        dispatch(toggleStatus(firstOpen[1]));
        dispatch(toggleStatus(entity.id));
        dispatch(setColor([firstOpen[1], 'gray-border']));
        dispatch(setColor([entity.id, 'gray-border']));
        setIsClickable(isClickable);
      }, 600);
      dispatch(setFirstOpen(['name', 'id']));
      dispatch(setScore(-10));
    } else { // firOpe[0] === entity.name
      dispatch(toggleStatus(entity.id));
      dispatch(toggleMatch(firstOpen[1]));
      dispatch(toggleMatch(entity.id));
      dispatch(setColor([firstOpen[1], 'green-border']));
      dispatch(setColor([entity.id, 'green-border']));
      dispatch(setFirstOpen(['name', 'id']));
      dispatch(setScore(50));
      dispatch(setMatchNumber(matchNumber + 1));
    }
  }

  return (
    <div className={styles.game}>
      {ids.map(id => <div key={id}
        className={`${styles.card} ${styles[entities[id].color]}`}
        onClick={() => {handleClick(entities[id])}}
      >
        <div className={styles['card-image']}>
        <div className={styles['hide-the-corner']}></div>
          {(entities[id].status || entities[id].match) &&
          <CardImage name={entities[id].name} />
          }
        </div>
      </div>)}
      {matchNumber === 15 && <GameOver />}
    </div>
  )
}

export default Game;

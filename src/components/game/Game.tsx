'use client';

import styles from './Game.module.css';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { selectCards, toggleMatch, toggleStatus, setColor }
  from '@/lib/features/cards-slice/cardsSlice';
import type { Cards } from '@/types/types';
import { selectScore, setScore, setFirstOpen, setMatchNumber }
  from '@/lib/features/scoreSlice';
import Image from "next/image";
import GameOver from './game-over/GameOver';

export function Game() {

  // waiting for client side render
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => { setIsMounted(true) }, []);

  const dispatch = useAppDispatch();
  const { ids, entities } = useAppSelector(selectCards);
  const { firstOpen, matchNumber } = useAppSelector(selectScore);
  const [ isClickable, setIsClickable ] = useState(true);

  // waiting for client side render
  if (!isMounted) return null;

  const handleClick = (entity: Cards) => {

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
    };

  };

  return (
    <div className={styles.game}>
      {ids.map(id => <div key={id}
        className={`${styles.card} ${styles[entities[id].color]}`}
        onClick={() => {handleClick(entities[id])}}
      >
        <div className={styles['card-image']}>
        {/* <div className={styles['hide-the-corner']}></div> */}
          {(entities[id].status || entities[id].match) &&
          <Image
            src={`/images/fruits/${entities[id].name}.svg`}
            style={{ objectFit: 'contain' }}
            sizes='100%'
            fill
            alt={entities[id].name}
          />
          }
        </div>
      </div>)}
      {matchNumber === 15 && <GameOver />}
    </div>
  );

}

export default Game;

'use client';

import { openCard, selectCard }
  from "@/lib/features/game-slice/gameSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Image from "next/image";
import styles from './Card.module.css';

function Card({ id }: { id: string; }) {

  const card = useAppSelector(selectCard(id));
  const dispatch = useAppDispatch();

  return (
    <div
      className={`${styles.card} ${styles[card.border]}`}
      onClick={ () => { dispatch(openCard(id)) } }
    >
      <div className={styles.image}>
        {card.isOpen &&
        <Image
          className={card.isOpen ? styles.visible : styles.hidden}
          src={`/fruits/${card.fruitName}.svg`}
          style={{ objectFit: "contain" }}
          fill
          sizes="100%"
          loading="eager"
          alt={card.isOpen ? card.fruitName : ""}
          aria-hidden={!card.isOpen}
        />}
      </div>
    </div>
  );

}

export default Card;

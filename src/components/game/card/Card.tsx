'use client';

import { openCard, selectCard }
  from "@/lib/features/game-slice/gameSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Image from "next/image";
import styles from './Card.module.css';

function Card({ id }: { id: string }) {

  const card = useAppSelector(selectCard(id));
  const dispatch = useAppDispatch();

  const isCardOpen = card.border !== "gray-border";

  return (
    <div
      className={`${styles.card} ${styles[card.border]}`}
      onClick={ () => { dispatch(openCard(id)) } }
    >
      <div className={styles.image}>
        {isCardOpen &&
        <Image
          className={isCardOpen ? styles.visible : styles.hidden}
          src={`/fruits/${card.fruitName}.svg`}
          fill
          sizes="(max-width: 500rem) calc((100vw - 138rem) / 5), 96rem"
          style={{ objectFit: "contain" }}
          loading="eager"
          alt={isCardOpen ? card.fruitName : ""}
          aria-hidden={!isCardOpen}
        />}
      </div>
    </div>
  );

}

export default Card;

'use client';

import { openCard, selectCard }
  from "@/lib/features/game-slice/gameSlice";
import { selectTheme } from "@/lib/features/themeSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Fruit from "./fruit/Fruit";
import Image from "next/image";
import styles from './Card.module.css';

function Card({ id }: { id: string }) {

  const card = useAppSelector(selectCard(id));
  const theme = useAppSelector(selectTheme);
  const dispatch = useAppDispatch();

  return (
    <div
      className={styles.card}
      onClick={ () => { dispatch(openCard(id)) } }
    >
      <Image
        src={`/border-images/${theme}-${card.border}.png`}
        fill
        sizes="(max-width: 500px) calc((100vw - 58px) / 5), 112px"
        loading="eager"
        alt={card.border}
      />
      <Fruit card={card} />
    </div>
  );

}

export default Card;

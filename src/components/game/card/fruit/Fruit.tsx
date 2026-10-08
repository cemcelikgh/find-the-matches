'use client';

import { Card } from "@/types/types";
import { memo } from "react";
import Image from "next/image";
import styles from "./Fruit.module.css";

const Fruit = memo(function Fruit({ card }: { card: Card }) {

  const isCardOpen = card.border !== "gray-border";

  return (
    <div className={styles.image}>
      {isCardOpen &&
      <Image
        className={isCardOpen ? styles.visible : styles.hidden}
        src={`/fruits/${card.fruitName}.svg`}
        fill
        sizes="(max-width: 500px) calc((100vw - 138px) / 5), 96px"
        style={{ objectFit: "contain" }}
        loading="eager"
        alt={isCardOpen ? card.fruitName : ""}
        aria-hidden={!isCardOpen}
      />}
    </div>
  );

});

export default Fruit;

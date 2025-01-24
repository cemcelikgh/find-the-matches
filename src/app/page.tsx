import styles from "./page.module.css";
import Game from "@/components/game";
import TopBar from "@/components/top-bar";

export default function Home() {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Find the Matches</h1>
      <TopBar />
      <Game />
    </div>
  );
}

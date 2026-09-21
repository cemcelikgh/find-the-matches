import Game from "@/components/game/Game";
import GamePanel from "@/components/game-panel/GamePanel";
import styles from "./page.module.css";

function Home() {
  return (
    <main className={styles.container}>
      <h1 className={styles.heading}>
        Find the Matches
      </h1>
      <GamePanel />
      <Game />
    </main>
  );
}

export default Home;

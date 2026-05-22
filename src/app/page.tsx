import styles from "./page.module.css";
import Game from "@/components/game/Game";
import TopBar from "@/components/top-bar/TopBar";

function Home() {
  return (
    <main className={styles.container}>
      <h1 className={styles.heading}>
        Find the Matches
      </h1>
      <TopBar />
      <Game />
    </main>
  );
}

export default Home;

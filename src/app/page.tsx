import Image from "next/image";
import { Quicksand } from "next/font/google";
import styles from "./page.module.scss";

const quicksand = Quicksand({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={`${quicksand.className} ${styles.main} `}>
      <form title="Pipeline Data Config">
        <label htmlFor="project-id">project ID:</label>
        <input name="project-id" type="text"></input>
      </form>
    </main>
  );
}

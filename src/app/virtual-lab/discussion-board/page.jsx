import styles from "./styles.module.css";
import Link from "next/link";

const DiscussionBoardPage = () => {
  return (
    <div className={styles.container}>
      <div>Tablero de discusión</div>
      <Link className="button-primary" href="/virtual-lab">
        Volver
      </Link>
    </div>
  );
};

export default DiscussionBoardPage;

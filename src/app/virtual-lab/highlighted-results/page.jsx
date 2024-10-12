import styles from "./styles.module.css";
import Link from "next/link";

const HighlightedResultsPage = () => {
  return (
    <div className={styles.container}>
      <div>Resultados destacados</div>
      <Link className="button-primary" href="/virtual-lab">
        Volver
      </Link>
    </div>
  );
};

export default HighlightedResultsPage;
